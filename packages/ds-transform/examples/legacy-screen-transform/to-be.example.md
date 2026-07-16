# To-Be: 체크아웃 화면 DS 기반 스펙 (예시, 가상 데이터)

`as-is.example.md`를 `ds-transform` 5단계 방법론으로 변환한 예시 출력입니다.

## Phase 1 — As-Is UI Inventory

| element | occurrences | current definition | inconsistency notes |
| --- | --- | --- | --- |
| "적용" 버튼 (쿠폰 입력) | 1 | 회색 배경 버튼 | 다른 버튼과 padding 다름 |
| "사용하기" 버튼 (쿠폰함) | 1 | 파란색 버튼 | "결제하기"와 색은 같으나 별도 스타일시트 |
| "결제하기" 버튼 | 1 | 파란색, 큰 사이즈 | 화면 내 유일한 강조(primary) 액션 |
| "+ 배송지 추가" 버튼 | 1 | 파란색, 다른 팀 구현 | "적용" 버튼과 색 같지만 padding 다름 |
| "다시 시도" 버튼 | 1 | 빨간 테두리, 흰 배경 | danger 상태 전용, 별도 스타일 |
| "변경" / "수정" / "삭제" 링크 | 3 | 텍스트 링크 | 일부는 버튼처럼, 일부는 순수 텍스트 링크로 렌더링됨 |
| 상품 리스트 항목 | 1 | 커스텀 레이아웃 | 리스트 컴포넌트 없이 화면별 구현 |
| 쿠폰 카드 | 1 | 카드형 | 배송지 카드와 레이아웃 유사하나 별도 정의 |
| 배송지 카드 | 1 | 카드형 | 쿠폰 카드와 유사 |
| 경고 배너 | 1 | 빨간 배경 전체 폭 배너 | 에러 표현 방식이 화면마다 다름(배너 vs 테두리) |
| "보유한 쿠폰이 없습니다" 안내 | 1 | 텍스트만 | 별도 empty-state 컴포넌트 없음 |

## Phase 2 — Component Candidates

| component | atomic level | variants | consolidates | priority |
| --- | --- | --- | --- | --- |
| `Button` | atom | `primary`, `secondary`, `danger` | 적용, 사용하기, 결제하기, +배송지 추가, 다시 시도 | 높음 (5개 요소 통합) |
| `Link` | atom | `default`, `emphasis` | 변경, 수정, 삭제 | 중간 |
| `ListItem` | molecule | `product`, `address` | 상품 리스트 항목, 배송지 항목 | 중간 |
| `Card` | molecule | `default`, `outlined` | 쿠폰 카드, 배송지 카드 | 중간 |
| `Banner` | organism | `error`, `info` | 경고 배너 | 낮음 (신규) |
| `EmptyState` | molecule | `default` | "보유한 쿠폰이 없습니다" 안내 | 낮음 (신규) |

## Phase 3 — Token Proposal

**Global (예시)**
- `blue-500`, `red-500`, `gray-200`, `gray-500`, `space-4`, `space-8`, `radius-8`

**Semantic**
- `color-action-primary` -> `blue-500`
- `color-action-danger` -> `red-500`
- `color-border-default` -> `gray-200`
- `color-text-muted` -> `gray-500`
- `space-card-padding` -> `space-8`

**Component**
- `button-primary-background` -> `color-action-primary`
- `button-danger-border` -> `color-action-danger`
- `card-radius` -> `radius-8`

**미해결 항목**: "다시 시도" 버튼의 테두리 두께가 다른 danger 상태 예시와 달라 별도 확인 필요 (일회성 예외인지, 누락된 컴포넌트 토큰인지 거버넌스 검토 대상).

## Phase 4 — DS-Based Spec Rewrite

### 주문 확인

- 타이틀: `Heading/lg`, `color-text-default`
- 상품 리스트: `ListItem[variant=product]` 반복, 항목 간 구분선은 `Divider`
- 쿠폰 입력: `TextInput` + `Button[variant=secondary]` ("적용")
- 배송지 카드: `Card[variant=outlined]` + `Link[variant=default]` ("변경")
- 하단 결제 영역: 총액 `Text[emphasis=strong]` + `Button[variant=primary]` ("결제하기")
- 결제 실패: `Banner[variant=error]` + `Button[variant=danger]` ("다시 시도")

### 쿠폰함

- 쿠폰 리스트: `Card[variant=default]` 반복 + `Button[variant=primary]` ("사용하기" -> `결제하기`와 동일 컴포넌트로 통일)
- 쿠폰 없음: `EmptyState[variant=default]`

### 배송지 관리

- 배송지 리스트: `ListItem[variant=address]` + `Link[variant=default]` x2 ("수정", "삭제")
- 새 배송지 추가: `Button[variant=secondary]` ("+ 배송지 추가" -> "적용" 버튼과 동일 컴포넌트로 통일)

## Phase 5 — Governance Handoff

- **신규 컴포넌트 후보**: `Banner`, `EmptyState` (기존 시스템에 없다고 가정 → RFC 대상)
- **기존 컴포넌트 통합**: `Button` variant 통일로 4개 화면의 5개 버튼 인스턴스가 1개 컴포넌트로 수렴
- **마이그레이션 순서 제안**: `Button` (영향 범위 최대) → `Card`/`ListItem` → `Link` → `Banner`/`EmptyState`(신규)
- **미해결 리스크**: "다시 시도" 버튼의 테두리 두께 예외, "변경/수정/삭제" 링크의 버튼-vs-링크 렌더링 불일치는 디자이너 확인 필요
