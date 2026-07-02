# To-Be: 폼 아톰 배리언트 매트릭스 (예시, 가상 데이터)

`as-is.example.md`를 `ds-transform` 5단계 방법론으로 변환한 예시 출력입니다. **이 문서는 내부 핸드오프 스펙(디자이너·엔지니어가 모든 조합을 한 화면에서 QA하는 용도)이므로 매트릭스 표를 사용합니다.** 같은 컴포넌트라도 외부 공개 문서(Storybook 등)로 낼 때는 매트릭스 대신 아나토미+prose를 쓰도록 `docs/design-system-methodology.md` 17.9에서 권고합니다.

## Phase 1 — As-Is UI Inventory (발췌)

| element | occurrences | current definition | inconsistency notes |
| --- | --- | --- | --- |
| 권한 체크박스 | 여러 개 | 네모 박스, hover 색 미지정 | 부분 선택(indeterminate) 스타일 미정의 |
| 접근 레벨 라디오 | 3개 | 동그란 버튼 | 비활성 스타일이 "버튼 참고"로만 적혀 실제 스펙 없음 |
| 저장/취소 버튼 | 2개 | 파랑 채움 / 테두리만 | 모바일 축소 크기 단계 미정의 |
| 항목 설명 문구 | 다수 | 회색 텍스트 | 에러 전환 조건과 색상이 화면마다 다름 |
| 필수 동의 라벨 | 1개 | 빨간 별표 | 별표 위치·간격 규칙 없음 |

## Phase 2 — Component Candidates (발췌)

| component | atomic level | variants | consolidates | priority |
| --- | --- | --- | --- | --- |
| `FormCheckbox` | atom | selection(`unselected`/`selected`/`indeterminate`) x interaction(`default`/`hover`/`disabled`) | 권한 체크박스 전체 | 높음 |
| `FormRadio` | atom | selection(`unselected`/`selected`) x interaction(`default`/`hover`/`disabled`) | 접근 레벨 라디오 3개 | 높음 |
| `RadioGroup` | molecule | orientation(`vertical`) | 접근 레벨 라디오 묶음 | 중간 (그룹은 아이템과 별도 컴포넌트로 분리 — 17.6 참고) |
| `Button` | atom | kind(`primary`/`secondary`) x size(`sm`/`md`/`lg`) | 저장, 취소 버튼 | 높음 |
| `FieldLabel` | atom | required(`true`/`false`) | 항목명 텍스트, 필수 동의 라벨 | 중간 |
| `FieldDescription` | atom | tone(`default`/`error`) | 회색 설명 문구, 에러 문구 | 중간 |

## Phase 4 — DS-Based Spec Rewrite: 배리언트 매트릭스

### FormCheckbox

> 권한 항목을 선택/해제하는 기본 컨트롤. "전체 선택"처럼 하위 항목이 일부만 선택된 경우 indeterminate 상태를 쓴다.

`selection x interaction` 매트릭스:

| selection \ interaction | default | hover | disabled |
| --- | --- | --- | --- |
| `unselected` | ☐ | ☐ (hover 배경) | ☐ (톤다운) |
| `selected` | ☑ | ☑ (hover 배경) | ☑ (톤다운) |
| `indeterminate` | ▣ | ▣ (hover 배경) | ▣ (톤다운) |

- as-is에서 "정확한 색상 미지정"이었던 hover 배경은 `color-interaction-hover` 토큰(Phase 3)으로 확정 제안.

### FormRadio

> 접근 레벨처럼 상호 배타적인 선택지 중 하나를 고르는 컨트롤. 여러 개를 묶을 때는 `RadioGroup`을 쓴다(아이템과 그룹은 별개 컴포넌트).

`selection x interaction` 매트릭스:

| selection \ interaction | default | hover | disabled |
| --- | --- | --- | --- |
| `unselected` | ○ | ○ (hover 배경) | ○ (톤다운) |
| `selected` | ◉ | ◉ (hover 배경) | ◉ (톤다운) |

- as-is의 "버튼 컴포넌트 참고"였던 disabled 스타일을 `FormCheckbox`와 동일한 톤다운 규칙으로 명시적으로 통일.

### Button

> 화면 하단의 주요 액션(저장/취소)에 쓰이는 컨트롤. kind로 강조 수준을, size로 화면 밀도를 조절한다.

`kind x size` 매트릭스:

| kind \ size | sm | md | lg |
| --- | --- | --- | --- |
| `primary` | [저장] | [ 저장 ] | [  저장  ] |
| `secondary` | [취소] | [ 취소 ] | [  취소  ] |

- **loading/disabled는 매트릭스에 곱하지 않는다**(17.7 리서치 결론) — 두 상태 모두 kind/size와 무관하게 한 번만 규칙을 정의: `disabled`는 톤다운 + 클릭 불가, `loading`은 라벨을 스피너로 치환.
- as-is의 "모바일에서 작아짐"은 `size=sm`으로 확정, 브레이크포인트 기준은 Phase 5 미해결 리스크로 이관.

### FieldLabel / FieldDescription (Field 패밀리 — 매트릭스 아님)

> 폼 항목의 이름(`FieldLabel`)과 보조 설명(`FieldDescription`)을 표시하는 텍스트 아톰. shadcn/ui의 `Field`/`FieldLabel`/`FieldDescription` 패턴처럼 하나의 네임스페이스 아래 묶는다.

`FieldLabel`은 축이 `required` 하나뿐이라 매트릭스 대신 목록으로 충분하다:

| required | 표기 |
| --- | --- |
| `false` | 항목명 |
| `true` | 항목명 + 빨간 별표(간격 4px) |

`FieldDescription`의 `tone` 축도 축이 1개뿐이지만, 리서치 결론(17.8)에 따라 `default`와 `error`는 **같은 슬롯을 두고 대체되는 관계**임을 명시한다:

| tone | 표시 | 비고 |
| --- | --- | --- |
| `default` | 회색 설명 문구 | 평상시 노출 |
| `error` | 빨간 설명 문구 | `default`를 대체(동시 노출 아님). 트리거 조건은 Phase 5 미해결 리스크로 이관 |

## Phase 5 — Governance Handoff (발췌)

- **신규 컴포넌트**: `FieldLabel`, `FieldDescription`을 `Field` 네임스페이스로 신설 제안 — 기존엔 컴포넌트화되지 않고 텍스트로만 존재
- **신규 규칙**: `Button`의 disabled/loading 처리, `FormCheckbox`/`FormRadio`의 hover/disabled 색상 토큰
- **미해결 리스크**: 버튼 모바일 축소 브레이크포인트, `FieldDescription`의 error 전환 조건, 필수 표시(별표) 간격 규칙
- **문서화 방식 안내**: 이 표는 내부 핸드오프용 매트릭스입니다. 공개 컴포넌트 문서 사이트로 옮길 때는 `docs/design-system-methodology.md` 17.9의 권고에 따라 아나토미+prose로 재작성하세요.
