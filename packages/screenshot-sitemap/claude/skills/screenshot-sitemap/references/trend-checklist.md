# Modern Web Trend & UI/UX Checklist

Reference for the trend-audit step of `screenshot-sitemap`. Tag each
screenshot with whichever rows visibly apply. "Present" and "absent" are
both useful signal — only tag what you can actually see, don't assume.

## Layout

- Bento-grid / modular card layout (mixed-size tiles in a grid)
- Asymmetric or broken-grid composition
- Full-bleed hero (image/video edge-to-edge, no container margin)
- Scrollytelling (content reveals tied to scroll position)
- Bottom sheet / drawer patterns on mobile layouts

## Visual style

- Glassmorphism (frosted-glass translucent panels)
- Neumorphism (soft extruded/inset shadows on flat surfaces)
- Neo-brutalism (raw borders, high-contrast blocks, deliberately "undesigned")
- Gradient mesh / grain / noise backgrounds
- Dark mode support, and whether it's true dark (near-black) or just inverted gray
- Editorial minimalism (large whitespace, restrained palette) vs. maximalist density

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

## How to use this in the report

For each node, list only the rows that are visibly true (present or
notably, expectedly absent) with the specific visual cue that supports the
tag. Then roll section-level findings into the trend alignment summary:
what's current, what reads as legacy (e.g. spinner-only loading, no
breadcrumbs below depth 2, static hover-only interaction), and concrete,
node-anchored recommendations — not a generic "modernize the UI" note.
