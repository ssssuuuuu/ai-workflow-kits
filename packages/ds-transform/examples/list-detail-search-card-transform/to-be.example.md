# To-Be: 고객 관리 화면 DS 기반 스펙 (예시, 가상 데이터)

`as-is.example.md`를 `ds-transform` 5단계 방법론으로 변환한 예시 출력입니다. 이 화면은 Search / Card / Detail(속성표) 3개 아키타입이 섞여 있어, [README의 UI Archetype Reference](../../README.md#ui-archetype-reference)에 따라 **매트릭스가 아니라 아나토미 + prose** 방식으로 문서화합니다 (매트릭스는 축 2개짜리 원자 컴포넌트에만 사용 — `chart-text-variant-matrix/` 예제 참고).

## Phase 1 — As-Is UI Inventory (발췌)

| element | occurrences | current definition | inconsistency notes |
| --- | --- | --- | --- |
| 검색 입력 | 1 | 아이콘 전용 ↔ 펼쳐진 입력창 | 확장/축소 트리거 기준이 기획서에 없음 |
| 검색 결과 없음 문구 | 1 | 텍스트만 | 별도 empty-state 컴포넌트 없음 |
| 고객 카드 | 2 | 일반 vs VIP(금색 테두리) | 별도 스타일시트로 관리되어 통합 안 됨 |
| 카드 로딩 placeholder | 1 | 회색 네모 3개 | 개발자마다 구현 다름 |
| 등급 뱃지 | 2 | 목록용 vs 상세용 | 같은 뱃지인데 크기가 다름 (의도 불명) |
| 정보 행(이메일/전화/가입일/구매액) | 4 | 라벨+값 나열 | 구분선 유무 불일치, "변경" 링크 유무 기준 없음 |
| 값 없음 처리 | 1 | "-" 임의 처리 | 기획서에 규칙 없음 |

## Phase 2 — Component Candidates (발췌)

| component | atomic level | variants | consolidates | priority |
| --- | --- | --- | --- | --- |
| `SearchField` | atom | expanded / collapsed(icon-only), with-clear-button | 검색 입력 | 높음 |
| `EmptyState` | molecule | `search-no-results` | 검색 결과 없음 문구 | 낮음 (신규, 전역 패턴으로 승격 제안) |
| `CustomerCard` | molecule | style(`default`/`vip-outlined`) | 일반 카드, VIP 카드 | 높음 |
| `CustomerCard.Skeleton` | molecule | - | 로딩 placeholder | 중간 (신규, 전역 로딩 패턴과 연결) |
| `Badge` | atom | size(`sm`/`md`) | 목록용 뱃지, 상세용 뱃지 | 중간 |
| `DetailRow` | atom | action(`none`/`single`) | 정보 행 4종 | 높음 |
| `DetailList` | molecule | divider(`on`/`off`) | 정보 영역 전체 | 중간 |

## Phase 4 — DS-Based Spec Rewrite

### SearchField (Search 아키타입 — 아나토미 + prose)

> 화면 상단에서 고객을 실시간으로 검색하는 입력 요소.

- **아나토미**: leading search 아이콘 + input text + clear(X) 버튼(값이 있을 때만 노출). 실시간 검색이라 submit 버튼은 없음(as-is 기획 유지).
- **variant**: `collapsed`(아이콘만) / `expanded`(입력창 펼침). collapsed → expanded 전환 트리거(클릭 vs 포커스)는 as-is 문서에 명시되지 않아 Phase 5 미해결 리스크로 이관.
- **상태**: "검색 결과 없음"은 `SearchField` 자체가 아니라 화면 전역 `EmptyState` 패턴으로 위임(리서치에서 확인된 관행 — Cloudscape, GitLab Pajamas 등도 동일).

### CustomerCard (Card 아키타입 — 아나토미 + prose)

> 고객 1명을 목록에서 요약해 보여주는 카드. 클릭 시 상세 화면으로 이동한다.

- **아나토미**: media(프로필 사진, 원형) + headline(이름) + supporting text(최근 방문일) + trailing(`Badge`)
- **style variant**: `default` / `vip-outlined`(금색 테두리 강조) — 기존에 별도 스타일시트였던 것을 하나의 컴포넌트 + style prop으로 통합
- **로딩 상태**: `CustomerCard.Skeleton`으로 명시적 컴포넌트화 제안(as-is에서 "개발자마다 다르게 구현 중"이었던 항목) — 전역 로딩 패턴과 동일한 애니메이션 토큰 사용

### Badge

> 고객 등급을 표시하는 뱃지. 카드(목록)와 상세 화면에서 재사용된다.

- **variant**: `size=sm`(카드용) / `size=md`(상세용) — 기존에 "같은 뱃지인데 크기가 다름(의도 불명)"이었던 것을 명시적 size variant로 확정
- 등급별 색상(예: VIP/일반)은 Phase 3 토큰 제안의 semantic 토큰을 참조

### DetailRow / DetailList (Detail 아키타입 — action 축을 명시적으로 표기)

> 고객 상세 정보를 라벨-값 쌍으로 나열하는 영역.

- **아나토미**: `DetailRow` = label + value + optional action link. `DetailList` = `DetailRow`를 세로로 나열하는 컨테이너.
- **action 축** (리서치에서 확인된 GOV.UK Summary List 패턴 적용): 이메일/전화번호 행 = `action=single`("변경" 링크), 가입일/누적 구매액 행 = `action=none`. as-is 기획에 없던 "변경 가능/불가능 기준"을 이 표로 명시함.
- **구분선**: `DetailList`에 `divider` prop을 추가해 on/off를 화면 단위로 통일 (기존엔 시안마다 있다/없다가 섞여 있었음)
- **값 없음 처리**: as-is에서 "-"로 임의 처리되던 부분을 `DetailRow`의 `empty` 상태로 승격 — 값이 비어 있으면 "-" 대신 "미등록" 텍스트 + 톤다운 색상(`color-text-muted`)을 쓰도록 제안 (변경 필요 여부는 Phase 5에서 확인 대상)

## Phase 5 — Governance Handoff (발췌)

- **신규 컴포넌트**: `EmptyState`(search-no-results), `CustomerCard.Skeleton` — 화면 전역 패턴으로 승격 제안, RFC 대상
- **신규 규칙**: `DetailRow`의 action 유무 기준, 값 없음 처리 방식(`empty` 상태) — 디자이너 확인 필요
- **통합**: 카드 스타일시트 2종 → `CustomerCard` 1개 컴포넌트 + `style` variant로 수렴, 뱃지 2종 → `Badge` 1개 컴포넌트 + `size` variant로 수렴
- **미해결 리스크**: `SearchField`의 collapsed→expanded 트리거 기준 미정, "미등록" 텍스트 문구 확정 필요, 값 없음 처리를 "-"로 유지할지 변경할지 제품팀 결정 필요
