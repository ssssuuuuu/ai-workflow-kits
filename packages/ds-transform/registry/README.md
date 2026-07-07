# Atom Registry

A managed, machine-readable registry of **atom-level items** (the smallest UI units) for the design system. Each entry conforms to [`../schema/component-spec.schema.json`](../schema/component-spec.schema.json) with `atomicLevel: "atom"`, so the same specs feed the MCP server (`../plugins/ds-catalog-mcp/`) and any code generator.

## How raw attributes map to canonical atoms

A raw wishlist of attributes (`p, radio, select, toggle, switch, btn1, btn2, description, title, input, number, …`) is **normalized** into canonical atoms with variants — this is the ds-transform Phase 2 "consolidate near-duplicates" step. Do not register a separate atom per visual style; register one atom and express the difference as a variant axis.

| Raw attribute | Registered atom | How |
| --- | --- | --- |
| `p` | `Text` | body/caption text |
| `title` | `Title` | `level` (display/title/heading) × `size` |
| `description` | `Description` | helper text, `tone` (default/error/warning/success) |
| `btn1`, `btn2` | `Button` | one Button; `kind=primary` (btn1) / `kind=secondary` (btn2) |
| `input` | `Input` | single-line field, `type`/`size`/`style` |
| `number` | `Input` | `type=number` variant (not a separate atom) |
| `radio` | `Radio` | `selection` (unselected/selected); group = `RadioGroup` |
| `select` | `Select` | `mode` (single/multiple), options via `Select.Option` |
| `toggle`, `switch` | `Switch` | same atom; on/off `state` × `size` |
| (companion) | `Checkbox` | selection incl. `indeterminate` |
| (companion) | `IconButton` | icon-only button, `aria-label` required |
| (companion) | `Icon` | decorative/semantic icon |

## Registry contents

`atoms.json` — the array of atom specs. Fields per atom: `name`, `atomicLevel`, `description`, `slots`, `variants` (independent axes), `states`, `tokens`, `compositionApi`, `children`, `accessibility`, `consolidates` (the raw attributes it absorbs), `status`, `docsRef` (link to the item-spec section in `docs/design-system-methodology.md`).

Currently registered (14): `Text`, `Title`, `Description`, `Button`, `IconButton`, `Input`, `Radio`, `Checkbox`, `Select`, `Switch`, `Icon`, `Slider`, `Rating`, `SegmentedControl`.

## Related reference

[`tds-mobile-index.md`](tds-mobile-index.md) — a reference index of the public component taxonomy of Toss TDS Mobile, cross-mapped to this registry (names/categories only, with source links; no proprietary specs copied).

## Serving over MCP

`atoms.json` is copied into the MCP server's catalog, so an agent can call `list_components { atomicLevel: "atom" }`, `get_component_spec { name: "Button" }`, or `search_components { query: "toggle" }` (finds `Switch`, which consolidates `toggle`). See [`../plugins/ds-catalog-mcp/README.md`](../plugins/ds-catalog-mcp/README.md).

## Adding an atom

1. Add an object to `atoms.json` conforming to the schema (`atomicLevel: "atom"`).
2. Prefer a **variant axis** over a new atom for style/size differences; list absorbed raw names in `consolidates`.
3. Set `docsRef` to the relevant item-spec section.
4. Re-copy into the MCP catalog and run its smoke test.

## Pending clarification

- **`Arcadia`** — the term in the request is ambiguous (it is also the name of Spotify's design system). Not registered yet; confirm which atom it refers to (or whether it is a design-system name, not an atom) and it will be added.
