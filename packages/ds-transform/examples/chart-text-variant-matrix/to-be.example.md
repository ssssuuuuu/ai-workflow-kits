# To-Be: 차트 텍스트 컴포넌트 패밀리 (예시, 가상 데이터)

`as-is.example.md`를 `ds-transform` 5단계 방법론으로 변환한 예시 출력입니다. Phase 4에서 축이 2개 이상인 컴포넌트는 산문 대신 **배리언트 매트릭스** 표로 기술합니다. (`docs/design-system-methodology.md` 17장 참고)

## Phase 1 — As-Is UI Inventory (발췌)

| element | occurrences | current definition | inconsistency notes |
| --- | --- | --- | --- |
| 막대 위 숫자 | 2 | 회색 / 진하게(이번 달) | 굵기 구분 기준이 "이번 달 여부"로만 기획, 다른 강조 케이스 없음 |
| 막대 아래 항목명 | 2 | 작은 글씨, 정렬 불일치 | 화면마다 가운데/오른쪽/왼쪽 정렬이 섞여 있음 |
| 범례 | 1 | 한 줄 고정 가정 | 좁은 화면에서 줄바꿈 규칙이 기획서에 없음 |
| 하락 강조 값 | 1 | 빨간 숫자 | 상승 강조 색상 언급 없음(기획 누락) |

## Phase 2 — Component Candidates (발췌)

| component | atomic level | variants | consolidates | priority |
| --- | --- | --- | --- | --- |
| `ChartValue` | atom | weight(`regular`/`bold`) x size(`xs`/`sm`) x color(데이터 상태) | 막대 위 숫자, 하락/상승 강조 값 | 높음 |
| `ChartLabel` | atom | color(강조 단계) x align(`left`/`center`/`right`) | 막대 아래 항목명 | 높음 |
| `ChartLabelGroup` | molecule | align(`left`/`center`/`right`) | 항목명 묶음 배치 | 중간 |
| `ChartLegend` | organism | layout(`inline`/`wrap`) | 범례 | 중간 (신규 규칙 필요) |

## Phase 4 — DS-Based Spec Rewrite: 배리언트 매트릭스

### ChartValue

> 차트 내에서 데이터 값을 텍스트로 표현하는 기본 요소. 강조가 필요한 값(이번 달, 하락/상승 등)은 굵기와 색상 조합으로 구분한다.

`weight x size` 매트릭스 (색상은 기본 상태 기준):

| color \ (weight, size) | (regular, xs) | (regular, sm) | (bold, xs) | (bold, sm) |
| --- | --- | --- | --- | --- |
| `grayMedium` (기본값) | value | value | **value** | **value** |
| `dataNegative` (하락 강조) | value | value | **value** | **value** |
| `dataPositive` (상승 강조, 신규) | value | value | **value** | **value** |

- 기존에 "상승 강조 색상 언급 없음(기획 누락)"이었던 항목은 `dataPositive` 토큰으로 신규 제안 → Phase 5에서 RFC 대상으로 표시.

### ChartLabel

> 차트 항목명을 표시하는 기본 요소. 정렬은 차트 레이아웃에 따라 달라지므로 별도 축으로 관리한다.

`color x align` 매트릭스:

| size \ align | left | center | right |
| --- | --- | --- | --- |
| `sm` | Label | Label | Label |
| `md` | Label | Label | Label |

- 강조 색상(`grayBold` 등)이 필요한 경우는 `ChartValue`와 동일한 색상 토큰 세트를 재사용해 별도 매트릭스를 만들지 않고 컴포넌트 문서에 "색상 토큰은 ChartValue와 공유" 로 명시 — 매트릭스 축은 2개로 유지.

### ChartLabelGroup

> `ChartLabel`을 묶어 한 축에 배치하는 컴포넌트. 정렬 축만 존재하므로 매트릭스 대신 단일 축 표로 충분하다.

| align | 배치 |
| --- | --- |
| `left` | Label · Label · Label |
| `center` | Label · Label · Label |
| `right` | Label · Label · Label |

### ChartLegend

> 범례를 표시하는 컴포넌트. 화면 폭이 좁을 때의 줄바꿈 규칙이 as-is 기획에 없었던 부분이라 `layout` variant로 명시적으로 정의한다.

| layout | 동작 |
| --- | --- |
| `inline` | 한 줄에 모든 범례 항목을 표시, 넘치면 스크롤하지 않고 다음 layout으로 전환 |
| `wrap` | 항목이 한 줄에 다 들어가지 않을 때 자동 줄바꿈 |

- `inline -> wrap` 전환 기준(브레이크포인트/컨테이너 폭)은 as-is 기획에 없던 정보이므로 Phase 5 미해결 리스크로 이관.

## Phase 5 — Governance Handoff (발췌)

- **신규 토큰**: `dataPositive` (상승 강조 색상) — 기존에 정의되지 않았던 항목이므로 RFC 대상
- **신규 variant**: `ChartLegend.layout=wrap`과 전환 기준 — 디자이너 확인 필요
- **미해결 리스크**: 범례 줄바꿈 브레이크포인트 미정, `ChartLabel`의 강조 색상이 실제로 몇 단계 필요한지 as-is 문서만으로는 판단 불가
