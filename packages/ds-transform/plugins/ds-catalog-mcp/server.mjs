#!/usr/bin/env node
// ds-catalog-mcp — a minimal, dependency-free MCP stdio server that exposes a
// design-system component catalog (machine-readable component specs emitted by
// ds-transform) so an AI agent or code generator can query it and produce
// design-system-compliant UI without component hallucination.
//
// This is the concrete implementation of "design system as a context engine
// over MCP" (see docs/design-system-methodology.md section 20.1).
//
// Transport: newline-delimited JSON-RPC 2.0 over stdio (MCP stdio transport).
// No SDK dependency — kept intentionally small and readable as a reference.
//
// Catalog source: every *.json file under the catalog directory
// (DS_CATALOG_DIR env or --catalog <dir>, default ./catalog). Each file is
// either a single component-spec object or an array of them, conforming to
// ../../schema/component-spec.schema.json.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = fileURLToPath(new URL(".", import.meta.url));

function catalogDir() {
  const flagIdx = process.argv.indexOf("--catalog");
  if (flagIdx !== -1 && process.argv[flagIdx + 1]) return resolve(process.argv[flagIdx + 1]);
  if (process.env.DS_CATALOG_DIR) return resolve(process.env.DS_CATALOG_DIR);
  return resolve(HERE, "catalog");
}

function loadCatalog(dir) {
  const specs = [];
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return specs; // empty catalog is valid
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (extname(name).toLowerCase() !== ".json") continue;
    if (!statSync(full).isFile()) continue;
    let parsed;
    try {
      parsed = JSON.parse(readFileSync(full, "utf8"));
    } catch {
      continue; // skip malformed files rather than crash
    }
    const items = Array.isArray(parsed) ? parsed : [parsed];
    for (const item of items) {
      if (item && typeof item === "object" && typeof item.name === "string") specs.push(item);
    }
  }
  return specs;
}

const DIR = catalogDir();
let CATALOG = loadCatalog(DIR);

const TOOLS = [
  {
    name: "list_components",
    description:
      "List all components in the design-system catalog with name, atomic level, and one-line description.",
    inputSchema: {
      type: "object",
      properties: {
        atomicLevel: {
          type: "string",
          enum: ["atom", "molecule", "organism", "template", "page"],
          description: "Optional filter by atomic level.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "get_component_spec",
    description:
      "Get the full machine-readable spec (slots, variants, states, tokens, accessibility) for one component by exact name. Use this before generating UI so you only use real components, slots, and variant values.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Exact component name, e.g. ProductCard." } },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "search_components",
    description:
      "Search components by a query matched against name, description, and consolidated as-is source elements. Returns matching specs.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Case-insensitive search string." } },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "reload_catalog",
    description: "Reload the catalog from disk (use after ds-transform emits new specs).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

function textResult(obj) {
  return { content: [{ type: "text", text: typeof obj === "string" ? obj : JSON.stringify(obj, null, 2) }] };
}

function callTool(name, args = {}) {
  switch (name) {
    case "list_components": {
      let items = CATALOG;
      if (args.atomicLevel) items = items.filter((c) => c.atomicLevel === args.atomicLevel);
      return textResult(
        items.map((c) => ({ name: c.name, atomicLevel: c.atomicLevel, description: c.description || "" }))
      );
    }
    case "get_component_spec": {
      const found = CATALOG.find((c) => c.name === args.name);
      if (!found) {
        const names = CATALOG.map((c) => c.name).join(", ");
        return textResult(`No component named "${args.name}". Known: ${names || "(catalog empty)"}`);
      }
      return textResult(found);
    }
    case "search_components": {
      const q = String(args.query || "").toLowerCase();
      const hits = CATALOG.filter((c) => {
        const hay = [c.name, c.description, ...(c.consolidates || [])].join(" ").toLowerCase();
        return hay.includes(q);
      });
      return textResult(hits);
    }
    case "reload_catalog": {
      CATALOG = loadCatalog(DIR);
      return textResult(`Reloaded ${CATALOG.length} component spec(s) from ${DIR}.`);
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ---- JSON-RPC 2.0 over newline-delimited stdio ----

const SERVER_INFO = { name: "ds-catalog-mcp", version: "0.1.0" };
const PROTOCOL_VERSION = "2024-11-05";

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function handle(msg) {
  const { id, method, params } = msg;
  const isRequest = id !== undefined && id !== null;
  try {
    switch (method) {
      case "initialize":
        send({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: {} },
            serverInfo: SERVER_INFO,
          },
        });
        return;
      case "notifications/initialized":
      case "initialized":
        return; // notification, no response
      case "tools/list":
        send({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
        return;
      case "tools/call": {
        const result = callTool(params?.name, params?.arguments || {});
        send({ jsonrpc: "2.0", id, result });
        return;
      }
      case "ping":
        send({ jsonrpc: "2.0", id, result: {} });
        return;
      default:
        if (isRequest) send({ jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } });
    }
  } catch (err) {
    if (isRequest) send({ jsonrpc: "2.0", id, error: { code: -32603, message: String(err && err.message || err) } });
  }
}

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let nl;
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    if (!line) continue;
    let msg;
    try {
      msg = JSON.parse(line);
    } catch {
      continue;
    }
    handle(msg);
  }
});
process.stdin.on("end", () => process.exit(0));
