# 컴포넌트 카탈로그 인덱스

이 문서는 지금까지 리서치·정리한 디자인 시스템 아이템(원자) → 컴포넌트(분자/유기체) → 화면(page)의 전 계층을 한눈에 찾을 수 있게 묶은 인덱스입니다. 각 항목은 [`docs/design-system-methodology.md`](design-system-methodology.md)의 해당 절과 [`packages/ds-transform`](../packages/ds-transform/)의 예제로 연결됩니다.

깊은 방법론 설명은 methodology 문서에 있고, 이 문서는 "어디를 보면 되는지"를 안내하는 지도(map)입니다.

## 계층 한눈에 보기

```text
token → atom(slot) → molecule → organism → template → page/screen
 5장      17장         18장       18장       19장        19장
```

| 계층 | 정의 | 대표 산출물 | 방법론 절 |
| --- | --- | --- | --- |
| Token | 색·간격·타이포 등 원시/시맨틱/컴포넌트 3단계 | 토큰 세트 | [5](design-system-methodology.md#5-디자인-토큰-방법론) |
| Atom | 더 쪼갤 수 없는 UI 요소, 슬롯 단위 | 배리언트 매트릭스 or 아나토미+prose | [17](design-system-methodology.md#17-아이템-단위-컴포넌트-스펙-배리언트-매트릭스-문서화) |
| Molecule | 원자를 명명 슬롯으로 조합한 컴포넌트 | 슬롯 아나토미 + 영역 변형 | [18](design-system-methodology.md#18-아이템-조합-원자에서-컴포넌트-컴포넌트에서-화면으로) |
| Organism | 컴포넌트 컬렉션/복합 섹션 | 반복·정렬 규칙 | [18](design-system-methodology.md#18-아이템-조합-원자에서-컴포넌트-컴포넌트에서-화면으로) |
| Template/Page | 그리드·영역 위에 컴포넌트 배치 | 배치도 + 반응형 규칙 | [19](design-system-methodology.md#19-화면-조립-컴포넌트에서-페이지로) |

## 원자 카탈로그 (17장)

각 원자의 아나토미·변형 축·문서화 방식(매트릭스 vs 아나토미+prose)은 methodology 17장을 참조하세요.

| 원자/분자 | 계열 | 대표 변형 축 | 문서화 방식 | 절 |
| --- | --- | --- | --- | --- |
| Chart value/label/legend | 차트 텍스트 | weight×size, color×align | **매트릭스** (핸드오프) | 17 |
| Checkbox / Radio | 폼 | selection×interaction | 아나토미+prose | 17.6 |
| Button / IconButton | 폼/액션 | kind×size | 아나토미+prose | 17.7 |
| Label / Description / Title | 텍스트 롤 | required, tone, role×size | 아나토미+prose, `Field` 패밀리 | 17.8 |
| TextField / Textarea / Select / Switch | 입력 | size, style, state, single/multi | 아나토미+prose | 17.10 |
| Tag / Badge / Chip | 표시·상태 | tone×style, interactive | 아나토미+prose+tone 갤러리 | 17.11 |
| Avatar / AvatarGroup | 표시·상태 | size, shape, status | 아나토미+prose | 17.11 |
| Progress / Spinner | 표시·상태 | determinate, size, inline/block | 아나토미+prose | 17.11 |
| Alert / Banner / Toast / Tooltip | 피드백 | severity×placement | 아나토미+prose | 17.12 |
| Tabs / Breadcrumb / Pagination / Menu | 내비게이션 | style, item state | 아나토미+prose, item/그룹 분리 | 17.13 |
| List / ListItem | 목록 | density, content lines | 아나토미+prose | 17.1 |
| Detail / Description | 속성표 | layout, column, actions | prose+action 서브표 | 17.2 |
| Search | 검색 | expanded/collapsed, size | 아나토미+prose | 17.3 |
| Card / Tile | 카드 | style, media, orientation | 아나토미+prose | 17.4 |

### 원자를 관통하는 4가지 법칙 ([17.14](design-system-methodology.md#1714-전체-종합-원자-카탈로그에서-반복되는-4가지-법칙))

1. 렌더 매트릭스는 예외 — 공개 문서는 아나토미+prose (실제 2축 렌더 격자는 Ant Tooltip placement 그리드가 유일)
2. "아이템 vs 그룹" 분리 (Select/Option, Menu/MenuItem, Avatar/AvatarGroup)
3. 네임스페이스 패밀리 vs 데이터 배열, 두 조합 API
4. empty/loading/error는 전역 패턴으로 위임

## 조합·화면 (18–19장)

| 주제 | 요점 | 절 |
| --- | --- | --- |
| 슬롯 & 컴파운드 컴포넌트 | `#title` 등 명명 슬롯, Radix Slot / compound children | [18.2](design-system-methodology.md#182-슬롯slot-표기와-컴파운드-컴포넌트) |
| 레이아웃 영역 = 정렬 변형 | left/right는 한 컴포넌트의 변형 | [18.3](design-system-methodology.md#183-레이아웃-영역--정렬-변형) |
| Composition over Configuration | 프리미티브 조합, Atlassian/Radix | [18.4](design-system-methodology.md#184-composition-over-configuration) |
| 레이아웃 그리드 | 컬럼·거터·브레이크포인트 | [19.1](design-system-methodology.md#191-레이아웃-그리드-배치의-좌표계) |
| 앱 셸 & 영역 슬롯 | header/nav/main/aside/footer | [19.2](design-system-methodology.md#192-앱-셸과-영역region-슬롯) |
| 캐노니컬 레이아웃 | list-detail / supporting-pane / feed | [19.3](design-system-methodology.md#193-캐노니컬-레이아웃-검증된-페이지-골격) |

## 워크드 예제 (ds-transform)

이론을 실제 as-is → to-be 변환으로 보여주는 예제입니다.

| 예제 | 다루는 계층 | 경로 |
| --- | --- | --- |
| Chart text family | 원자, 배리언트 매트릭스 | [`chart-text-variant-matrix/`](../packages/ds-transform/examples/chart-text-variant-matrix/) |
| Form atoms | 원자, 매트릭스 vs 단일 축 | [`form-atoms-variant-matrix/`](../packages/ds-transform/examples/form-atoms-variant-matrix/) |
| List/Detail/Search/Card | 분자, 아나토미+prose | [`list-detail-search-card-transform/`](../packages/ds-transform/examples/list-detail-search-card-transform/) |
| DataList composition | 조합(슬롯), 컴포넌트→화면 | [`datalist-composition/`](../packages/ds-transform/examples/datalist-composition/) |
| Checkout screen | 전체 흐름 | [`legacy-screen-transform/`](../packages/ds-transform/examples/legacy-screen-transform/) |

## 워크플로우로 실행하기

as-is 기획서를 이 카탈로그 기준의 to-be 스펙으로 변환하려면 `ds-transform` 패키지를 사용하세요.

- 에이전트(대형 문서/독립 태스크): [`packages/ds-transform/claude/agents/ds-transform.agent.md`](../packages/ds-transform/claude/agents/ds-transform.agent.md)
- 스킬(메인 대화 인라인): [`packages/ds-transform/claude/skills/ds-transform/SKILL.md`](../packages/ds-transform/claude/skills/ds-transform/SKILL.md)

5단계(As-Is Audit → Atomic Mapping → Tokenization → DS-Based Spec Rewrite → Governance Handoff)가 위 계층(원자 → 조합 → 화면)을 순서대로 산출합니다.
