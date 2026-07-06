#!/usr/bin/env node
// Smoke test for ds-catalog-mcp: spawns the server, performs the MCP handshake,
// then exercises tools/list and each tool, asserting on the responses.
// Run: node smoke-test.mjs   (exit code 0 = pass)

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const SERVER = fileURLToPath(new URL("./server.mjs", import.meta.url));

const child = spawn("node", [SERVER], { stdio: ["pipe", "pipe", "inherit"] });

const pending = new Map();
let buffer = "";
child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  buffer += chunk;
  let nl;
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    if (!line) continue;
    const msg = JSON.parse(line);
    if (msg.id !== undefined && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  }
});

let nextId = 1;
function request(method, params) {
  const id = nextId++;
  return new Promise((res) => {
    pending.set(id, res);
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
  });
}
function notify(method, params) {
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method, params }) + "\n");
}

function assert(cond, label) {
  if (!cond) {
    console.error("FAIL:", label);
    child.kill();
    process.exit(1);
  }
  console.log("ok  -", label);
}

const run = async () => {
  const init = await request("initialize", { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "smoke", version: "0" } });
  assert(init.result?.serverInfo?.name === "ds-catalog-mcp", "initialize returns serverInfo");
  notify("notifications/initialized", {});

  const list = await request("tools/list", {});
  const toolNames = (list.result?.tools || []).map((t) => t.name);
  assert(["list_components", "get_component_spec", "search_components", "reload_catalog"].every((t) => toolNames.includes(t)), "tools/list exposes all tools");

  const lc = await request("tools/call", { name: "list_components", arguments: {} });
  const listed = JSON.parse(lc.result.content[0].text);
  assert(Array.isArray(listed) && listed.length >= 7, `list_components returns >=7 components (got ${listed.length})`);
  assert(listed.some((c) => c.name === "ProductCard"), "catalog includes ProductCard");

  const org = await request("tools/call", { name: "list_components", arguments: { atomicLevel: "organism" } });
  const orgs = JSON.parse(org.result.content[0].text);
  assert(orgs.every((c) => c.atomicLevel === "organism"), "list_components filters by atomicLevel");

  const atomsRes = await request("tools/call", { name: "list_components", arguments: { atomicLevel: "atom" } });
  const atoms = JSON.parse(atomsRes.result.content[0].text);
  assert(atoms.length >= 10 && atoms.some((c) => c.name === "Button"), `atom registry served (>=10 atoms incl Button, got ${atoms.length})`);

  const sw = await request("tools/call", { name: "search_components", arguments: { query: "toggle" } });
  const swHits = JSON.parse(sw.result.content[0].text);
  assert(swHits.some((c) => c.name === "Switch"), "search 'toggle' resolves to Switch (consolidated)");

  const gc = await request("tools/call", { name: "get_component_spec", arguments: { name: "ProductCard" } });
  const spec = JSON.parse(gc.result.content[0].text);
  assert(spec.name === "ProductCard" && Array.isArray(spec.slots), "get_component_spec returns full spec with slots");
  assert(spec.variants.some((v) => v.axis === "emphasis"), "ProductCard exposes the emphasis variant axis");

  const miss = await request("tools/call", { name: "get_component_spec", arguments: { name: "DoesNotExist" } });
  assert(/No component named/.test(miss.result.content[0].text), "get_component_spec handles unknown name");

  const sc = await request("tools/call", { name: "search_components", arguments: { query: "quick" } });
  const hits = JSON.parse(sc.result.content[0].text);
  assert(hits.some((c) => c.name === "QuickLink" || c.name === "QuickLinkBar"), "search_components finds QuickLink by query");

  const bad = await request("nonexistent/method", {});
  assert(bad.error && bad.error.code === -32601, "unknown method returns -32601");

  console.log("\nALL SMOKE TESTS PASSED");
  child.kill();
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  child.kill();
  process.exit(1);
});
