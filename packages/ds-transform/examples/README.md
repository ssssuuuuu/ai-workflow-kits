# DS Transform Examples

Each example shows the full five-phase transform:

```text
as-is web planning -> UI element audit -> atomic mapping -> tokenization -> DS-based spec rewrite -> governance handoff
```

Current examples:

- `legacy-screen-transform/`: a fictional checkout screen spec, written in ad-hoc UI language, transformed into a design-system-based component spec with a token proposal and governance notes.
- `chart-text-variant-matrix/`: a fictional dashboard chart labeling memo transformed into a `ChartValue`/`ChartLabel`/`ChartLabelGroup`/`ChartLegend` component family, demonstrating the variant matrix documentation pattern (two-axis grid tables) for components with multiple independent visual axes.
- `list-detail-search-card-transform/`: a fictional customer-management screen (search + card list + detail property panel) transformed using the List/Detail/Search/Card UI archetype reference — anatomy + prose documentation instead of a variant matrix, since these archetypes have multiple composed parts rather than two clean axes.
- `form-atoms-variant-matrix/`: a fictional permission-settings screen (checkboxes, radio buttons, buttons, field labels/descriptions) transformed as an internal handoff spec, demonstrating when the variant matrix format from the sample image is actually appropriate (two clean axes, QA-critical) versus when a single-axis list is enough.
- `datalist-composition/`: a fictional to-do list screen transformed into a `DataList`/`DataListItem` component family, demonstrating the composition layer — how atoms (title/description/meta/label/checkbox/icon) become named slots of a molecule component, how a `region` (left/right) layout variant replaces two separate components, and how components assemble into a screen. See section 18 of `docs/design-system-methodology.md`. Includes `component-spec.example.json` — the machine-readable (AI-native, Phase 6) spec for the same `DataListItem`, conforming to `../../schema/component-spec.schema.json` (see methodology section 20.1).
- `finance-portal-home/`: a full homepage (fictional housing-finance portal) transformed end to end — a global header, a product-card carousel where the third card is an `emphasis=feature` variant rather than a separate component, and a responsive quick-link bar. Exercises the whole stack: atoms (17) → slot composition (18) → app-shell + grid screen assembly (19) → machine-readable specs (20.1). `component-specs.example.json` holds seven component specs (GlobalHeader, PrimaryNav, NavItem, ProductCard, ProductCarousel, QuickLink, QuickLinkBar), each conforming to `../../schema/component-spec.schema.json`. Four self-contained, browser-openable renders of the same to-be spec show how only the token/overlay layer changes:
  - `preview.html` — reference render with brand color tokens (CSS custom properties), the metric/feature `ProductCard` variants, a responsive `QuickLinkBar` (8/4/2), light+dark themes, and a token legend.
  - `preview-mono.html` — the same page in a monochrome (ink-on-paper) token set; hierarchy carried by value/weight/spacing only.
  - `preview-layers.html` — a layered "spec sheet" that separates Design Tokens / Atoms / Components / Assembled Screen with labeled region dividers and tier tags (◫ token · ◇ atom · ◆ component · ▤ screen).
  - `preview-guide.html` — a redline guideline overlay: component regions tinted blue at 60%, the atoms on top tinted light red at 60% (multiply blend so text stays legible), with a guide on/off toggle. Shows the compose relationship "atoms inside components".

All example content is fictional. No real product names, customer data, or internal project labels are used.
