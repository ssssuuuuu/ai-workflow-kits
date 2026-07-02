# To-Be: 주택금융 포털 홈 DS 스펙 (예시, 가상 데이터)

`as-is.example.md`를 `ds-transform` 6단계로 변환한 예시입니다. 헤더/카드 캐러셀/퀵링크가 섞인 홈 화면이라, 원자(17장) → 슬롯 조합(18장) → 화면 조립(19장) → 머신 리더블 스펙(20.1)의 전 계층을 적용합니다.

> 모든 브랜드·상품명은 가상입니다.

## Phase 1 — As-Is UI Inventory (발췌)

| 영역 | 요소 | 불일치 노트 |
| --- | --- | --- |
| 헤더 | 로고, 유틸 링크×3, 버튼×2, 네비×4, 아이콘버튼×3 | - |
| 히어로 | 제목(부분 강조) | - |
| 카드 | 카드×3 | 카드3만 '최대+값' 대신 링크 2개 |
| 캐러셀 | 점 인디케이터 + 재생 | 자동재생·일시정지 규칙 없음 |
| 퀵링크 | 아이콘 링크×8 | 반응형 접힘 규칙 없음 |
| 중복 | 간편 서류제출 | 네비·퀵링크 중복 |

## Phase 2 — Atomic Mapping (원자 → 조합, 네임스페이스 패밀리)

| 컴포넌트 | 계열 | 슬롯 | variants | 통합 |
| --- | --- | --- | --- | --- |
| `TextLink` | atom | `#label` | tone(default/brand) | 유틸 링크, AI 카드 링크 |
| `Button` | atom | `#label` | variant(outline), size | 로그인/인증·보안 |
| `IconButton` | atom | `#icon` | - | 검색/배지/햄버거 |
| `NavItem` | atom | `#label` | state(default/active) | 네비 4개 |
| `Heading` | atom | `#text #emphasis` | role(display) | 히어로 |
| `ProductCard` | molecule | `#eyebrow #description #metricLabel #metricValue #featureLinks #media` | **emphasis(metric/feature)** | 카드 1·2·3 |
| `QuickLink` | molecule | `#icon #label` | - | 퀵링크 8개 |
| `GlobalHeader` | organism | `#logo #utility #auth #nav #tools` | - | 헤더 |
| `ProductCarousel` | organism | (`ProductCard`×N) `#indicator #control` | autoplay(on/off) | 카드 캐러셀 |
| `QuickLinkBar` | organism | (`QuickLink`×N) | columns(8/4/2) | 퀵링크 바 |

핵심: 카드3은 별도 컴포넌트가 아니라 `ProductCard`의 `emphasis=feature` 변형(슬롯 세트 동일, 강조만 다름).

## Phase 3 — Tokenization (3-tier, 값은 브랜드 확인 필요)

```
Reference   blue-600 ≈ #1B5FA8 | blue-700 ≈ #0B4DA2 | gray-900 #1A1A1A
            gray-500 #8A8A8A | gray-100 #EEF2F8 | white #FFFFFF
Semantic    color-brand-primary→blue-600 | color-text-default→gray-900
            color-text-muted→gray-500 | color-text-link→blue-700
            color-highlight→blue-600 | color-surface-page→gray-100
            color-surface-card→white
Component   card-metricValue-color→color-highlight | card-background→color-surface-card
            card-radius→radius-lg(16) | header-height→size-16
```
- 간격: 8px 베이스, 카드 패딩 `space-6`(24), 카드 거터 `space-5`(20).
- 타이포: `display/hero`, `title/lg`(카드), `label/eyebrow`, `display/sm-bold`(metricValue), `body/nav`, `caption`(퀵링크).

## Phase 4 — DS-Based Spec Rewrite

### 화면 조립 (App Shell + 12컬럼 그리드, 19장)
```
GlobalHeader (region=header)
 ├─ Row1: [Logo] ········· [TextLink×3][Button:로그인][Button:인증·보안]
 └─ Row2: [NavItem×4] ····· [IconButton:search][IconButton:badge][IconButton:menu]
Main (region=main, surface-page)
 ├─ Heading[display]  "국민과 함께 성장하는 글로벌 주택금융 리더"
 ├─ ProductCarousel → ProductCard×3 (each span 4/12) + Indicator + Control
 └─ QuickLinkBar    → QuickLink×8 (surface-card)
반응형: 카드 3→2(md)→1(sm) 스택; 퀵링크 columns 8→4→2
```

### ProductCard (슬롯 아나토미 + emphasis 변형)
> 홈 메인 상품 카드. `emphasis`로 수치강조형/기능링크형을 한 컴포넌트로 통합.

```
emphasis=metric (카드1·2)           emphasis=feature (카드3)
┌──────────────────────┐           ┌──────────────────────┐
│ #eyebrow (title/lg)  │           │ #eyebrow (title/lg)  │
│ #description (muted) │           │ #description (muted) │
│ #metricLabel "최대"  │           │ #featureLinks:       │
│ #metricValue         │           │  · 상품구성추천 link │
│   (highlight, bold)  │           │  · AI금리체험 link   │
│ #media (illustration)│           │ #media (illustration)│
└──────────────────────┘           └──────────────────────┘
```
- variant 축 `emphasis` 하나 → 매트릭스 아님, 영역 아나토미 2종으로 문서화(17.14 법칙 1).
- 상태: hover(elevation↑)/focus. empty/loading은 전역 패턴 위임(법칙 4).
- 조합 API: compound(`ProductCard.Metric` 등)(법칙 3).
- a11y: 일러스트 `aria-hidden`; 카드 전체 링크면 단일 접근명, 아니면 featureLink 각각 독립 링크.

### QuickLink / QuickLinkBar
> `QuickLink`(아이콘 원형 배경 + caption 라벨)를 `QuickLinkBar`가 반복·정렬. `columns`(8/4/2)로 반응형 접힘을 명시(as-is 누락분 확정).

## Phase 5 — Governance Handoff
- **신규**: `ProductCard`(+emphasis), `ProductCarousel`, `QuickLink`/`QuickLinkBar`, `GlobalHeader` — RFC 대상
- **통합**: 카드 3종→`ProductCard` 1개; 유틸·AI 링크→`TextLink` variant
- **IA 정리**: "간편 서류제출" 네비·퀵링크 중복 확인
- **미해결 리스크**: 브랜드 컬러/타이포 hex 미확정(placeholder), 캐러셀 자동재생·일시정지 접근성 규칙 미정, 카드 클릭 영역(전체 vs 부분) 결정 필요

## Phase 6 — Machine-Readable Spec
컴포넌트별 JSON은 [`component-specs.example.json`](component-specs.example.json)에 배열로 수록했습니다(각 원소는 `../../schema/component-spec.schema.json` 준수). `GlobalHeader`·`PrimaryNav`/`NavItem`·`ProductCard`·`ProductCarousel`·`QuickLink`·`QuickLinkBar` 6종을 포함합니다.
