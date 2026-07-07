# Design System Audit & UI/UX Guide

Reference for the design-system extraction and UI/UX guide steps of
`screenshot-sitemap`. Everything here is *observed*, reverse-engineered
from the screenshots and video frames — never a guess at what the team's
Figma file might contain. Every token, component, and inconsistency must
cite the screens it was seen on.

## Part 1 — Observed design tokens

Extract from the full screen set (screenshots + kept video frames):

### Color

- Approximate hex per role: primary/brand, secondary/accent, surface,
  background, text (primary/muted), success/warning/error, borders
- Where each role was sampled (`shot_02.png header CTA`, `f_00042 @ 0:42
  toast`) — cite at least one screen per token
- Drift findings: the "same" role appearing as visibly different values
  on different screens (two different blues for primary buttons)
- Dark mode: if both themes appear in the set, map roles across themes
  and flag unpaired colors

### Typography

- Families visible (or closest classification: geometric sans, humanist
  sans, serif, mono), weights in use, apparent type scale
  (display/heading/body/caption sizes relative to each other)
- Hierarchy consistency: does the same heading level look the same
  across sections?

### Shape, space, elevation

- Corner radius family (sharp / small / pill / mixed — mixed is a finding)
- Spacing rhythm: consistent gutters/padding or per-screen improvisation
- Shadow/elevation styles and whether they encode a consistent layering
  logic
- Iconography: single set or visibly mixed sets (line + filled mixed on
  one screen is a finding)

## Part 2 — Component inventory

Build a component-by-screen matrix. For each component type observed —
buttons (per variant), inputs, selects, cards, nav bars, tabs, tables,
badges, modals/sheets, toasts, pagination, breadcrumbs, empty states,
loaders — record:

- variants seen (primary/secondary/ghost; sizes)
- states actually captured (default, hover, focus, disabled, loading,
  error) — uncaptured states are listed as `not observed`, not assumed
  to exist or not exist
- which screens it appears on
- inconsistencies: same component, different styling across screens
  (cite both screens); one-off components that exist on a single screen

The matrix is the backbone of the design-system maturity verdict:
many shared, consistent components -> a de facto system exists; many
one-offs and drift -> screens are being designed page-by-page.

## Part 3 — UI/UX guide

Evaluate the flows the tree reveals (not just single screens) against
this rubric, citing screens for every point:

1. **Navigation & orientation** — can users tell where they are at every
   depth (active states, breadcrumbs, titles)? Do sibling sections
   behave consistently?
2. **Visibility of status** — loading, success, and error states exist
   and are visible (video frames often capture these better than
   screenshots)
3. **Consistency** — same action looks the same everywhere; terminology
   stable across screens
4. **Error prevention & recovery** — destructive-action confirmations,
   inline validation, recoverable errors with next steps
5. **Recognition over recall** — labels visible rather than icon-only
   mysteries; defaults and examples in forms
6. **Efficiency** — shortcuts for repeat users (search-first nav,
   recently-viewed), reasonable step counts in transactional flows
7. **Visual accessibility** — contrast red flags, touch-target size on
   mobile screens, focus visibility if captured
8. **Emotional quality** — where the design delights (micro-interactions,
   motion) and where it feels generic; ties back to the trend audit

Write the guide as concrete do/keep/change guidelines anchored to
observed evidence:

- **Keep** — patterns that work and should be codified (name the screens)
- **Change** — violations with the screen, the rubric item, and a
  specific fix
- **Codify** — de facto standards observed across screens that should be
  written into the design system so drift stops (e.g. "the 8px-radius
  card used on 9 of 12 screens is the standard; the two outliers adopt it")

## Roll-up: design system maturity verdict

Close with one paragraph: does a coherent system exist in practice?
Grade each of tokens / components / patterns as
`consistent | drifting | ad hoc`, then state the top 3 systemization
moves in priority order. When HTML docs were provided, pair this with
the markup-side verdict (e.g. visually consistent buttons that are
`<div>`s in code are consistent pixels, not a system).
