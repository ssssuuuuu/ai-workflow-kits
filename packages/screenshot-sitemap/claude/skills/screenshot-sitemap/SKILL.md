---
name: screenshot-sitemap
description: >
  Use this skill when the user has a folder of website or app screenshots —
  often captured out of order, with no crawl order, URLs, or naming
  convention — and wants a sitemap tree, information architecture map, or
  depth/hierarchy analysis of the screens. Triggers include "이 스크린샷들로
  사이트맵 만들어줘", "화면들 depth 맞춰서 트리로 정리해줘", "build a sitemap from
  these screenshots", "map out this site's IA from screenshots", or any
  request to reconstruct site structure, page hierarchy, or UI/UX trend
  coverage from a folder of images.
---

# screenshot-sitemap

Reconstruct a depth-aligned sitemap tree from a folder of unordered
screenshots, then audit the screens against current UI/UX and web-trend
patterns.

Never assign depth from file order, file name, or a single glance. Depth
comes from cited visual evidence, and every node in the final tree must use
the same depth tiers so branches are actually comparable.

## Inputs

- `folder`: path to the screenshots folder (ask if not given)
- `output`: optional destination for the report (default: write
  `sitemap-report.md` next to the input folder, or to the scratchpad if the
  input folder is read-only)

## Workflow

### 1. Inventory

List every image file in `folder` (`png`, `jpg`, `jpeg`, `webp`, `gif`).
Record the full count up front — the final report must account for every
file, either as a mapped node or an explicit "excluded/unreadable" entry.

If the folder holds more than ~15-20 images, delegate the per-image reading
to the `screenshot-sitemap-analyst` subagent in batches so this doesn't
flood the main conversation with image tokens. For small folders, read the
images directly.

### 2. Extract a per-screenshot record

For each screenshot, extract (see the agent file for the full field list):

- inferred page title / purpose
- visible URL or breadcrumb trail, if any
- which nav item is highlighted/active, if any
- page type: home/landing, section hub, listing/search-results,
  detail/PDP/article, transactional (cart/checkout/form), account/settings,
  modal/overlay, error/empty state
- content-cardinality signal: one hero subject vs. a grid of many similar
  items vs. a single record's attributes
- the literal evidence used for the above (quote what's visible — don't
  paraphrase away the proof)

Do not infer a page type or depth without at least one cited visual cue.
If a screenshot is ambiguous, record it as ambiguous rather than forcing a
classification.

### 3. Infer depth per screenshot

Prefer signals in this order (higher signals override lower ones when they
conflict, but log the conflict):

1. **Breadcrumb trail** — segment count is the depth, directly.
2. **URL path segments** — if a browser chrome/address bar is visible.
3. **Nav nesting** — top-level nav highlighted only (shallower) vs. a
   sub-nav / secondary tab highlighted (deeper).
4. **Content cardinality** — broad category tiles (shallow) -> grid of many
   similar items (mid) -> one item's full detail (deep) -> single-purpose
   form/step (deepest).
5. **Chrome affordances** — a back arrow, breadcrumb, or modal close (X)
   implies "not the top of a tree."

When two signals disagree, keep the higher-priority one, but add the
screenshot to the conflicts list with both readings.

### 4. Normalize depth across all screens

Screens rarely come from one single crawl path, so don't force a strict
total order. Instead, map every screenshot onto one shared tier scale so
sibling branches line up at the same levels:

| Tier | Depth | Typical pattern |
| --- | --- | --- |
| 0 | Home / landing | brand hero, top-level entry point |
| 1 | Section / primary nav destination | category hub, dashboard tab |
| 2 | Listing / collection / search results | grid or list of many items |
| 3 | Detail / record | one item, article, or profile in full |
| 4 | Transactional / utility | cart, checkout step, settings sub-panel, form |
| 5 | Terminal / edge state | confirmation, error, empty state, modal |

Assign each screenshot's tier from its evidence in step 3. If a tier in a
section has no captured screenshot, still render that tier in the tree as
an explicit placeholder node (e.g. `(no screenshot captured)`) — skipping a
level silently breaks the depth alignment the user asked for.

### 5. Assemble the tree

Group screenshots by inferred section (the depth-1 root each belongs to,
from nav highlight or breadcrumb root). Nest by tier within each section.
Produce both:

- a Markdown indented tree, one line per node:
  `depth N — page title (page type) — screenshot: <file>`
- a Mermaid `graph TD` diagram mirroring the same tree, for visual review

### 6. Audit against current UI/UX and web-trend patterns

Load `references/trend-checklist.md` for the full checklist. For each
screenshot, tag which patterns are visibly present, visibly absent-but-
expected, or visibly dated. Roll this up into a trend alignment summary per
section: what's already current, what reads as legacy, and 3-5 concrete,
specific modernization recommendations tied to named nodes (not generic
advice).

### 7. Report

Write one report containing, in this order:

1. **Input summary** — folder, screenshot count, any unreadable/excluded
   files
2. **Depth-normalized tree** — Markdown tree + Mermaid diagram
3. **Per-node table** — depth, file, title, page type, trend tags, evidence
4. **Conflicts / low-confidence flags** — anything needing human
   confirmation, with both competing readings shown
5. **Trend alignment summary** — current vs. dated patterns, with
   recommendations anchored to specific nodes

Never mark the sitemap "complete" if any screenshot was silently dropped
from the inventory, or if a depth was assigned with zero cited evidence.

## Delegating to the agent

For folders with many screenshots, dispatch `screenshot-sitemap-analyst` in
batches (e.g. 8-10 images per batch) and collect its structured per-image
records before doing steps 3-7 yourself. The agent only extracts and
reports facts about the images — depth normalization, tree assembly, and
the trend audit rollup stay in the main conversation so the whole set is
compared consistently.

## Output

```text
Input: <folder>, <N> screenshots (<M> excluded/unreadable)
Tree: <markdown tree + mermaid>
Nodes: <table: depth | file | title | type | trend tags | evidence>
Conflicts: <list, or "none">
Trend Alignment Summary: <current patterns | dated patterns | recommendations>
```
