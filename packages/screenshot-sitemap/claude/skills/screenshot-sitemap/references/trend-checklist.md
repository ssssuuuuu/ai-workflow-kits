# Modern Web Trend & UI/UX Checklist

Reference for the trend-audit step of `screenshot-sitemap`. Tag each
screenshot with whichever rows visibly apply. "Present" and "absent" are
both useful signal — only tag what you can actually see, don't assume.

The rows below are seeded from the pattern language that award-site
showcases (Awwwards, CSS Design Awards, FWA) and Pinterest trend/mood
boards consistently surface. Those sources move faster than this static
file, so treat this checklist as the baseline and pull a live top-up per
the "Trend Research Sources" section below when currency matters.

## Layout

- Bento-grid / modular card layout (mixed-size tiles in a grid)
- Asymmetric or broken-grid composition
- Full-bleed hero (image/video edge-to-edge, no container margin)
- Scrollytelling (content reveals tied to scroll position)
- Bottom sheet / drawer patterns on mobile layouts
- Horizontal-scroll sections inside an otherwise vertical page (Awwwards-style showcase strips)
- Split-screen hero (two contrasting panels side by side)
- Collage / scrapbook layering of photos, stickers, and text (Pinterest maximalist boards)

## Visual style

- Glassmorphism (frosted-glass translucent panels)
- Neumorphism (soft extruded/inset shadows on flat surfaces)
- Neo-brutalism (raw borders, high-contrast blocks, deliberately "undesigned")
- Gradient mesh / grain / noise backgrounds
- Dark mode support, and whether it's true dark (near-black) or just inverted gray
- Editorial minimalism (large whitespace, restrained palette) vs. maximalist density
- Seasonal trend-color palette (e.g. a single saturated accent driving the whole page, in the spirit of Pantone-style "color of the year" picks)
- Dopamine design (high-saturation, playful multi-color palette instead of a restrained brand palette)
- Organic blob / liquid-shape dividers and backgrounds
- Y2K / retro-digital revival accents (chrome text, early-web iconography, deliberate pixelation)

## Typography

- Variable fonts (weight/width shifts, not just static styles)
- Oversized display type as a layout element, not just a headline
- Kinetic or animated type (text that moves, morphs, or reveals on scroll)

## Motion & interaction

- Micro-interactions on controls (button/toggle/hover feedback beyond a color change)
- Scroll-driven animation (elements transform tied to scroll offset, not just fade-in)
- Skeleton loaders vs. spinners vs. no loading state at all
- Cursor-following or parallax elements
- Page/route transitions (shared-element or cross-fade, not a hard cut)
- Custom cursor (replaced default pointer, magnetic-button hover pull)
- Intro loader / splash animation before the page settles (common on Awwwards Site of the Day entries)
- Marquee or ticker text bands (continuously scrolling text strip)

## Navigation

- Command palette / Cmd+K style search-first navigation
- Mega-menu for deep category trees
- Sticky or floating bottom navigation on mobile
- Gesture-based navigation (swipe between sections)
- Breadcrumbs present at depth >= 2 (absence here is itself a finding)

## AI & emerging-tech surfaces

- Embedded AI chat / copilot widget
- Generative or personalized content blocks ("recommended for you", AI summaries)
- Voice search or voice-input entry point
- 3D/WebGL hero elements (Three.js/Spline-style interactive scenes)
- "View in space" / AR entry points for product detail pages

## Accessibility & performance signals visible in a screenshot

- Visible dark-mode / theme toggle
- Obvious low-contrast text-on-background (a red flag, not a trend)
- Reduced-motion affordance or a static fallback state visible
- Alt/skeleton states suggesting perceived-performance design work

## Trend Research Sources

This checklist is a static baseline. Visual and color trends move faster
than any fixed list, so when currency matters (the user asks for "latest"
trends, or the audit will inform a redesign), top it up with a short live
lookup instead of relying only on the rows above:

- **Award-site showcases** — search for `Awwwards site of the day
  <industry/category>`, `CSS Design Awards <industry>`, or `FWA <industry>`
  to see what is currently being recognized as best-in-class for a
  comparable site type. These sources lean toward interaction/motion and
  layout innovation (WebGL heroes, scroll-driven storytelling, custom
  cursors, kinetic type).
- **Pinterest trend/mood boards** — search for `Pinterest web design
  trends <year>` or `Pinterest <industry> UI moodboard` to see which visual
  and color trends (palettes, texture, photo treatment, collage density)
  are currently being collected and repinned. Pinterest signal leans
  toward color, texture, and mood rather than interaction engineering.
- Pull 2-4 concrete reference examples per lookup, not a general summary.
  Cite what was found as `source name — title/URL — pattern observed`, and
  only add a checklist row or tag from it if it's specific enough to
  compare against an actual screenshot.
- Do not fabricate a citation. If the lookup tool isn't available or
  returns nothing useful, say so and fall back to the static checklist
  above rather than inventing a source.
- Live research supplements this file; it does not replace the requirement
  that every tag on a screenshot cites a visible cue in that screenshot.

## How to use this in the report

For each node, list only the rows that are visibly true (present or
notably, expectedly absent) with the specific visual cue that supports the
tag. Then roll section-level findings into the trend alignment summary:
what's current, what reads as legacy (e.g. spinner-only loading, no
breadcrumbs below depth 2, static hover-only interaction), and concrete,
node-anchored recommendations — not a generic "modernize the UI" note.
