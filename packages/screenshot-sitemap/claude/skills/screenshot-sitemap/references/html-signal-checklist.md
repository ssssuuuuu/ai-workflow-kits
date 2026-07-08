# HTML Signal Checklist

Reference for step 3 (HTML evidence parsing) and step 8 (consulting
synthesis) of `screenshot-sitemap`. Every signal must be quoted from the
provided document — never infer markup the doc doesn't show. "Present" and
"absent" are both findings; "not covered by the doc" is a third state and
must not be reported as "absent".

## Semantic structure

- Landmark elements: `header`, `nav`, `main`, `footer`, `aside` — present
  per page, or is everything `div`/`span` (div-soup)?
- Content sectioning: `article`, `section` with headings vs. generic blocks
- Exactly one `h1` per page; heading levels descend without skips
- Lists marked up as `ul`/`ol` where the screenshot shows list-like content
- `button` vs. clickable `div`/`a href="#"` for actions

## Accessibility

- `alt` on images (and whether it's meaningful vs. empty vs. missing)
- ARIA: `aria-label`/`aria-labelledby` on icon-only controls,
  `aria-expanded` on toggles, `aria-current` on active nav,
  `role` only where no native element exists (a `role="button"` on a div
  is itself a finding)
- Form semantics: `label for=`, `fieldset`/`legend`, `autocomplete`,
  correct input types (`email`, `tel`, `search`, `date`)
- Focus/keyboard hints recorded in the doc: `tabindex` misuse
  (positive values), skip links
- `lang` attribute on `html`

## SEO & metadata

- `<title>` per page — unique and descriptive, or duplicated across pages?
- Meta description present per page
- `<link rel="canonical">` — also a depth signal (URL path segments)
- Open Graph / Twitter card tags on shareable pages
- Structured data (JSON-LD): `BreadcrumbList`, `Product`, `Article`,
  `Organization`, `FAQPage` — matched against what the screenshot shows
  (a visible breadcrumb with no `BreadcrumbList` is a classic quick win)
- Robots hints: `noindex` on pages that look like primary content

## Performance-relevant markup

- `srcset`/`sizes` or `<picture>` on content images; modern formats
  (`webp`/`avif`) referenced
- `loading="lazy"` on below-the-fold images, and NOT on the LCP hero image
- `width`/`height` (or aspect-ratio) on images — layout-shift prevention
- `preload`/`preconnect`/`fetchpriority` hints
- Script loading: `defer`/`async`/`type="module"` vs. blocking scripts

## Modern platform features

- `<dialog>` element vs. div-based modals
- Popover API (`popover` attribute)
- View Transitions (meta or CSS hints recorded in the doc)
- Container queries / `:has()` hints if the doc records CSS
- Native `details`/`summary` for accordions
- `theme-color` meta / `color-scheme` — pairs with dark-mode visual
  findings from the trend checklist

## Cross-check patterns (visual x markup)

These pairs drive the consulting findings — each needs evidence from both
the screenshot and the doc:

| Screenshot shows | Doc should show | If missing |
| --- | --- | --- |
| breadcrumb at depth >= 2 | `nav aria-label` + `BreadcrumbList` JSON-LD | quick win |
| image grid (listing page) | `srcset`, `loading="lazy"`, dimensions | performance debt at highest image count |
| hero image/video | `fetchpriority="high"`, no `loading="lazy"` | LCP risk |
| form (checkout, signup) | labels, `autocomplete`, typed inputs | conversion + a11y risk on a money page |
| modal/overlay | `<dialog>` or focus-trap ARIA | keyboard-trap risk |
| icon-only buttons | `aria-label` | screen-reader dead ends |
| dark-mode toggle | `color-scheme`/`theme-color` | half-implemented theming |
| product detail page | `Product` JSON-LD with price/availability | lost rich-result eligibility |
| visible active nav item | `aria-current="page"` | state exists visually but not programmatically |

## Severity guide for consulting findings

- `critical` — blocks users or revenue: unlabeled checkout forms,
  keyboard-inaccessible modals, `noindex` on primary pages
- `major` — measurable cost: missing lazy-loading on listing grids,
  div-soup on top-traffic templates, duplicated titles
- `minor` — polish: heading-level skips on deep pages, missing OG tags on
  non-shareable utility pages
- `quick-win` — small effort, visible payoff: JSON-LD for an existing
  breadcrumb, `aria-current` on existing active-nav styling, adding
  `autocomplete` to existing labeled fields
