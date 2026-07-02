---
name: ds-transform
description: >
  Use this skill when a user has an as-is general web planning document
  (screen spec, wireframe description, feature PRD) written in ad-hoc UI
  language and wants it evolved into a design-system-based UI component
  specification: "이 기획서를 디자인시스템 기준으로 바꿔줘", "컴포넌트로
  정리해줘", "as-is를 DS 컴포넌트 설계로 전환해줘", or any request to map
  existing screen definitions onto components, variants, states, and tokens.
---

# ds-transform

Use this skill to evolve an as-is web planning document into a design-system-based ("to-be") UI component specification, directly in the main conversation.

## When to Delegate Instead

If the source document is large (many screens) or the user wants a separate, boundable report, dispatch `claude/agents/ds-transform.agent.md` instead of running this skill inline. Use this skill for smaller inputs or when the user wants to stay in the current conversation.

## Core Transform

```text
as-is web planning (ad-hoc UI description)
        -> UI element audit
        -> atomic component mapping
        -> token proposal
        -> DS-based spec rewrite
        -> governance handoff
to-be web planning (component + variant + state + token)
```

## Workflow

1. **As-Is Audit** — read the source document. List every distinct UI element mention with where it appears, how many near-duplicate elements exist under different names, and any stated state (hover, disabled, error, loading, empty). Output an inventory table: `element | occurrences | current definition | inconsistency notes`.

2. **Atomic Mapping** — classify each inventory item as atom, molecule, organism, template, or page (Atomic Design). Consolidate near-duplicates (e.g. "확인/저장/제출 버튼" -> one Button component with variants) into component candidates: `component | atomic level | slots | variants | consolidates | priority`. Promote co-occurring atoms into a molecule component and record each atom as a **named slot** (`#title`, `#meta`, `#leading`…) — this is the composition layer (atom → molecule → collection → screen; see methodology section 18). Priority follows occurrence frequency, not subjective judgment.

3. **Tokenization** — extract repeated raw values (color, spacing, radius, typography) and propose a 3-tier token set: global/core -> semantic/alias -> component, named `namespace-object-base-modifier`. Flag genuine one-offs as open questions rather than forcing a token.

4. **DS-Based Spec Rewrite** — restate the original screen definitions using component + variant + state + token references instead of raw visual description. For each component candidate, add anatomy, states, props/variants, accessibility notes, and do's/don'ts. Keep business logic and screen flow untouched.
   - **Variant matrix rule**: matrices are for internal handoff specs (Figma-derived, every combination needs QA), not for public-facing docs. When producing a handoff spec and a component has two independent visual axes (e.g. `weight x size`, `color x align`, `kind x size`), render the variants as a grid — one axis as rows, one as columns, real rendered content in each cell. When producing public-facing docs, use anatomy + prose instead, even for simple two-axis atoms like checkbox, radio, or button — that's what Material Design 3, Carbon, Ant Design, Atlassian, and Polaris actually do. Cap each matrix table at two axes; split a third axis into a separate table. Group related components under one namespace-prefixed family name (e.g. `Chart` + `Value`/`Label`/`Legend`, or `Field` + `Label`/`Title`/`Description`).
   - **Composition rule**: for a molecule built from atom slots, write a slot anatomy diagram (which atom in which region), treat layout/alignment differences (`region=left`/`right`) as one variant not two components, and state the composition API (compound/namespace children vs data array). Express the screen as a component placement map to keep atom → component → screen traceability.

5. **Governance Handoff** — mark which candidates are net-new vs. already exist in the target system (if known). Flag net-new or breaking candidates as RFC-worthy. Note the number of affected screens/instances and a suggested migration order (highest occurrence first).

Each phase feeds the next — do not skip ahead or merge phases.

## UI Archetype Reference

Even the simplest atoms (checkbox, radio, button, form label) are documented with anatomy + prose in real public design systems, not matrices — matrices win only for internal handoff specs (see the variant matrix rule above).

| Archetype | Anatomy | Common axes | Phase 4 approach |
| --- | --- | --- | --- |
| List / ListItem | leading, title, supporting text, trailing | density, content lines, leading/trailing presence | anatomy + prose; split leading/trailing into namespace-prefixed sub-components if they carry independent logic |
| Detail / Description | label + value, optional actions | layout, column count, bordered | prose + explicit action-count sub-table (none/single/multiple/group-level) |
| Search | search icon, input, clear button, optional submit | expanded vs collapsed, with/without button, size | anatomy + prose; route empty/loading states to the system-wide pattern |
| Card | media, headline, subhead, supporting text, actions | style, media presence, orientation | anatomy + prose; split behavior-specific variants (clickable/selectable/expandable) into their own components |
| Checkbox / Radio | container/circle, mark, label | selection state x interaction state | anatomy + prose for public docs; document the group as a separate component |
| Button | label, container, optional icon | kind/appearance x size | anatomy + prose for public docs; icon-only is a separate `IconButton` or a prop, not a new axis on the matrix |
| Label / Description / Title | label text, required indicator, helper text, title text | required/optional, tone, typography role x size | anatomy + prose; group as one namespace-prefixed family (e.g. `Field` + `Label`/`Title`/`Description`) |
| Input (TextField/Textarea/Select/Switch) | label, container, placeholder, icons, helper/error text | size, style (filled/outlined), state; Select adds single/multi | anatomy + prose; Textarea = variant vs own component; Select splits into native/custom/combobox; options via `Select.Option` |
| Tag / Badge / Chip | container, label, optional icon/dismiss/count | tone x style; interactive (read-only/dismissible/selectable) | anatomy + prose + single-axis (tone) gallery; separate status vs object-label vs numeric count naming |
| Feedback (Alert/Banner/Toast/Tooltip) | icon, title, body, actions, dismiss; tooltip = caret + content | severity x placement; tooltip placement x align | anatomy + prose; map severity to a11y live-region; separate transient (toast) from persistent (banner) |
| Navigation (Tabs/Breadcrumb/Pagination/Menu) | item + container + indicator/separator | style, size, item state; menu adds danger/submenu | anatomy + prose; split item vs container OR use a data array; document current/active item as a distinct state |
| Atom-level, two-axis component in a handoff spec | single visual unit | two independent props | variant matrix table |

Four recurring laws across all archetypes: (1) rendered matrices are the exception — public docs use anatomy + prose even for two-axis atoms (only Ant's Tooltip placement grid is a true rendered matrix); (2) split "item" from "group" (Select/Option, Menu/MenuItem, Tabs/Tab); (3) sub-parts are either a namespace family (`Select.Option`) or a data array (`items`); (4) delegate empty/loading/error to system-wide patterns and link.

## Guardrails

- Do not invent product requirements absent from the source document.
- Do not assume an existing design system's token or component names unless the user provided them; ask before renaming into an assumed system.
- Keep visually-similar-but-semantically-different elements distinct (e.g. "삭제" vs "취소").
- This skill restates UI description — it does not redesign product flows or business logic.

## Output

```text
Source: <document(s) analyzed>
As-Is Inventory: <table or path>
Component Candidates: <table or path>
Token Proposal: <global/semantic/component tiers>
DS-Based Spec: <rewritten sections or path>
Governance Notes: <net-new vs existing, migration order>
Unresolved Risks: <list or "none">
```
