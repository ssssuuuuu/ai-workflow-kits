---
name: screenshot-sitemap
description: >
  Use this skill when the user has a folder of website or app screenshots —
  often captured out of order, with no crawl order, URLs, or naming
  convention — and wants a sitemap tree, information architecture map, or
  depth/hierarchy analysis of the screens. Also use it when the input
  includes recorded web/app test videos (screen recordings, PowerPoint
  recordings) to be sampled frame-by-frame with duplicates dropped, or
  documents listing each page's HTML attributes and tags for a consulting
  report that cross-checks visual design against markup quality. Triggers
  include "이 스크린샷들로 사이트맵 만들어줘", "화면들 depth 맞춰서 트리로
  정리해줘", "테스트 영상 프레임 단위로 분석해줘", "html 태그/속성
  문서랑 같이 분석해서 컨설팅 결과 뽑아줘", "build a sitemap from
  these screenshots", "map out this site's IA from screenshots", or any
  request to reconstruct site structure, page hierarchy, UI/UX trend
  coverage, an observed design system, a UI/UX guide, or a comprehensive
  design+markup consulting report from screenshots and recordings.
---

# screenshot-sitemap

Turn unordered screenshots and video frames into one comprehensive
analysis report: a depth-aligned sitemap tree, a trend audit, the
observed design system, a UI/UX guide, and (with HTML docs) consulting
findings. The sitemap is the skeleton; the deliverable is the whole
report.

Never assign depth from file order, file name, or a single glance. Depth
comes from cited visual evidence, and every node in the final tree must use
the same depth tiers so branches are actually comparable.

## Inputs

- `folder`: path to the screenshots folder (ask if not given)
- `videos`: optional path(s) to recorded web/app test videos (`mp4`,
  `mov`, `webm`, `mkv`, `avi`, `wmv`) or PowerPoint decks with embedded
  screen recordings (`pptx`). Frames are extracted at 1-2 s intervals,
  near-duplicates dropped, and the kept frames join the screenshot
  inventory with source-video + timestamp provenance.
- `html_docs`: optional path(s) to documents that list each page's HTML
  attributes and tags — exported markup, audit spreadsheets/CSVs, or
  markdown/text notes per page. When provided, the run produces a
  consulting report (step 7) on top of the sitemap.
- `output`: optional destination for the report (default: write
  `sitemap-report.md` next to the input folder, or to the scratchpad if the
  input folder is read-only)

## Workflow

### 1. Inventory

List every image file in `folder` (`png`, `jpg`, `jpeg`, `webp`, `gif`).
Record the full count up front — the final report must account for every
file, either as a mapped node or an explicit "excluded/unreadable" entry.

When `videos` is provided, run the extraction pipeline in
`references/video-frame-extraction.md` first, in the main conversation
(it's mechanical Bash/Python work, not vision work):

1. unzip `pptx` inputs and pull the embedded recordings from `ppt/media/`
2. extract frames with `ffmpeg` at 1 fps (2 s interval / 0.5 fps for
   recordings over ~10 min)
3. drop near-duplicate frames with the difference-hash script (compare
   against the last *kept* frame; keep borderline frames)
4. add each kept frame to the inventory with provenance:
   `video-frame <video file> @ <mm:ss>`

Report extracted/dropped/kept counts — the dedup must be visible, and a
kept frame counts like any screenshot from here on.

If the combined set holds more than ~15-20 images, delegate the per-image
reading to the `screenshot-sitemap-analyst` subagent in batches so this
doesn't flood the main conversation with image tokens. For small sets,
read the images directly. When dispatching video frames, tell the agent
each frame's provenance and its within-recording order.

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

### 3. Parse the HTML evidence (when `html_docs` is provided)

Read every provided document and build one HTML signal record per page,
using `references/html-signal-checklist.md` for the full signal list:

- match each documented page to a screenshot — by URL, `<title>`, visible
  page heading, or explicit page name in the doc. Record unmatched pages
  on both sides (a documented page with no screenshot, a screenshot with
  no doc) instead of forcing a pairing.
- extract per page: semantic structure (`header/nav/main/article/section`
  vs. div-soup), heading hierarchy (`h1` count, level skips), landmark and
  ARIA usage, image handling (`alt`, `srcset`, `loading="lazy"`), metadata
  (`<title>`, meta description, canonical, Open Graph), structured data
  (JSON-LD types), form semantics (`label`/`autocomplete`/input types),
  and modern-platform features (view transitions, `<dialog>`, popover,
  container queries hinted in the doc).
- quote the actual attribute/tag from the document as evidence — never
  infer markup that the doc doesn't show.

If there are many documents, dispatch `html-signal-analyst` in batches the
same way screenshots are batched; matching doc pages to screenshots stays
in the main conversation.

### 4. Infer depth per screenshot

Prefer signals in this order (higher signals override lower ones when they
conflict, but log the conflict):

1. **Breadcrumb trail** — segment count is the depth, directly.
2. **URL path segments** — if a browser chrome/address bar is visible, or
   if the matched HTML doc records the page URL or `<link rel="canonical">`.
3. **Nav nesting** — top-level nav highlighted only (shallower) vs. a
   sub-nav / secondary tab highlighted (deeper).
4. **Content cardinality** — broad category tiles (shallow) -> grid of many
   similar items (mid) -> one item's full detail (deep) -> single-purpose
   form/step (deepest).
5. **Chrome affordances** — a back arrow, breadcrumb, or modal close (X)
   implies "not the top of a tree."
6. **Recording transition order** (video frames only) — consecutive kept
   frames from one recording usually represent a navigation step, so a
   frame following a listing frame and showing one item is likely that
   listing's child. Supporting evidence only: it never overrides signals
   1-5, and a disagreement goes to the conflicts list. Frames caught
   mid-transition (blur, half-rendered) are tagged `transition/loading`,
   not forced into a page type.

When two signals disagree, keep the higher-priority one, but add the
screenshot to the conflicts list with both readings.

### 5. Normalize depth across all screens

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

Assign each screenshot's tier from its evidence in step 4. If a tier in a
section has no captured screenshot, still render that tier in the tree as
an explicit placeholder node (e.g. `(no screenshot captured)`) — skipping a
level silently breaks the depth alignment the user asked for.

### 6. Assemble the tree

Group screenshots by inferred section (the depth-1 root each belongs to,
from nav highlight or breadcrumb root). Nest by tier within each section.
Produce both:

- a Markdown indented tree, one line per node:
  `depth N — page title (page type) — screenshot: <file>`
- a Mermaid `graph TD` diagram mirroring the same tree, for visual review

### 7. Audit against current UI/UX and web-trend patterns

Load `references/trend-checklist.md` for the full checklist. For each
screenshot, tag which patterns are visibly present, visibly absent-but-
expected, or visibly dated. Roll this up into a trend alignment summary per
section: what's already current, what reads as legacy, and 3-5 concrete,
specific modernization recommendations tied to named nodes (not generic
advice).

When currency matters (the user asks for "latest" trends, or the report
will inform a redesign), top up the static checklist with a short live
lookup using `WebSearch`/`WebFetch`, per the "Trend Research Sources"
section of the checklist file:

- Award-site showcases (Awwwards, CSS Design Awards, FWA) for
  interaction/motion/layout patterns currently recognized as best-in-class
- Pinterest trend/mood boards for current color, texture, and visual-mood
  trends

Cite anything pulled this way as `source — title/URL — pattern observed`,
and only use it to sharpen a tag that still traces back to a visible cue in
the actual screenshot. If the lookup isn't available or turns up nothing
concrete, say so and fall back to the static checklist rather than
fabricating a source.

### 8. Consulting synthesis (when `html_docs` is provided)

Cross-check each node's visual evidence (steps 2, 7) against its HTML
signal record (step 3). The consulting value comes from the *combination*
— neither source alone can produce these findings:

| Visual says | Markup says | Consulting finding |
| --- | --- | --- |
| looks modern/current | div-soup, no landmarks, no alt | "lipstick" — surface redesign on weak foundations; a11y/SEO risk |
| looks dated | clean semantics, structured data | strong foundation — a visual refresh is cheap and low-risk here |
| breadcrumb visible | no `BreadcrumbList` JSON-LD | quick win: mark up what's already designed |
| grid/listing page | no `srcset`/`loading="lazy"` | performance debt exactly where image count is highest |
| form step | inputs lack `label`/`autocomplete`/types | conversion + a11y risk at the money page |

For every finding record: node (depth + screenshot + doc page), severity
(`critical` / `major` / `minor` / `quick-win`), the paired evidence (visual
cue + quoted markup), and a concrete recommendation. Then roll up:

- **Executive summary** — 3-5 sentences on overall design/markup health
- **Scorecard per section** — visual currency vs. markup quality
  (`current/dated` x `solid/weak`), so gaps are visible per branch
- **Prioritized roadmap** — quick wins first, then structural work, each
  item anchored to named nodes

Findings must cite both sides of the evidence. If a page has only a
screenshot or only a doc, it can appear in the sitemap but not in a
cross-check finding — list it under "insufficient evidence" instead.

### 9. Extract the observed design system

Follow `references/design-system-audit.md`, parts 1-2. From the full
screen set (screenshots + kept frames), reverse-engineer:

- **Observed tokens** — color roles with approximate hex, typography
  families/weights/scale, radius/spacing/elevation families, icon style —
  each token citing at least one screen it was sampled from
- **Component inventory** — a component-by-screen matrix with variants,
  captured states (`not observed` is a valid state), and drift findings
  (same component styled differently on different screens, both cited)

This is observation, not invention: never describe a token or component
no screen shows.

### 10. Write the UI/UX guide

Follow `references/design-system-audit.md`, part 3. Evaluate the *flows*
the tree reveals against the 8-point rubric (orientation, status,
consistency, error recovery, recognition, efficiency, visual
accessibility, emotional quality), then write concrete guidelines in
three buckets — **Keep** (works, codify it), **Change** (violation +
screen + fix), **Codify** (de facto standards that should become written
rules) — every item anchored to named screens. Video frames are the best
source for status/transition findings; use them.

### 11. Comprehensive report

Pick the output mode first, per `references/report-modes.md`: **실무 상세**
(default — evidence tags and IDs in the body), **경영 보고** (executive —
conclusions/numbers/asks first, detail collapsed into appendices, cost
language instead of analyst language), or **심플 문서형** (Korean
formal-document style — Ⅰ/Ⅱ/Ⅲ numbering, table-centric, minimal color).
Signals like "상급자 보고", "경영진", "결재 문서", "심플하게" switch the
mode; the content below stays the same in all three.

Write one report containing, in this order:

1. **Executive summary** — 5-8 sentences: what the product is, IA health,
   design currency, system maturity, top risks and quick wins. Written
   last, placed first.
2. **Input summary** — folder, screenshot count, videos with
   extracted/deduped/kept frame counts, doc count, unmatched pages, any
   unreadable/excluded files
3. **Depth-normalized tree** — Markdown tree + Mermaid diagram
4. **Per-node table** — depth, file (with `video @ mm:ss` provenance for
   frames), title, page type, trend tags, HTML signal summary, evidence
5. **Conflicts / low-confidence flags** — anything needing human
   confirmation, with both competing readings shown
6. **Trend alignment summary** — current vs. dated patterns, with
   recommendations anchored to specific nodes
7. **Observed design system** — token tables, component matrix, drift
   findings, maturity verdict (`consistent | drifting | ad hoc` per
   tokens/components/patterns) from step 9
8. **UI/UX guide** — Keep / Change / Codify guidelines from step 10
9. **Consulting section** (when `html_docs` provided) — per-section
   scorecard, prioritized findings from step 8
10. **Unified roadmap** — one merged, prioritized list across trend,
    design-system, UI/UX, and consulting findings: quick wins first,
    then structural work, each item citing its evidence

Never mark the report "complete" if any screenshot was silently dropped
from the inventory, or if a depth was assigned with zero cited evidence.
Never include a consulting finding without paired visual + markup
evidence, a token or component no screen shows, or a guideline without a
named screen behind it.

## Delegating to the agents

For folders with many screenshots, dispatch `screenshot-sitemap-analyst` in
batches (e.g. 8-10 images per batch); for many HTML docs, dispatch
`html-signal-analyst` in batches the same way. Keep frames from the same
recording contiguous and in timestamp order within a batch so the agent
can fill in `transition_note` — don't shuffle recordings together. Both agents only extract
and report facts with quoted evidence — screenshot/doc matching, depth
normalization, tree assembly, the trend rollup, design-system and UI/UX
synthesis, and the consulting synthesis all stay in the main conversation
so the whole set is compared consistently. The per-image `ui_inventory`
and `style_sample` fields the vision agent returns are the raw material
for the design-system step.

## Output

```text
Executive Summary: <IA health | design currency | system maturity | top risks & quick wins>
Input: <folder>, <N> screenshots (<M> excluded/unreadable), <V> videos
       (<E> frames extracted -> <K> kept after dedup), <D> html docs
Tree: <markdown tree + mermaid>
Nodes: <table: depth | file | title | type | trend tags | html signals | evidence>
Conflicts: <list, or "none">
Trend Alignment Summary: <current patterns | dated patterns | recommendations>
Design System (observed): <token tables | component matrix | drift | maturity verdict>
UI/UX Guide: <Keep | Change | Codify — all screen-anchored>
Consulting: <scorecard | prioritized findings>  (when html_docs provided)
Unified Roadmap: <quick wins -> structural, merged across all sections>
```
