# Screenshot Sitemap

Screenshot Sitemap turns a folder of random, unordered website screenshots into a
depth-aligned sitemap tree, annotated with modern UI/UX pattern and web-trend
analysis. Recorded web/app test videos (including PowerPoint screen recordings)
can join the input — frames are sampled at 1-2 s intervals, near-duplicates
dropped, and kept frames analyzed like screenshots with video + timestamp
provenance. When documents listing each page's HTML attributes and tags are also
provided, it cross-checks visual design against markup quality and produces a
consulting report.

## Purpose

Teams often end up with a folder of screenshots captured out of order — no
crawl order, no URLs, no file-name convention — and need to answer:

- What is the actual information architecture of this site?
- Which screen sits at which depth, and how do sections compare to each other?
- Where does the design already use current web trends, and where is it dated?
- Does the markup underneath match the design on top — or is a modern-looking
  screen sitting on div-soup with no semantics, a11y, or structured data?

This package defines the method (skill) and the workers (agents) to turn
those inputs into one evidence-backed sitemap + consulting report instead of
a guess.

## Start Here

| I use... | Open this |
| --- | --- |
| Claude Code skill | [`claude/skills/screenshot-sitemap/SKILL.md`](claude/skills/screenshot-sitemap/SKILL.md) |
| Claude Code agent (vision) | [`claude/agents/screenshot-sitemap-analyst.agent.md`](claude/agents/screenshot-sitemap-analyst.agent.md) |
| Claude Code agent (HTML docs) | [`claude/agents/html-signal-analyst.agent.md`](claude/agents/html-signal-analyst.agent.md) |
| Claude Code command | [`claude/commands/screenshot-sitemap.md`](claude/commands/screenshot-sitemap.md) |
| Korean guide | [`docs/ko/screenshot-sitemap-guide.md`](docs/ko/screenshot-sitemap-guide.md) |

Other runtimes (Codex, Gemini, Copilot) are `planned` — not built yet. This
package currently ships a Claude Code implementation only.

## Runtime Packs

| Runtime | Path | Status |
| --- | --- | --- |
| Codex | `codex/` | Planned |
| Claude Code | `claude/` | Active |
| Gemini | `gemini/` | Planned |
| GitHub Copilot | `copilot/` | Planned |

## Method Summary

```text
inventory screenshots (+ extract & dedup video frames when provided)
  -> read each screen -> extract depth evidence
  (+ parse HTML docs, match pages to screens when provided)
  -> normalize depth across sections -> assemble tree -> audit against
  current UI/UX + web-trend patterns -> cross-check visual x markup
  -> report with consulting findings and conflicts flagged
```

Depth is never assigned by file order or guesswork alone. Every depth
assignment must cite visible evidence (breadcrumb, nav highlight, URL bar,
content cardinality, or back/close affordance). When evidence is missing or
conflicting, the report flags the node as low-confidence instead of silently
picking a depth.

## Trend Reference Sources

The trend checklist (`claude/skills/screenshot-sitemap/references/trend-checklist.md`)
is seeded from the pattern language of award-site showcases and mood-board
platforms, and can be topped up live for currency:

- **Award-site showcases** — Awwwards, CSS Design Awards, FWA: best-in-class
  interaction, motion, and layout patterns
- **Pinterest trend/mood boards** — current color, texture, and visual-mood
  trends

Live lookups supplement the static checklist; every tag still has to trace
back to a visible cue in the actual screenshot being audited.

## Evidence Contract

A completed run must produce:

- `screenshot_inventory` — every image file found in the input folder, none
  silently skipped; for video inputs, extracted/dropped/kept frame counts
  per recording, with each kept frame carrying `video-frame <file> @ <mm:ss>`
  provenance
- `depth_normalized_tree` — one tree where every branch uses the same depth
  tiers (Home -> Section -> Listing -> Detail -> Transactional/Utility),
  with explicit placeholder nodes for tiers no screenshot covers
- `per_node_evidence` — for every node, the visual cues that justified its
  page type and depth
- `trend_alignment_summary` — which current UI/UX and web-trend patterns are
  present, absent, or dated per section, with concrete recommendations
- `unresolved_conflicts` — any screenshot whose evidence pointed to more than
  one plausible depth or parent, left explicit rather than resolved by guess
- `consulting_findings_with_paired_evidence` — when HTML docs are provided:
  every finding cites both a visual cue from the screenshot and quoted markup
  from the doc, with severity (`critical`/`major`/`minor`/`quick-win`), rolled
  up into an executive summary, per-section scorecard, and prioritized roadmap

## Runtime Cases

| Runtime | Example |
| --- | --- |
| Claude Code | [`examples/sample-sitemap-report.example.md`](examples/sample-sitemap-report.example.md) |

Before publishing changes to this package, run:

```powershell
python tools/public-safety-scan.py --history
```
