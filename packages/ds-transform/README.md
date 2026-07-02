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
| See a worked example | `examples/legacy-screen-transform/` |

Use the **agent** when the source document is large or the work should run as a separate, boundable task with its own report. Use the **skill** when you want the main chat to walk through the same five phases directly, without spawning a subagent.

## Five-Phase Method

1. **As-Is Audit** — extract every UI element mention from the source doc into an inventory table.
2. **Atomic Mapping** — classify each element (atom/molecule/organism/template/page) and consolidate near-duplicates into component candidates.
3. **Tokenization** — extract repeated raw values into a 3-tier token proposal (global -> semantic -> component).
4. **DS-Based Spec Rewrite** — restate the original screen definitions using component + variant + state + token references.
5. **Governance Handoff** — flag net-new/breaking component candidates for the target team's RFC or review process, with an adoption note.

Each phase's output is required input for the next. See the agent and skill files for the full method and output shape.

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
