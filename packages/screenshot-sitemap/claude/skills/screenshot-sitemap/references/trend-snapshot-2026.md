# Trend Snapshot — researched 2026-07

Dated snapshot of live trend research for the `screenshot-sitemap` trend
audit. This file is a point-in-time supplement to `trend-checklist.md`:
prefer it over the static checklist for "what's current right now"
questions, but re-run the live lookup when this file is more than ~2
seasons old.

Research note: direct fetches of `pinterest.com` (search pages, ideas
pages, even the newsroom) return HTTP 403 to unauthenticated/proxied
clients. The workable path is web search over Pinterest Predicts coverage
and secondary sources, which is how this snapshot was gathered.

## Pinterest Predicts 2026 — visual signals usable in a screenshot audit

Pinterest's annual forecast (21 trends, historically ~88% accurate; Gen Z
driving most) is lifestyle-wide, but these translate into taggable visual
signals for web/app screens:

- **Cool Blue** — light, icy blue as the dominant accent across palettes
  and "menus"; tag when a screen's palette centers a pale/ice blue rather
  than the long-running purple/indigo SaaS default.
- **Neo Deco** — modern Art Deco: geometric lines, chevrons, fan arches,
  brass/chrome/copper metallic accents; tag on decorative borders,
  section dividers, and hero framing.
- **Glitchy Glam** — deliberate glitch/scanline/chromatic-aberration
  effects used glamorously rather than as error styling.
- **Gimme Gummy / Gimme Rubber** — jelly-like, bouncy, rubbery surfaces:
  squishy 3D buttons and blobs, high-gloss "jelly" gradients, bendy
  mascots; the web echo of tactile maximalism.
- **Glittery Glow / opalescent** — iridescent, pearlescent, intergalactic
  gradients (ties to the "alien core" aesthetic, searches +80%).
- **Laced Up** — lace/doily/crochet texture as ornament; on the web this
  shows up as delicate cut-out patterns and scalloped edges.
- **Opera Aesthetic** — vintage opulence: deep reds, curtains, cabaret
  framing; tag on editorial/hero art direction.
- **Poetcore / Pen Pals** — romantic-analog styling: stationery
  textures, handwriting/serif italics, letter motifs.

Mood shift behind the 21 trends: comfort, identity, and escapism over
status signaling — expect softer, more personal, more textured screens
rather than sterile corporate minimalism.

## Web/app UI-UX 2026 — what award galleries and product-design roundups agree on

- **Typography as the layout** — oversized, mostly sans-serif display
  type against solid/gradient/monochrome backdrops; kinetic type that
  scales, splits, or morphs on scroll (Obys-style). Headlines treated
  like movie title screens.
- **Function-forward dashboards** — reaction against pastel-gradient
  SaaS sameness: visible grids as foreground elements, wireframe logic
  kept in final UI, monospaced type aligning visual rhythm with data.
- **Motion with purpose** — motion as a communication layer (state
  change, hierarchy, spatial context), not decoration; mixed scroll
  directions used as chaptering.
- **Glassmorphism, surgically** — back in the mainstream via Apple's
  translucent surfaces, but current usage is confined to overlay cards,
  notification panels, media controls, contextual menus — not whole
  pages.
- **Bottom sheets as the default secondary container** on mobile
  (standardized by iOS `UISheetPresentationController`).
- **AI as copilot, not autopilot** — AI surfaces that are present,
  optional, and dismissible (side panel, inline suggestion) rather than
  a takeover modal; tag which of the two a screen exhibits.
- **Adaptive personalization** — interfaces that simplify for new users
  and expand with proficiency; visible as progressive-disclosure
  patterns.
- **WebGL only when the brand is the experience** — the predicted
  "3D everywhere" did not hold: 0.8-2 MB payloads lose mobile users, so
  heavy WebGL now concentrates in creative agencies, fashion, and art
  portfolios (e.g. Bruno Simon's drivable-car portfolio, Site of the
  Month Jan 2026). An e-commerce or SaaS screen without WebGL is not
  "dated" — flag heavy 3D on utility sites as a performance concern
  instead.
- **Accessibility as a growth lever** — inclusive sites reported up to
  35% higher engagement; pairs with the html-signal checklist rather
  than the visual one.

## How to apply

Tag screenshots against these the same way as `trend-checklist.md` rows:
only from visible cues, present/absent both being findings. When a
snapshot row and a static checklist row disagree (e.g. WebGL heroes
listed as "modern" in the static file vs. "selective use only" here),
prefer this snapshot and note the correction in the report.

## Sources

- Pinterest Newsroom — "Pinterest Predicts: nonconformity,
  self-preservation, and escapism drive 21 trends for 2026"
  (newsroom.pinterest.com; retrieved via web search — direct fetch 403)
- Pinterest Predicts hub (business.pinterest.com/pinterest-predicts)
- nss magazine, Envato Elements, Axios coverage of Pinterest Predicts 2026
- Tubik Studio — "What's Next: 7 UI Design Trends of 2026"
- UXPin — "12 UX/UI Design Trends That Are Defining Product Design in 2026"
- Muzli — "Mobile App Design Trends 2026: UI Patterns"
- Studio Meyer / DEV — "Web Design Trends 2026: What Actually Held Up"
- Top CSS Gallery — "10 Web Design Trends Dominating Award Galleries in 2026"
- reallygooddesigns.com — "Top 10 Web Design Trends 2026"
