# ds-catalog-mcp

A minimal, dependency-free **MCP (Model Context Protocol) stdio server** that exposes a design-system component catalog — the machine-readable component specs emitted by `ds-transform` (Phase 6) — so an AI agent or code generator can **query the design system and produce compliant UI without component hallucination**.

This is the runnable implementation of "design system as a context engine over MCP" described in [`docs/design-system-methodology.md` section 20.1](../../../../docs/design-system-methodology.md#201-ai-네이티브--에이전틱-디자인-시스템).

## Why

An LLM generating UI tends to invent components, props, and variant values that don't exist. Exposing the catalog over MCP lets the agent look up the real components, slots, variant axes, tokens, and non-negotiable accessibility rules first — turning the design system into guardrails ("constraints are permanent, generations are disposable").

## Tools

| Tool | Input | Returns |
| --- | --- | --- |
| `list_components` | `{ atomicLevel? }` | name + atomic level + description for each component |
| `get_component_spec` | `{ name }` | the full spec (slots, variants, states, tokens, accessibility) |
| `search_components` | `{ query }` | specs matching name / description / consolidated as-is elements |
| `reload_catalog` | `{}` | reloads specs from disk after `ds-transform` emits new ones |

## Catalog source

Every `*.json` file under the catalog directory is loaded. Each file is either a single component-spec object or an array of them, conforming to [`../../schema/component-spec.schema.json`](../../schema/component-spec.schema.json). The bundled `catalog/finance-portal.json` is the seven-component catalog from `examples/finance-portal-home/`.

Point at your own catalog with `--catalog <dir>` or `DS_CATALOG_DIR`:

```bash
node server.mjs --catalog /path/to/your/specs
DS_CATALOG_DIR=/path/to/your/specs node server.mjs
```

## Run

```bash
node server.mjs          # start the MCP server on stdio
node smoke-test.mjs      # spawn the server, run the MCP handshake + tool assertions
```

## Use from an MCP client (e.g. Claude Code)

Register it as an stdio MCP server. Example `.mcp.json` fragment:

```json
{
  "mcpServers": {
    "ds-catalog": {
      "command": "node",
      "args": ["packages/ds-transform/plugins/ds-catalog-mcp/server.mjs"],
      "env": { "DS_CATALOG_DIR": "packages/ds-transform/plugins/ds-catalog-mcp/catalog" }
    }
  }
}
```

Then an agent can call `list_components` / `get_component_spec` before generating UI, so every component, slot, and variant it uses is one the design system actually defines.

## Notes

- Transport is newline-delimited JSON-RPC 2.0 over stdio (MCP stdio transport). No SDK dependency — the server is intentionally small and readable as a reference. For production you may prefer `@modelcontextprotocol/sdk`.
- Malformed catalog files are skipped rather than crashing the server.
