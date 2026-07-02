# DS Transform

Evolve an as-is general web planning document (screen spec, wireframe description, feature PRD) into a to-be, design-system-based UI component specification.

## Purpose

Most product teams write screen specs in ad-hoc visual language: "빨간 버튼", "확인 버튼", "상단 리스트". As a team adopts or matures a design system, those specs need to be restated as components, variants, states, and tokens instead of one-off visual descriptions.

This package helps with that specific transition:

```text
as-is web planning (ad-hoc UI description)
        -> UI element audit
        -> atomic component mapping
        -> token proposal
        -> DS-based spec rewrite
        -> governance handoff
to-be web planning (component + variant + state + token)
```

It does not design a design system from scratch (see `docs/design-system-methodology.md` at the repo root for that research), and it does not replace a governance process — it produces the inputs a governance process needs.

## Runtime Packs

| Runtime | Path | Status |
| --- | --- | --- |
| Claude Code | `claude/` | Active |
| Codex | `codex/` | Planned |
| Gemini | `gemini/` | Planned |
| GitHub Copilot | `copilot/` | Planned |

## Start Here

| I want to... | Use this |
| --- | --- |
| Delegate a full as-is -> DS transform as a bounded task | `claude/agents/ds-transform.agent.md` |
| Run the same workflow inline in the main chat | `claude/skills/ds-transform/SKILL.md` |
| See a worked example (checkout screen) | `examples/legacy-screen-transform/` |
| See a worked example (chart text family, variant matrix) | `examples/chart-text-variant-matrix/` |
| See a worked example (List / Detail / Search / Card) | `examples/list-detail-search-card-transform/` |
| See a worked example (Checkbox / Radio / Button / Field text roles) | `examples/form-atoms-variant-matrix/` |

Use the **agent** when the source document is large or the work should run as a separate, boundable task with its own report. Use the **skill** when you want the main chat to walk through the same five phases directly, without spawning a subagent.

## Five-Phase Method

1. **As-Is Audit** — extract every UI element mention from the source doc into an inventory table.
2. **Atomic Mapping** — classify each element (atom/molecule/organism/template/page) and consolidate near-duplicates into component candidates.
3. **Tokenization** — extract repeated raw values into a 3-tier token proposal (global -> semantic -> component).
4. **DS-Based Spec Rewrite** — restate the original screen definitions using component + variant + state + token references. When the output is an internal handoff spec and a component has two independent visual axes (e.g. `weight x size`, `color x align`, `kind x size`), render it as a variant matrix — a grid with real rendered content in each cell — instead of prose. For public-facing docs, use anatomy + prose even for two-axis atoms (see below).
5. **Governance Handoff** — flag net-new/breaking component candidates for the target team's RFC or review process, with an adoption note.

Each phase's output is required input for the next. See the agent and skill files for the full method and output shape.

### Variant Matrix Documentation

For internal handoff specs with multiple independent variants, use a two-axis grid table instead of a bullet list: one axis as rows, the other as columns, each cell showing the component actually rendered in that combination. Cap each table at two axes and split a third axis into a separate table. Group related components under one namespace-prefixed family name (e.g. `Chart` + `Value`/`Label`/`Legend`, or `Field` + `Label`/`Title`/`Description`) so the relationship is visible from the name alone. See `docs/design-system-methodology.md#17-아이템-단위-컴포넌트-스펙-배리언트-매트릭스-문서화` at the repo root for the full pattern and sources, and `examples/chart-text-variant-matrix/` / `examples/form-atoms-variant-matrix/` for worked examples.

### UI Archetype Reference

Real public design system documentation (Material Design 3, Carbon, Ant Design, Atlassian, Shopify Polaris) mostly uses anatomy diagram + prose for List, Detail, Search, Card, Checkbox, Radio, Button, and even form Label/Description/Title — not a variant matrix. A rendered two-axis matrix is a Figma component-set convention, not a public-doc one; reserve it for internal handoff specs where every combination needs to be QA'd on one page. See sections 17.1-17.9 of `docs/design-system-methodology.md` and `examples/list-detail-search-card-transform/` / `examples/form-atoms-variant-matrix/` for the researched anatomy, common variant axes, and documentation approach for each archetype.

## Evidence Contract

A completed transform should return:

- As-Is UI Inventory (`element | occurrences | current definition | inconsistency notes`)
- Component Candidate List (`component | atomic level | variants | consolidates | priority`)
- Token proposal (global / semantic / component tiers)
- DS-based spec rewrite of the source screens
- Governance/adoption notes (net-new vs. existing, migration order)
- Unresolved risks (ambiguous elements, missing states, conflicting sources)

Before publishing changes to this package, run:

```powershell
python tools/public-safety-scan.py --history
```
