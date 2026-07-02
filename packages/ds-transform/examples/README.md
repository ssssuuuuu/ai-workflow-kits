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

All example content is fictional. No real product names, customer data, or internal project labels are used.
