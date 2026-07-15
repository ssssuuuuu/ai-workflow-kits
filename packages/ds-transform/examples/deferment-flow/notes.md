# Deferment Flow — OCR → atoms → components → screen

A fictional reconstruction of a mobile "원금상환유예 신청" (principal-repayment deferment) flow. Source screenshots were OCR-scanned, decomposed into atoms, recomposed into design-system components, and rendered as a real design-system web screen.

> All brand, account, and address values are fictional (`든든 보금자리론`, `1166-09-****-036`, masked address). The consent/legal copy is paraphrased, not reproduced. Structure only — not affiliated with any real institution or product.

## Deliverable

- `preview.html` — a self-contained, browser-openable render of two screens (신청 목록 · 신청사항) built from design-system tokens and components, with a **guideline toggle**: components tinted blue, atoms tinted red on top (base grayscaled so the overlay reads). Open in a browser and press "가이드 ON".
- `component-specs.example.json` — machine-readable specs for the composed components, conforming to `../../schema/component-spec.schema.json`.

## OCR decomposition → registry

**Atoms** (registered in `../../registry/atoms.json`): IconButton, Badge, Title, Text, Checkbox, Divider, Button, Select, Tag, Fab, plus DescriptionItem (label+value).

**Components** (this example's `component-specs.example.json`):

| Screen region | Component | Slots (atoms) |
| --- | --- | --- |
| 상단 헤더 | `AppBar` | leading IconButton · Badge · Title · action IconButtons |
| 신청 카드 | `ApplicationCard` | Title · Text(account) · DescriptionList · Button |
| 속성 그리드 | `DescriptionList` → `DescriptionItem` | label + value pairs (2-col) |
| 유예시작월 선택 | `FormCard` | Title · Select × n · Button |
| 하단 이전/다음 | `BottomBar` | Button × 2 (split) |

This is the ds-transform loop applied to a real screen: audit (OCR) → atomic mapping (atoms + slot promotion) → DS-based spec rewrite (components) → rendered screen, with the machine-readable specs an agent could consume.
