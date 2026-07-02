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

2. **Atomic Mapping** — classify each inventory item as atom, molecule, organism, template, or page (Atomic Design). Consolidate near-duplicates (e.g. "확인/저장/제출 버튼" -> one Button component with variants) into component candidates: `component | atomic level | variants | consolidates | priority`. Priority follows occurrence frequency, not subjective judgment.

3. **Tokenization** — extract repeated raw values (color, spacing, radius, typography) and propose a 3-tier token set: global/core -> semantic/alias -> component, named `namespace-object-base-modifier`. Flag genuine one-offs as open questions rather than forcing a token.

4. **DS-Based Spec Rewrite** — restate the original screen definitions using component + variant + state + token references instead of raw visual description. For each component candidate, add anatomy, states, props/variants, accessibility notes, and do's/don'ts. Keep business logic and screen flow untouched.
   - **Variant matrix rule**: when a component has two independent visual axes (e.g. `weight x size`, `color x align`), render the variants as a grid — one axis as rows, one as columns, real rendered content in each cell — instead of a prose list. Cap each table at two axes; split a third axis into a separate table. Group related components under one namespace-prefixed family name (e.g. `Chart` + `Value`/`Label`/`Legend`).

5. **Governance Handoff** — mark which candidates are net-new vs. already exist in the target system (if known). Flag net-new or breaking candidates as RFC-worthy. Note the number of affected screens/instances and a suggested migration order (highest occurrence first).

Each phase feeds the next — do not skip ahead or merge phases.

## UI Archetype Reference

Real public design systems mostly document List/Card/Search with an anatomy diagram + prose, not a variant matrix — reserve the matrix for atom-level, two-axis components (see the variant matrix rule above).

| Archetype | Anatomy | Common axes | Phase 4 approach |
| --- | --- | --- | --- |
| List / ListItem | leading, title, supporting text, trailing | density, content lines, leading/trailing presence | anatomy + prose; split leading/trailing into namespace-prefixed sub-components if they carry independent logic |
| Detail / Description | label + value, optional actions | layout, column count, bordered | prose + explicit action-count sub-table (none/single/multiple/group-level) |
| Search | search icon, input, clear button, optional submit | expanded vs collapsed, with/without button, size | anatomy + prose; route empty/loading states to the system-wide pattern |
| Card | media, headline, subhead, supporting text, actions | style, media presence, orientation | anatomy + prose; split behavior-specific variants (clickable/selectable/expandable) into their own components |
| Atom-level, two-axis component | single visual unit | two independent props | variant matrix table |

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
