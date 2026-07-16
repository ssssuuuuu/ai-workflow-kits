# TDS Mobile — Component Index (reference)

A reference index of the **public component taxonomy** of Toss Design System (TDS) Mobile, gathered for learning and cross-mapped to this repo's atom/component registry.

> **Scope & attribution.** This lists only publicly documented component **names and categories**, with links to the official source. It does **not** copy Toss's proprietary anatomy, tokens, or spec details — those live at the official docs and belong to Toss. TDS is Toss's design system; this file is an index/map, not a reproduction.
>
> **Access note.** The official docs host (`tossmini-docs.toss.im`) is blocked by this environment's network policy, so per-component specs could not be scraped. The taxonomy below was obtained from public search and a community index ([`pinion05/TDS-skills`](https://github.com/pinion05/TDS-skills)). Detailed specs should be read from the official site, or captured via screenshots and registered through `ds-transform`.

## Core components (35)

Badge · Board Row · Border · Bottom Info · Bottom Sheet · Bubble · Button · Checkbox · Grid List · Highlight · Icon Button · List Footer · List Header · Loader · Menu · Modal · Numeric Spinner · Paragraph · Post · Progress Bar · Progress Stepper · Rating · Result · Search Field · Segmented Control · Skeleton · Slider · Stepper · Switch · Tab · Table Row · Text Button · Toast · Tooltip · Top

## Category groups

| Group | Items |
| --- | --- |
| Agreement | V3, V4 |
| Asset | 이해하기, 활용하기, 래핑한 컴포넌트 활용하기 |
| BottomCTA | Single, Double, FixedBottomCTA |
| Chart | Bar Chart |
| Dialog | AlertDialog, ConfirmDialog |
| Keypad | Alphabet Keypad, Full Secure Keypad, Number Keypad |
| ListRow | 이해하기, 영역 구성하기, v3 제거 API |
| TextField | TextField, SplitTextField, TextArea |
| Utilities (hooks) | useDialog, useToast, useBottomSheet |

## Cross-map to this registry

| TDS Mobile | This repo |
| --- | --- |
| Badge | Tag/Badge — methodology 17.11 |
| Button · Text Button · Icon Button | `Button`, `IconButton` (registry) |
| Checkbox · Switch · Paragraph | `Checkbox`, `Switch`, `Text` (registry) |
| TextField · TextArea · Search Field | `Input`, Search — 17.3 / 17.10 |
| Numeric Spinner · Stepper | `Input` `type=number` — 17.10 |
| Slider · Rating · Segmented Control | `Slider`, `Rating`, `SegmentedControl` (registry) |
| Tab · Menu · Toast · Tooltip | Tabs · Menu · Toast · Tooltip — 17.12 / 17.13 |
| Skeleton · Loader · Progress Bar/Stepper | Progress — 17.11 |
| ListRow · Board/Table Row · Grid List · List Header/Footer | List/ListItem — 17.1 |
| Modal · Dialog · Bottom Sheet · BottomCTA | Overlay / action-bar patterns — feedback family (17.12) |
| Result · Post · Highlight · Bubble · Top · Border · Bottom Info · Keypad | TDS-specific molecules/patterns (secure keypad, etc.) — not generalized here |

## Sources

- [TDS Mobile 공식 문서](https://tossmini-docs.toss.im/tds-mobile/)
- [pinion05/TDS-skills — TDS Mobile docs index](https://github.com/pinion05/TDS-skills)
- [토스 디자인 시스템 (TDS) — 앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/design/components.html)
