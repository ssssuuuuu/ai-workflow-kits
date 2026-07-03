# 디자인 시스템 기획 및 개발 방법론

웹 검색을 통해 수집한 디자인 시스템(Design System)의 기획·전략, 아키텍처, 엔지니어링, 국내외 사례를 정리한 리서치 노트입니다. Nathan Curtis(EightShapes), Brad Frost(Atomic Design), Sparkbox 등 업계에서 널리 참조되는 방법론과, Material Design 3 · Atlassian · Shopify Polaris · IBM Carbon · GOV.UK Design System 같은 실제 시스템의 공개 사례, 그리고 토스 · 카카오 · 배달의민족 · 네이버 · LINE · 쿠팡 · 당근마켓 · 인프랩 등 국내 사례를 함께 다룹니다.

이 문서는 코드가 아닌 지식 정리 자료이며, 팀에서 디자인 시스템을 새로 기획하거나 기존 시스템을 진단할 때 체크리스트로 활용하는 것을 목표로 합니다.

> 원자 → 컴포넌트 → 화면의 전 계층을 빠르게 찾으려면 [컴포넌트 카탈로그 인덱스](component-catalog-index.md)를 먼저 보세요.

## 목차

1. [기획·전략 방법론](#1-기획전략-방법론)
2. [성숙도 모델](#2-성숙도-모델)
3. [거버넌스 모델](#3-거버넌스-모델)
4. [팀 조직 모델](#4-팀-조직-모델)
5. [디자인 토큰 방법론](#5-디자인-토큰-방법론)
6. [컴포넌트 아키텍처 방법론](#6-컴포넌트-아키텍처-방법론)
7. [문서화 방법론](#7-문서화-방법론)
8. [접근성(a11y) 통합 방법론](#8-접근성a11y-통합-방법론)
9. [엔지니어링 워크플로우](#9-엔지니어링-워크플로우)
10. [디자인-개발 핸드오프](#10-디자인-개발-핸드오프)
11. [테스트 전략](#11-테스트-전략)
12. [채택·롤아웃 방법론](#12-채택롤아웃-방법론)
13. [글로벌 디자인 시스템 사례 요약](#13-글로벌-디자인-시스템-사례-요약)
14. [국내 테크기업 디자인 시스템 사례](#14-국내-테크기업-디자인-시스템-사례)
15. [반복되는 실패 패턴](#15-반복되는-실패-패턴)
16. [실전 체크리스트](#16-실전-체크리스트)
17. [아이템 단위 컴포넌트 스펙: 배리언트 매트릭스 문서화](#17-아이템-단위-컴포넌트-스펙-배리언트-매트릭스-문서화)
    - [17.1 List / ListItem](#171-list--listitem-아이템-스펙)
    - [17.2 Detail / 속성표](#172-detail--속성표description-아이템-스펙)
    - [17.3 Search](#173-search-아이템-스펙)
    - [17.4 Card](#174-card-아이템-스펙)
    - [17.5 유형별 문서화 방식 선택 가이드](#175-종합-컴포넌트-유형별-문서화-방식-선택-가이드)
    - [17.6 Checkbox / Radio](#176-checkbox--radio-아이템-스펙)
    - [17.7 Button](#177-button-아이템-스펙)
    - [17.8 Label / Description / Title](#178-label--description--title-아이템-스펙)
    - [17.9 결론: 매트릭스는 Figma 핸드오프의 관행](#179-결론-매트릭스는-공개-문서가-아니라-figma-핸드오프의-관행)
    - [17.10 Input 계열](#1710-input-계열-textfield--textarea--select--switch)
    - [17.11 표시·상태 계열](#1711-표시상태-계열-tag--badge--chip--avatar--progress)
    - [17.12 피드백 계열](#1712-피드백-계열-alert--toast--tooltip)
    - [17.13 내비게이션 계열](#1713-내비게이션-계열-tabs--breadcrumb--pagination--menu)
    - [17.14 전체 종합: 원자 카탈로그의 4가지 법칙](#1714-전체-종합-원자-카탈로그에서-반복되는-4가지-법칙)
18. [아이템 조합: 원자에서 컴포넌트, 컴포넌트에서 화면으로](#18-아이템-조합-원자에서-컴포넌트-컴포넌트에서-화면으로)
19. [화면 조립: 컴포넌트에서 페이지로](#19-화면-조립-컴포넌트에서-페이지로)
20. [고차원 진화: 차세대 디자인 시스템 방향](#20-고차원-진화-차세대-디자인-시스템-방향)
    - [20.1 AI 네이티브 / 에이전틱 디자인 시스템](#201-ai-네이티브--에이전틱-디자인-시스템)
    - [20.2 토큰 파이프라인·멀티브랜드 심화](#202-토큰-파이프라인멀티브랜드-심화)
    - [20.3 DesignOps와 헬스 메트릭](#203-designops와-헬스-메트릭)
    - [20.4 차세대 아키텍처](#204-차세대-아키텍처)
    - [20.5 성숙도 다음 단계: 진화 로드맵](#205-성숙도-다음-단계-진화-로드맵)
21. [출처](#21-출처)

---

## 1. 기획·전략 방법론

본격적인 구축 전에 별도의 "전략(Strategy) 단계"를 두는 것이 성숙한 조직의 공통점입니다. Nathan Curtis(EightShapes)는 이를 4단계로 제시합니다.

- **Discover**: 요구사항 수집, 이해관계자 인터뷰, 기존 UI/코드베이스 감사(audit), 백로그 검토로 문제를 파악
- **Explore**: 비주얼 랭귀지 탐색과 기술적 proof-of-concept 진행
- **Plan**: 누가·무엇을·어떻게·언제 만들지 계획 — 스코프는 "MVP(핵심 공통 패턴)"부터 시작해 점증적으로 확장하는 것이 권장됨
- **Align**: 탐색·계획 결과를 이해관계자에게 데모해 합의를 형성. 모든 이해관계자가 실행 계획에 합의하면 전략 단계가 끝난 것으로 봄

**사례**
- **Atlassian**: 30명 이상의 디자이너·엔지니어·콘텐츠 디자이너가 참여하는 co-creation 워크숍(투표·그룹핑)으로 원칙/가치를 도출하고, 이후에도 워크숍 논의로 계속 돌아가 검증
- **Airbnb DLS**: 신구 디자인을 인쇄해 보드에 나열하고 흐름이 깨지는 지점을 찾는 감사(audit) 중심 접근 → 외부 스튜디오와 소규모 전담팀 집중 작업 → 6주 로테이션으로 팀별 컴포넌트 사용 현황을 감사하며 채택 유도, 문서 허브·주간 타운홀 병행

공통적으로 **UI 인벤토리 감사 → 원칙 정의 → 이해관계자 정렬**이 기획 단계의 세 축을 이룹니다.

## 2. 성숙도 모델

**Sparkbox(Ben Callahan) Design System Maturity Model** — 4단계:

| 단계 | 핵심 과제 |
| --- | --- |
| 1단계 | 비일관성/비효율 문제 인식 → 첫 릴리즈까지 기술 스택·초기 컴포넌트 결정 |
| 2단계 | 최초 공식 릴리즈 이후, "채택(adoption)" — 구독 팀 교육·설득 |
| 3단계 | 사용자 규모 확대에 따른 확산 이슈, 명확한 커뮤니케이션 프로세스 필요 |
| 4단계 | 조직 일상 리듬에 편입 — 표준 강제 vs 창의성 허용의 균형, ROI 분석 |

Nathan Curtis 계열 프레임워크는 **Discovery & Strategy → Foundation Building → Component Development → Integration & Adoption → Maintenance & Evolution**의 단계로 설명하며, 기능 사용 범위에 따라 **Within Group / Across Groups / Core(전사 공통)** 3단계 품질 게이트(tier) 개념을 별도로 둡니다.

## 3. 거버넌스 모델

- **IBM Carbon**: React/Yarn/Rust/Ember의 관행을 참고한 공식 **RFC(Request for Comments) 프로세스**. 새 API, 기능 제거, 새로운 관용 패턴 도입 등 "substantial" 변경은 RFC 마크다운 제출 → 머지되면 "active" 상태로 구현 가능. 저자가 직접 구현할 의무는 없으며 넓은 커뮤니티 리뷰가 목적
- **Shopify Polaris**: 요청/디자인 제안/코드 패치용 표준 템플릿으로 기여 장벽을 낮추고, 디자인 시스템 팀(또는 카운슬)이 제안을 triage. 호환성 리뷰·자동 테스트·수동 리뷰로 품질 게이트 유지. "커스터마이징을 막는 것"이 아니라 "모든 이탈(deviation)에 정당한 이유를 갖게 하는 것"이 목적. 시맨틱 토큰 사용을 강제하고 토큰·접근성·비주얼 회귀 규칙을 CI로 자동 검증해 거버넌스를 코드화
- **Atlassian**: "로컬 디자인 시스템들의 시스템(systems of systems)" — 각 제품팀이 로컬 시스템을 만들되 상위 파운데이션을 상속. 아키텍트·엔지니어링 리드·PM으로 구성된 "크래프티(crafties)" 리더십 그룹과 격주 스파링 세션으로 운영(전담 인력 약 18명 / 전체 디자인 조직 약 200명)
- **IBM Carbon (운영)**: "4-in-the-box"(디자인/개발/PO/PM) 모델로 주 2회 이슈 트리아지, 3주 단위 정기 릴리스, 도입 성숙도 자가진단 도구 "Beacon"으로 투명성 확보
- **토스(TDS)**: 300명 이상 조직을 4명이 지원 — "메이커(제품팀)가 활용, 디자인 플랫폼 팀이 제작"하는 구조. 중앙 통제식 금지보다 예외를 지원하는 유연한 규칙. 서비스 단위 "실로(silo)"와 직군 단위 "챕터(chapter)"의 매트릭스 조직에서 TDS가 직군을 넘나드는 공통 기준 역할

## 4. 팀 조직 모델

Nathan Curtis의 대표 분류("Team Models for Scaling a Design System") 3가지:

- **Solitary("The Overlord")**: 한 팀이 자신들의 필요를 중심으로 만들고 타 팀에 공개만 함
- **Centralized**: 전담 중앙 팀이 제작·지원, 다른 팀은 "사용"만 함 — 초기 일관성 확보에 유리하나 병목·현장감 부족 위험
- **Federated**: 여러 프로덕트 팀 대표가 위원회 형태로 방향 결정 — 현장 요구 반영에 강하나, Curtis는 "The Fallacy of Federated Design Systems"에서 순수 federated 모델의 한계를 지적하며 "성공적인 시스템은 항상 중앙 팀을 갖고 federated 커뮤니티의 참여를 구한다"고 언급

실무에서 가장 널리 채택된 것은 **"Dedicated(Centralized) + Federated" 하이브리드**입니다. 대표 사례가 **Salesforce의 Cyclical Team Model**(Jina Anne)로, 중앙 전담 팀과 각 프로덕트 팀 파견 federated 기여자 그룹이 순환하며 정보를 교환합니다. 팀 모델 선택은 기획 단계의 거버넌스 설계에 직결됩니다 — federated 요소가 있으면 RFC/제안 프로세스와 명확한 승인 권한이 필수이고, solitary/centralized 초기 모델일수록 중앙에서 빠르게 감사·원칙 수립을 밀어붙이는 하향식 계획이 가능합니다.

## 5. 디자인 토큰 방법론

Nathan Curtis가 대중화한 **3단계(three-tier) 토큰 모델**이 업계 표준입니다.

1. **Global/Core 토큰**: `gray-100`, `blue-500` 등 원시값(primitive) 그 자체
2. **Alias/Semantic 토큰**: `color-primary`, `color-danger` 등 "의도"를 표현하며 global 토큰을 참조
3. **Component 토큰**: `button-primary-color-background-hover` 등 특정 컴포넌트의 지역적 스타일 결정

토큰 이름은 **namespace(시스템/테마명) → object(컴포넌트/요소) → base(color, radius 등 핵심 속성) → modifier(variant/state/scale)** 4단계 구조를 권장합니다. Material Design 3도 동일 구조를 `reference → system → component` 토큰으로 채택했으며, 색상뿐 아니라 형태(shape)·모션(motion) 토큰까지 확장해 "동적 색상(dynamic color)" 같은 시스템 전반의 자동 반영을 지향합니다.

**표준화**: **W3C Design Tokens Community Group(DTCG)**이 2025년 10월 첫 안정 버전(Design Tokens Format Module 2025.10)을 발표. JSON 기반, `$value`/`$type`/`$description` 키, `{token.name}` 참조 문법, Display P3·OKLCH 등 CSS Color Module 4 색공간 지원. Figma, Penpot, Sketch, Framer, Tokens Studio, Style Dictionary, zeroheight 등 10개 이상 도구가 채택했습니다.

**실무 파이프라인**: Figma Variables 또는 Tokens Studio 플러그인에서 토큰 정의 → JSON으로 저장소 push → CI/CD에서 **Style Dictionary**(가장 널리 쓰이는 변환 도구)가 CSS 변수(웹)/Swift(iOS)/XML(Android) 등으로 변환.

## 6. 컴포넌트 아키텍처 방법론

**Atomic Design(Brad Frost, 2013)**: Atoms(더 쪼갤 수 없는 기본 요소) → Molecules(원자 조합, 재사용 패턴) → Organisms(맥락을 가진 복합 컴포넌트) → Templates(콘텐츠 구조만 있는 뼈대) → Pages(실제 콘텐츠가 채워진 템플릿). 선형 프로세스가 아니라 "부분이자 전체"로 UI를 사고하는 멘탈 모델이며, Frost 본인도 라벨을 문자 그대로 따르다 분류 논쟁에 매몰되는 것을 경계하고 실무에서는 용어를 엄격히 쓰지 않는다고 밝힘.

**대안 모델**
- **Material Design 3**: 컴포넌트를 anatomy(구성 요소)·states(enabled/hover/focus/pressed/disabled)·specs(속성-토큰 매핑)·behaviors 단위로 문서화하는 스펙 중심 모델
- **IBM Carbon**: 프레임워크 애그노스틱(React/Angular/Vue/Svelte/Web Components)하게 컴포넌트를 관리하며, 기여 프로세스에 컴포넌트 체크리스트(디자인 검토 → 접근성 검토 → 코드 구현 → 문서화)를 명문화
- **쿠팡 RDS**: 요소(Elements)-부품(Parts)-단위(Units)의 3단계 구조

## 7. 문서화 방법론

잘 문서화된 시스템은 컴포넌트별로 (1) 라이브 코드 예제, (2) 인터랙티브 API/props 테이블, (3) 사용 가이드라인 산문, (4) Do's/Don'ts, (5) 접근성 노트를 함께 제공합니다.

- **Storybook**: 코드에서 자동 생성되는 라이브 예제 + ArgsTable 제공. "코드가 진실의 원천"인 개발자 문서에 강점. 2026년 현재는 인터랙션 테스트 + 비주얼 회귀 + 접근성 검증 + CI 실행까지 아우르는 풀 테스팅 플랫폼으로 확장
- **Zeroheight**: 디자인 명세·토큰 추적·크로스펑셔널(디자인/PM 포함) 커뮤니케이션에 특화, Intuit·Instacart·Guardian 등이 사용

실무에서는 **Zeroheight(디자인 측 문서) + Storybook(코드 측 문서, 애드온 연동)** 을 병행하는 패턴이 일반적입니다.

## 8. 접근성(a11y) 통합 방법론

- **GOV.UK Design System**: WCAG를 보완하는 "접근성 수용 기준(accessibility acceptance criteria)"을 컴포넌트별로 작성. (1) 실제 페이지 맥락에서 테스트, (2) `jest-axe`/`@axe-core/puppeteer`(색상 대비 포함)/`html-validate`(WCAG 2.1 HTML 준수)를 배포 파이프라인에 내장, (3) 키보드/스크린리더/음성 제어/터치 등 다양한 상호작용 방식의 수동 테스트, (4) 브라우저×보조기술 조합별 결과 기록 템플릿 사용. 전체 이슈의 약 30%만 자동 테스트로 탐지된다고 보고 자동+수동+사용자 리서치 3단계 전략을 병행. 사이트 자체는 WCAG 2.2 AA 완전 준수 목표
- **USWDS**: WCAG 2.1 AA 성공 기준을 근거로 컴포넌트마다 별도 "accessibility-tests" 페이지에 보조기술별 구체적 테스트 방법을 게시해 전문 장비 없이 수동 검증 가능하게 함
- **Carbon**: 컴포넌트 체크리스트에 접근성 리뷰를 필수 게이트로 포함
- **axe-core(Deque)**: 사실상 업계 표준 자동화 도구. WCAG 2.0/2.1/2.2 A/AA/AAA 규칙 커버, `@axe-core/playwright`로 E2E 테스트에 통합해 CI에서 자동 스캔

## 9. 엔지니어링 워크플로우

**모노레포 툴링** (2026년 기준 3대 주류)
- **Turborepo**(Vercel, Rust 기반): 빠른 빌드 캐싱, 낮은 설정 부담 — 신규 팀에 추천
- **Nx**: 다수 팀이 관여하는 대형 플랫폼에 적합, 표준화된 스캐폴딩·의존성 그래프 분석
- **Lerna**(v6+): 태스크 실행/캐싱은 Nx에 위임하고 패키지 버저닝·npm 배포 조율에 집중 — 다중 패키지 오픈소스 컴포넌트 라이브러리에 적합

실무에서는 "Turborepo(빌드 오케스트레이션) + Lerna(배포 조율) + 프레임워크별 라이브러리" 조합이 흔합니다.

**멀티 프레임워크 지원**: IBM Carbon(React/Angular/Vue/Svelte/Web Components), Park UI(React/Solid/Vue + Tailwind or Panda CSS). Web Components(Declarative Shadow DOM + SSR 성숙)가 프레임워크 독립적 기반으로 재부상 — 캘리포니아 주정부 디자인 시스템은 독립적 Web Components로 배포해 CSS 충돌·의존성 문제를 최소화.

**시맨틱 버저닝**: 디자인 시스템을 "공개 API를 가진 제품"으로 취급 — API는 토큰명·의미, 생성된 CSS 커스텀 프로퍼티, 지원 테마 컨텍스트, 접근성 동작, 문서화된 DOM/스타일링 훅까지 포함. Major=breaking, Minor=하위호환 추가, Patch=버그 수정.

**Changesets 릴리스 흐름**: PR에서 `changeset` 명령으로 변경 요약 + semver 범프 타입을 담은 마크다운 작성 → PR과 함께 커밋 → main 병합 시 CI가 changeset을 수집해 "Release Preview" PR 자동 생성(버전 범프 + CHANGELOG 갱신) → 머지하면 태그 생성·npm 배포까지 자동화(`changesets/action`). 모노레포 내 패키지 간 의존성도 자동 동기화되어, 배포 자체와 버전 결정을 분리할 수 있습니다.

## 10. 디자인-개발 핸드오프

Figma는 Plugin/Widget/REST 세 종류의 API를 제공하며, **변수(Variables)를 코드 레포로 동기화하는 REST API 기능은 Enterprise 플랜 전용**이라는 제약이 있습니다. 이를 보완하는 서드파티 파이프라인:

- **Tokens Studio**(구 Figma Tokens): Figma 네이티브 Variables와 병행 작동, 멀티 파일 토큰 관리, Git/GitHub 직접 동기화 — 코드 친화적 토큰 생성에 강점
- **Supernova**: Figma Variables Sync 플러그인으로 변수/모드 컬렉션을 가져온 뒤 CSS 변수·SCSS·플랫폼별 포맷(Swift, Kotlin 등)으로 내보냄
- **Specify**: 문서화 기능 없이 토큰 추출·동기화에만 집중하고 싶을 때 선택

일반적 파이프라인: **Figma(Variables/Tokens Studio) → 동기화 플러그인/API → 토큰 저장소(JSON) → Style Dictionary류 변환기 → 플랫폼별 코드 → 컴포넌트 라이브러리 소비**

## 11. 테스트 전략

**비주얼 회귀 테스트(VRT)**
- **Chromatic**: Storybook 팀 제작, 스토리 단위 컴포넌트 스냅샷 특화, Chrome/Firefox/Safari/Edge 병렬 크로스브라우저 테스트
- **Percy**: CI 우선 설계, 크로스브라우저 diff, 스테이징/프로덕션 페이지 레벨 검증에 적합
- **Playwright `toHaveScreenshot`**: 베이스라인 이미지 자동 생성·비교, 별도 서비스 없이 시작 가능
- 원칙: 컴포넌트 단위 VRT(Storybook+Chromatic)는 격리된 회귀를 조기 포착, 페이지 단위 VRT(Playwright/Percy)는 컴포넌트 조합의 통합 이슈를 포착

**컴포넌트/유닛 테스트**: Storybook Test의 Vitest addon이 스토리를 실제 Vitest 테스트로 자동 변환해 브라우저 환경에서 렌더링·동작 검증.

**접근성 자동화**: `axe-core` + `@axe-core/playwright` 조합을 CI에 통합.

## 12. 채택·롤아웃 방법론

- **Shopify Polaris**: "채택 장벽을 최대한 낮추기"가 핵심 원칙 — 근거·코드 사용법·접근성·예제를 포함한 검색 가능한 문서, 명확한 기여 템플릿, 전담 팀/카운슬의 품질 게이트. "시스템 컴포넌트 사용 비율 vs 커스텀 구현 비율"을 채택 지표로 활용
- **Spotify Encore**: Mobile/Web 두 서브시스템이 공통 토큰(컬러, 타이포)을 기반으로 처음부터 크로스플랫폼 컴포넌트를 병행 개발해 사후 통합이 아닌 설계 단계부터 동기화
- **Airbnb DLS**: "디자인 도구가 코드를 못 따라가면 코드가 디자인 도구로 렌더링하게 만들자" — **react-sketchapp**(React 컴포넌트를 Sketch로 직접 렌더링)으로 엔지니어가 기능 로직에 집중하게 하고, 애니메이션은 **Lottie**(After Effects 애니메이션을 iOS/Android/RN에서 실시간 렌더링)로 오픈소스화

**공통 운영 방법론**
- **채택 지표/대시보드**: 커스텀 ESLint 규칙(`eslint-plugin-deprecation` 등)으로 컴포넌트 사용 빈도·디프리케이트 컴포넌트 잔존 인스턴스를 추적, 대시보드화. 다운로드 수·의존성 최신성·버전 채택률·컨트리뷰터 활동도 지표로 사용
- **코드모드(Codemod)**: Breaking change 시 자동 코드 업데이트 스크립트 제공, 릴리스 노트에 영향 컴포넌트와 마이그레이션 가이드 명시
- **디프리케이션 정책**: 사용률 6개월 내 5% 미만 · 더 나은 대안 존재 · 표준 미준수 · 기술 노후화 시 디프리케이트 대상 선정 → 코드·디자인 툴 양쪽에 마킹 → 마이그레이션 경로 제공 → CI 린트로 잔존 사용 플래그

## 13. 글로벌 디자인 시스템 사례 요약

| 시스템 | 특징 |
| --- | --- |
| Material Design 3 (Google) | `reference → system → component` 3단계 토큰, 형태·모션 토큰까지 확장, 동적 색상 |
| Atlassian Design System | "시스템들의 시스템", 크래프티 리더십 그룹, 격주 스파링 세션 |
| Shopify Polaris | 시맨틱 토큰 강제, CI로 거버넌스 코드화, React → Web Components 전환 중 |
| IBM Carbon | Apache 2.0 완전 오픈소스, 4-in-the-box 운영, 3주 릴리스, 자가진단 도구 "Beacon" |
| GOV.UK Design System | 접근성 최우선, 자동+수동+사용자 리서치 3단계 접근성 전략 |
| Ant Design | "자연스러움-확실함-의미있음-성장" 4대 가치, 객체지향적 디자인 규칙 |
| Adobe Spectrum | 플랫폼 간 일관성 → Spectrum 2에서 플랫폼별 변형 허용으로 전환 |
| Microsoft Fluent 2 | 네이티브 컴포넌트 80% 재사용 + 시그니처 경험 20% 투자 원칙 |

## 14. 국내 테크기업 디자인 시스템 사례

- **토스(TDS)**: 2018년 구축된 컬러 시스템을 7년 만에 전면 개편(2025). "디자인 시스템 다시 생각해보기"에서 규모가 커질수록 규약이 속도를 저해해 팀들이 시스템을 우회하는 문제를 지적, 공급자-수요자 구도에서 벗어나 "디자인 시스템도 하나의 제품"이라는 관점으로 전환
- **카카오**: 카카오스타일 프론트엔드팀은 컴파운드 컴포넌트 패턴 + 테마 기반 토큰에 "Inverse(강조)" 개념을 도입해 라이트/다크 테마 전환 시 혼재 문제 해결(2024). 카카오뱅크는 Figma 도입으로 디자인 생산성 30% 개선 공개. 카카오엔터테인먼트는 아토믹 디자인 방법론 적용
- **우아한형제들(배달의민족)**: 2020년 "배민셀프서비스" 개편에서 프론트엔드 개발자 6명이 프로토콜에 따라 React 컴포넌트를 구현, 1주일 만에 시스템 완성. 이후 디자이너별 미세하게 다른 컴포넌트 양산 문제 해결을 위해 "공통디자인TF" 신설, 사장님(업주) 서비스 전체를 아우르는 통합 디자인시스템 준비 중
- **네이버**: 네이버페이는 "모든 서비스가 같은 컴포넌트를 쓰면 한 곳에서 관리하는 게 낫다"는 문제의식에서 자체 시스템 "deFign" 구축. 네이버 검색팀은 통합검색 개편을 계기로 표준화 원칙이 없던 상태에서 처음으로 디자인 시스템 구축
- **LINE**: 2019년 1,500개 이상 프로젝트·400여 명 디자이너 규모에서 효율성·품질·일관성을 목표로 구축 시작, 메신저용(LDSM)과 글로벌 패밀리 서비스용(LDSG)으로 분리 설계, 2021년 공식 웹사이트 오픈. LY(라인야후)는 3단계(3-tier) 토큰으로 유연성을 확보하는 방법을 공유
- **쿠팡(RDS, Rocket Design System)**: 2020년 4월 UX디자인·모바일엔지니어링 전문가 TF에서 출발. Figma 기본 inspect 기능 부족을 자체 플러그인으로 보완, 워크플로우에 A/B 테스트를 내장해 데이터 기반 운영 표방
- **당근마켓**: 별도 "플랫폼 디자이너" 직무를 두어 브랜드 컬러·아이콘·서체 등 전체 리브랜딩과 디자인 시스템 구축·관리 전담, 글로벌 확장을 고려한 범용 UI 설계 강조
- **인프랩(인프런)**: 전담 플랫폼팀 없이 프론트엔드 10명·디자이너 5명 규모에서 자체 구축 대신 오픈소스 Mantine을 채택해 2년 운영, Changesets + GitHub Actions로 배포 자동화, "특정 개인의 퇴사에도 흔들리지 않는" 분산 오너십 문화 강조

## 15. 반복되는 실패 패턴

해외/국내 사례를 종합하면 다음이 반복적으로 관찰됩니다.

1. **우선순위·자원 부족** — 전담 리소스 없이 "부업"으로 운영되면 구축이 항상 뒤로 밀림
2. **현장 정착 실패** — 아무리 잘 만들어도 실제 사용팀이 우회하면 무의미. 과도한 규약이 오히려 속도를 저해해 이탈을 유발
3. **과도한 커스터마이징/복잡도 증가** — 컴포넌트·옵션을 계속 추가하면 유지보수 부채가 기하급수적으로 증가
4. **비현실적 일정** — 디자인 감사(audit)와 인벤토리 없이 임의 마감을 설정하면 실패 확률이 높음
5. **기초 체계 소홀** — 토큰·접근성·콘텐츠 가이드 없이 단순 컴포넌트 라이브러리로 축소하면 일관성이 무너짐
6. **출시 후 방치** — 시스템은 "제품"으로서 지속적 로드맵·유지보수가 필요하며 런칭이 끝이 아님
7. **공급자-수요자 구도의 경직성** — 시스템팀을 "공급자", 제품팀을 "수요자"로 나누는 관료적 구조 자체가 마찰의 근원. 수요 기반의 유연한 공급 체계로 전환하는 것이 최근 트렌드(토스 사례)

## 16. 실전 체크리스트

**기획 단계**
- [ ] 기존 UI/컴포넌트 인벤토리 감사(audit)를 먼저 수행했는가
- [ ] 원칙/가치를 이해관계자 co-creation 워크숍으로 도출했는가
- [ ] MVP 스코프(핵심 공통 패턴)부터 시작해 점증적으로 확장하도록 설계했는가
- [ ] 팀 조직 모델(Centralized/Federated/하이브리드)을 명시적으로 정했는가
- [ ] 거버넌스 프로세스(RFC, 기여 템플릿, 승인 권한)를 문서화했는가

**아키텍처 단계**
- [ ] 3단계 토큰 체계(Global → Semantic → Component)를 설계했는가
- [ ] W3C DTCG 포맷 또는 Style Dictionary 파이프라인을 검토했는가
- [ ] 컴포넌트 계층/명명 규칙을 정했는가 (Atomic Design 또는 자체 체계)
- [ ] 접근성 기준(WCAG 레벨)과 컴포넌트별 수용 기준을 정의했는가

**엔지니어링 단계**
- [ ] 모노레포 툴(Turborepo/Nx/Lerna)과 시맨틱 버저닝 규칙을 정했는가
- [ ] Changesets 등으로 릴리스·체인지로그 자동화를 구축했는가
- [ ] Figma ↔ 코드 토큰 동기화 파이프라인을 구축했는가
- [ ] 비주얼 회귀 테스트 + 접근성 자동 테스트(axe-core)를 CI에 넣었는가

**채택 단계**
- [ ] 채택률/디프리케이트 컴포넌트 잔존율을 측정하는 대시보드가 있는가
- [ ] Breaking change 시 코드모드와 마이그레이션 가이드를 제공하는가
- [ ] 디프리케이션 정책(기준·마킹·경로)이 문서화되어 있는가
- [ ] 시스템팀-제품팀 관계가 "공급자-수요자"가 아닌 "문제 해결 파트너"로 설계되어 있는가

**아이템 스펙 단계**
- [ ] 축이 2개 이상인 컴포넌트(색상×정렬, 굵기×크기 등)에 배리언트 매트릭스 표를 작성했는가
- [ ] 컴포넌트 패밀리를 네임스페이스 프리픽스(예: `Chart` + 역할)로 그룹핑했는가
- [ ] 각 컴포넌트 제목 아래 역할/의도를 한 문장으로 명시했는가

## 17. 아이템 단위 컴포넌트 스펙: 배리언트 매트릭스 문서화

개별 컴포넌트(아이템) 단위로 내려가면, 6장의 컴포넌트 아키텍처와 7장의 문서화 방법론이 실제로 한 장의 스펙 시트에서 어떻게 만나는지가 중요해집니다. 특히 차트/데이터 시각화처럼 "같은 역할, 다른 스타일 조합"이 많은 영역(라벨, 값, 범례 텍스트 등)에서 반복적으로 관찰되는 문서화 패턴을 정리합니다.

**네임스페이스 프리픽스로 컴포넌트 패밀리 그룹핑**

상위 도메인(예: `Chart`)과 역할(`Value`, `Label`, `LabelGroup`, `Legend`)을 이어붙여 컴포넌트명을 지으면, 이름만으로 같은 패밀리에 속한다는 것과 각자의 역할을 동시에 전달할 수 있습니다. 실제 오픈소스 차트 시스템에서도 같은 패턴이 보입니다 — shadcn/ui는 `ChartLegend`/`ChartLegendContent`로 범례를 별도 컴포넌트로 분리하고, PatternFly의 `ChartLegend`는 "standalone 컴포넌트로도 사용 가능"하다고 명시합니다. Carbon Charts는 데이터 시각화 전용 타이포그래피·컬러 토큰 체계를 UI 컴포넌트와 별도로 관리합니다.

**배리언트 매트릭스(Variant/Property Matrix) 표**

컴포넌트 하나가 서로 다른 두 축의 prop(예: `weight × size`, `color × align`)을 가질 때, 모든 조합을 행×열 그리드에 배치하고 각 셀에 실제 렌더링 결과를 그대로 보여주는 표를 만드는 것이 "property matrix" 기법입니다. Figma의 컴포넌트/Variants 문서화 가이드에서도 변형이 많아지면 행·열·그리드로 배치하고 축에 라벨을 붙이도록 권장합니다.

- 축은 최대 2개까지만 하나의 표에 담고, 3번째 이상의 독립 변수는 표를 분리합니다 (예시 이미지의 `ChartValue`는 `weight × size`, `ChartLabel`은 `color × align`을 각각 별도 표로 분리).
- 셀 안에는 추상적인 설명 대신 실제 렌더링 텍스트("value", "Label")를 그대로 넣어, 표 자체가 대비·가독성 QA 도구 역할을 하게 합니다.
- 컴포넌트명 옆에 아이콘 배지(◆ 등)를 붙여 "이것은 디자인 툴의 컴포넌트/Variant 세트"임을 시각적으로 표시하는 관행도 함께 관찰됩니다.
- 제목 바로 아래 한 문장으로 "이 컴포넌트가 차트/화면 내에서 어떤 역할을 하는지"를 적는 것은 Material Design 3의 anatomy/behavior 문서화와 같은 목적(역할과 의도의 명시)을 가집니다.

**이 방식이 유효한 이유**

- 조합 폭발(combinatorial explosion)을 표 하나로 통제 — 새 조합이 필요하면 빈 셀만 채우면 되므로 확장성이 높습니다.
- 디자이너와 개발자가 같은 표를 보고 "이미 존재하는 조합인지, 새로 만들어야 하는 조합인지"를 즉시 판단할 수 있어 4장의 거버넌스 프로세스(RFC 등)에 바로 연결됩니다.
- `ds-transform` 패키지(`packages/ds-transform/`)의 Phase 4(DS 기반 스펙 재작성)에서, 축이 2개 이상인 컴포넌트 후보는 산문형 설명 대신 이 매트릭스 표로 출력하도록 반영했습니다.

**중요한 보정: 매트릭스는 보편적 관행이 아니라 상황별 선택지**

List, Detail(속성표), Search, Card 4개 UI 패턴을 대상으로 Material Design 3, Carbon, Ant Design, Shopify Polaris, Atlassian, GOV.UK, Cloudscape 등 주요 공개 디자인 시스템 문서를 추가로 조사한 결과, 이미지에서 관찰한 "행×열 매트릭스에 렌더링 프리뷰를 채우는" 방식은 **공개 웹 문서에서는 오히려 드문 관행**이라는 사실이 확인되었습니다. 대부분의 시스템은 다음 3가지 방식을 조합합니다.

1. **아나토미 다이어그램**(번호 매긴 구성요소 목록) + **prose 가이드라인** — Material Design 3의 Guidelines/Specs 탭 구조가 대표적
2. **축 하나씩 분리한 개별 라이브 예시**를 세로로 나열 — Ant Design, Carbon usage 페이지가 대표적("축 하나 = 데모 하나")
3. **상태(state)는 컴포넌트 전용이 아니라 시스템 전역 패턴 문서**(Disabled states, Loading pattern, Empty states 등)로 위임하고 컴포넌트 페이지에서는 링크만 거는 방식

진짜 격자형 매트릭스(두 축을 교차한 그리드에 실제 렌더링을 채우는 방식)는 **Figma 컴포넌트 셋 캔버스**처럼 디자인 툴 파일 내부 관행으로 주로 발견되며, 그것이 스크린샷/이미지로 캡처되어 별도 스펙 문서로 공유될 때 이번에 학습한 이미지와 같은 형태가 됩니다. 즉:

- **매트릭스 표**는 하나의 컴포넌트가 **정확히 2개의 독립적인 시각 축**을 가지고, 그 조합을 디자이너·QA가 한 화면에서 검증해야 할 때(전형적으로 차트 텍스트, 배지/태그, 버튼처럼 상태·크기 조합이 많은 원자 단위 컴포넌트) 가장 효율적입니다.
- **아나토미 다이어그램 + prose**는 컴포넌트의 구성 파츠 자체가 복잡하거나(List, Card, Search처럼 리딩/트레일링/미디어/액션 슬롯이 여러 개인 분자·유기체 단위), 축 간 상호배타 규칙이 많아 격자로 표현하면 오히려 빈 칸(해당 없음)이 많아지는 경우에 더 적합합니다.
- 두 방식은 배타적이지 않습니다 — 같은 컴포넌트 패밀리 안에서도 원자(atom) 단위 하위 요소는 매트릭스로, 그 위의 분자(molecule)/유기체(organism) 조립 규칙은 아나토미+prose로 문서화하는 것이 실무에서 관찰되는 균형점입니다.

### 17.1 List / ListItem 아이템 스펙

- **아나토미**: leading(아이콘/아바타/체크박스) — headline/title — supporting text(부제) — trailing(아이콘/텍스트/스위치)의 4파츠 구조가 Material Design 3, Ant Design, Shopify Polaris ResourceItem에서 공통으로 관찰됩니다. MD3는 텍스트 줄 수에 따라 one-line/two-line/three-line으로 콘텐츠 타입 축을 별도로 문서화합니다.
- **서브컴포넌트 네이밍**: MUI(Material UI)는 `ListItem`, `ListItemAvatar`, `ListItemIcon`, `ListItemText`, `ListItemButton`, `ListItemSecondaryAction`으로 리딩/트레일링 파츠를 별개 컴포넌트로 쪼개는 접두사(prefix) 분해 패턴을 씁니다. Ledger Live 디자인 시스템도 `ListItemLeading`/`ListItemContent`/`ListItemTitle`/`ListItemDescription`/`ListItemTrailing`으로 동일한 패턴을 채택했습니다 — `Chart` 패밀리와 같은 네임스페이스 프리픽스 원칙이 List 파츠 분해에도 그대로 적용된 사례입니다.
- **상태**: hover/selected/disabled/loading(skeleton)/empty가 반복 관찰되나, Carbon StructuredList처럼 "selected 표시가 체크마크에서 라디오 아이콘/좌측 배치로 개편"된 사례처럼 컴포넌트별 세부 규칙은 계속 진화합니다. empty/loading은 List 컴포넌트 자체보다 시스템 전역 패턴에 위임되는 경우가 많습니다.
- **매트릭스 vs prose**: 정통 매트릭스 문서는 발견되지 않았고, "밀도(density) × 콘텐츠 타입" 조합은 개별 예시 나열 방식이 지배적입니다.

### 17.2 Detail / 속성표(Description) 아이템 스펙

- **아나토미**: label(term) + value(definition) 쌍이 기본 단위이며, GOV.UK `Summary list`는 여기에 선택적 `actions`(예: "Change" 링크)를 3번째 구성요소로 공식화합니다. Ant Design `Descriptions`가 가장 세분화된 축(layout: horizontal/vertical, column 수, size, bordered)을 제공합니다.
- **액션 slot의 variant화**: GOV.UK Summary list는 "액션 없음 → `--no-border`로 테두리 제거", "단일 액션", "복수 액션(최대 3개 권장)", "카드 레벨 액션(summary-card로 감싸 그룹 단위 액션)"까지 액션 유무·개수를 명시적 variant 축으로 문서화한 유일한 사례입니다. 접근성 규칙으로 "Change" 같은 링크 텍스트에 시각적으로 숨긴 대상 설명(`visually-hidden`)을 반드시 붙이도록 강제합니다.
- **상태**: Carbon StructuredList만 skeleton(로딩) 상태를 공식 지원합니다. 값이 없을 때(empty value), 긴 텍스트 처리(ellipsis/truncation), 에러/누락 데이터는 대부분 시스템에서 detail 컴포넌트 자체가 아니라 콘텐츠 라이팅 가이드나 별도 알림 컴포넌트로 위임됩니다.
- **매트릭스 vs prose**: 6개 시스템 모두 매트릭스를 쓰지 않고 "축 하나 = 데모 하나" 방식입니다.

### 17.3 Search 아이템 스펙

- **아나토미**: leading search 아이콘 + input text + clear(X) 버튼(값이 있을 때만 노출) + optional submit 버튼 조합이 공통입니다. Material Design 3는 축약형 `SearchBar`와 전체화면/도킹형 `SearchView`를 별개 컴포넌트로 분리하고, Carbon은 `expandable`(아이콘만 있다가 클릭 시 확장) vs 항상 펼쳐진 필드를 variant 축으로 둡니다 — "expanded vs collapsed(icon-only)" 축은 Search 컴포넌트에서 유독 자주 등장하는 패턴입니다.
- **필터와의 조합**: 검색 결과를 좁히는 필터 칩/태그는 별도 컴포넌트로 분리 문서화됩니다(Carbon `Tag`의 dismissible variant, Material Design `Filter chip`, AWS Cloudscape의 `TextFilter`/`PropertyFilter`). 검색 결과 아이템 자체를 독자 컴포넌트로 스펙화한 시스템은 드물고, List/Card/Data table을 재사용하도록 안내하는 경우가 대부분입니다.
- **상태**: enabled/focus/filled(값 있음)/disabled가 기본이며, "no results found" 빈 상태와 로딩은 Search 컴포넌트 페이지가 아니라 시스템 전역 Empty state / Loading 패턴 문서에서 다뤄집니다. 디바운스·타이핑 중 상태를 명시적으로 문서화한 시스템은 확인되지 않았습니다(구현 세부사항으로 남겨둠).
- **매트릭스 vs prose**: 검색 컴포넌트도 매트릭스보다 아나토미 다이어그램 + 속성표 + 개별 code example 조합이 지배적입니다.

### 17.4 Card 아이템 스펙

- **아나토미**: container, media/thumbnail, headline/title, subhead, supporting text, actions/buttons가 Material Design 3·Ant Design·Shopify Polaris에서 공통 관찰됩니다. Polaris는 header/body(section)/footer 3부 구조로 단순화합니다.
- **스타일 축과 패밀리 네이밍**: MD3는 elevated/filled/outlined 3가지 스타일을 하나의 `Card` 컴포넌트 prop으로 관리하는 반면, Carbon은 `Tile`을 기본으로 `ClickableTile`/`SelectableTile`/`ExpandableTile`처럼 **형용사+Tile 접두 방식**의 별개 컴포넌트로 쪼갭니다. Atlassian은 범용 Card 컴포넌트 자체가 없고 Box 프리미티브 + 토큰 조합("composition" 패턴)으로 직접 구성하도록 안내한다는 점이 특이합니다 — 모든 시스템이 전용 Card 컴포넌트를 갖는 것은 아닙니다.
- **상태**: MD3가 enabled/hover/focused/pressed/dragged/disabled 6개로 가장 표준화되어 있고, Carbon Tile은 variant별로 상태 목록이 달라집니다(SelectableTile만 hover-selected 상태를 별도로 가짐). loading/skeleton은 Ant Design만 명시적으로 지원, selected는 Carbon만 명확히 구분 — 시스템마다 어떤 상태를 "1급 시민"으로 다룰지가 다릅니다.
- **매트릭스 vs prose**: MD3의 Specs 탭(anatomy → states → measurements를 순서대로 체계화)이 "완전한 격자는 아니지만 축별로 계통적으로 나눈다"는 점에서 매트릭스에 가장 근접한 사례로 관찰됩니다.

### 17.5 종합: 컴포넌트 유형별 문서화 방식 선택 가이드

| 컴포넌트 성격 | 대표 사례 | 권장 문서화 |
| --- | --- | --- |
| 축 2개, 원자 단위, 조합 수가 QA 대상 (텍스트 스타일, 배지, 버튼 등) | ChartValue, ChartLabel | 배리언트 매트릭스 표 |
| 파츠가 여러 개인 분자/유기체, 슬롯 조합이 다양 (List, Card, Search) | ListItem, Card, SearchBar | 아나토미 다이어그램 + prose + 축별 개별 예시 |
| 액션/상호작용이 variant처럼 취급되는 경우 (Detail/속성표) | Summary list의 actions | 액션 유무·개수를 명시적 축으로 표기 |
| 상태(empty/loading/error) | 전 유형 공통 | 컴포넌트 페이지에 개별 정의하지 말고 시스템 전역 패턴 문서로 위임 후 링크 |

`ds-transform` 패키지의 Phase 2(Atomic Mapping)·Phase 4(DS-Based Spec Rewrite)는 이 가이드를 반영해, 컴포넌트 후보의 축 개수와 파츠 복잡도에 따라 매트릭스 표와 아나토미+prose 중 하나를 선택하도록 갱신되었습니다.

17.5까지는 "축 2개짜리 원자 단위는 매트릭스가 적합하다"고 가정했습니다. 이 가정을 실제 원자 컴포넌트(체크박스, 라디오 버튼, 버튼, 폼 라벨/디스크립션/타이틀)로 검증한 결과가 아래 17.6~17.9입니다.

### 17.6 Checkbox / Radio 아이템 스펙

- **아나토미**: Checkbox = container(박스) + checkmark/indeterminate 아이콘 + label. Radio = 원 + 내부 점 + label. Material Design 3, Carbon, Ant Design, Atlassian, Shopify Polaris 5개 시스템 모두 이 기본 구조를 공유합니다.
- **변형 축**: `selection state`(unselected/selected/indeterminate/error) × `interaction state`(enabled/hover/focused/pressed/disabled)가 개념적으로 두 축을 이룹니다. Carbon은 여기에 `read-only`, `warning`(경고성 미확정 상태)까지 추가합니다.
- **그룹 vs 아이템 분리**: Ant Design, Atlassian, Carbon, Polaris 모두 "그룹"(`Radio.Group`, `Radio group` 페이지, `Radio button group` 패턴)을 개별 라디오 아이템과 별도 컴포넌트/별도 문서 페이지로 분리합니다 — 그룹은 네이티브 `name` 속성 기반 상호배타 동작과 화살표 키 내비게이션을 별도로 다뤄야 하기 때문입니다.
- **매트릭스 여부**: 5개 시스템의 공개 문서 어디에도 `selection state × interaction state`를 렌더링된 격자로 채운 표는 없습니다. 모두 상태별 스크린샷을 세로로 나열하는 prose 방식입니다. 진짜 격자 배치(50~90개 variant를 한 캔버스에 배열)는 Figma 커뮤니티 컴포넌트 파일에서만 관찰되며, 공개 웹 문서 사이트에는 나타나지 않습니다.

### 17.7 Button 아이템 스펙

- **아나토미**: label(필수) + container + optional icon. 축은 `kind/type/appearance`(primary/secondary/tertiary/ghost/danger 등)와 `size`(Carbon만 7단계: xs/sm/md/lg-productive/lg-expressive/xl/2xl)입니다.
- **아이콘 버튼 분리 방식**: Carbon·Material Web·Atlassian은 `IconButton`을 별도 컴포넌트로 분리하고, Ant Design·Polaris는 기존 `Button`에 `shape="circle"` 또는 `icon` prop을 조합하는 방식을 씁니다 — List의 서브컴포넌트 분해(17.1)와 마찬가지로 "분리형 vs prop 조합형" 두 갈래가 반복됩니다.
- **매트릭스 여부**: 5개 시스템 공개 문서 어디에도 `kind × size` 또는 `kind × state`를 렌더링된 버튼 프리뷰로 채운 격자 표가 없습니다. 대신 (a) 축마다 별도 프로즈 섹션 + 라이브 코드 데모, (b) Storybook 개별 story/컨트롤 패널, (c) prop을 행으로 나열하는 API 표(시각적 매트릭스 아님) 방식이 표준입니다. 로딩/비활성 상태도 매트릭스에 곱해 넣지 않고 별도 섹션에서 1회만 설명합니다(Carbon은 "로딩=disabled의 특수 케이스"로 단순화).

### 17.8 Label / Description / Title 아이템 스펙

- **Label**: 폼 라벨은 위치(top-aligned가 표준), 필수/선택 표시(별표 vs "(optional)" 접미사), 상태(success/warning/error) 축으로 문서화됩니다. Material Design 3는 resting/floating 두 상태를 가진 라벨을 모든 텍스트 필드의 필수 요소로 규정합니다.
- **Description/Helper text**: Material Design 3와 Carbon 모두 helper text가 **에러 발생 시 error text로 완전히 대체(교체)되는 슬롯**이라는 점을 명시합니다 — 즉 helper와 error는 같은 자리를 놓고 경쟁하는 상호배타적 variant입니다. GOV.UK는 반대로 hint text를 variant 축이 아니라 콘텐츠 라이팅 규칙(한 문장 이내, 링크 금지, 마침표로 종료)으로 다룹니다.
- **Title/Typography as 매트릭스**: Material Design 3의 타입 스케일은 `role`(display/headline/title/body/label) × `size`(large/medium/small) = 15개 조합으로, 개념적으로는 정확히 2축 매트릭스입니다. 하지만 실제 페이지는 격자가 아니라 15개 행을 가진 세로 flat 표(각 행 = role+size 조합 + 렌더 샘플)로 표시됩니다. Carbon은 role×size 대신 `사용 맥락`(Productive/Expressive) × `역할`(heading/body/label)을 축으로 삼습니다.
- **네임스페이스 그룹핑의 실사례**: `Chart`+`Value`/`Label`/`Legend` 가설과 가장 유사한 실제 사례는 **shadcn/ui의 `Field` 패밀리**입니다 — `Field`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldError`, `FieldSet`, `FieldGroup`으로 구성되며, `FieldTitle`은 "Label과 동일한 타이포 스타일을 공유하는 타이틀 슬롯"으로 명시되어 Label·Title·Description이 하나의 상위 도메인(`Field`) 아래 프리픽스로 묶인 것을 실증합니다.

### 17.9 결론: 매트릭스는 "공개 문서"가 아니라 "Figma 핸드오프"의 관행

체크박스·라디오·버튼·라벨까지 가장 단순한 원자 컴포넌트로 검증을 넓혀도 결론은 일관됩니다 — **주요 디자인 시스템의 공개 웹 문서(m3.material.io, carbondesignsystem.com, ant.design, atlassian.design, polaris-react.shopify.com 등)는 두 축을 교차한 렌더링 격자 표를 쓰지 않습니다.** 축마다 분리된 prose·데모·API 표로 다루는 것이 업계 표준입니다.

반면 이번에 학습한 원본 이미지처럼 **행×열 그리드에 실제 렌더링 결과를 채우고, 컴포넌트명 옆에 Figma 컴포넌트/Variant 아이콘 배지를 붙이는 방식은 Figma 컴포넌트 셋 캔버스 관행이 스크린샷/스펙 문서로 그대로 캡처된 결과**입니다. 따라서 `ds-transform`에서 매트릭스 표를 쓸 상황을 다음과 같이 좁혀 정의합니다.

- **디자이너·엔지니어에게 넘기는 내부 핸드오프 스펙 문서**(Figma에서 바로 파생되었거나, QA가 모든 조합을 검증해야 하는 상황)를 만들 때 → 매트릭스
- **외부에 공개하는 컴포넌트 라이브러리 문서 사이트**(Storybook, Zeroheight류)를 만들 때 → 아나토미 다이어그램 + prose + 축별 개별 예시 (17.1~17.4, 17.6~17.8의 실사례를 따름)
- 두 상황이 섞여 있다면(사내 핸드오프 문서를 나중에 공개 문서로 승격) 매트릭스를 1차 초안으로 쓰고, 공개 전 아나토미+prose로 재작성하는 2단계 프로세스를 권장합니다.

17.9까지는 폼 아톰(체크박스·버튼 등)을 다뤘습니다. 아래 17.10~17.13은 원자 카탈로그를 입력/표시·상태/피드백/내비게이션 4계열로 넓혀 검증한 결과이며, 17.14가 전체 종합 결론입니다.

### 17.10 Input 계열 (TextField / Textarea / Select / Switch)

- **TextField**: label + container + placeholder + leading/trailing icon + helper/error text + char counter가 공통 아나토미입니다. 축은 size(sm/md/lg)와 style입니다 — Material Design 3는 `filled`(배경 강조, 짧은 폼/다이얼로그) vs `outlined`(강조 약함, 긴 폼)를 핵심 스타일 축으로 두고, Atlassian은 `standard`/`subtle` appearance로 표현합니다. 상태는 default/focus/filled/error/disabled/read-only 공통에 Carbon만 warning/skeleton을 추가합니다.
- **Textarea**: 구현 계층이 두 갈래입니다 — Ant의 `Input.TextArea`(Input의 dot-namespace 자식, `autoSize={{minRows,maxRows}}` 추가)·Polaris의 `TextField multiline` prop처럼 **TextField에 종속**시키는 방식과, Carbon/Atlassian/Material처럼 **독립 컴포넌트**로 분리하는 방식. 고유 축은 resize(수직/수평), min/max rows(auto-grow), char limit.
- **Select/Dropdown**: 시스템 간 컴포넌트 분화가 가장 큰 영역입니다. Carbon은 `Select`(네이티브, 단일)/`Dropdown`(커스텀, 필터·정렬)/`ComboBox`(검색 입력 추가) 3분화, Polaris도 `Select`/`Combobox`/`Listbox`(옵션 메뉴를 독립 컴포넌트로 분리) 3분화, Material은 모두 `Menu`로 통합, Ant은 단일 `Select`에 `mode="multiple|tags"`·`showSearch` 축을 몰아넣습니다. 옵션은 Ant `Select.Option`처럼 네임스페이스 자식으로 노출되는 것이 대표 패턴입니다.
- **Switch/Toggle**: track + thumb(+optional icon/label) 아나토미. 축은 on/off × interaction, size, label 위치. **Checkbox와의 구분 지침이 5개 시스템 모두 일치** — Switch는 "즉시 적용되는 이진 상태(별도 제출 불필요)", Checkbox는 "제출·확인 단계가 있는 다중 선택". Carbon은 "toggle을 2개 초과 옵션에 쓰지 말라"고 명시. Polaris만 전용 Switch가 없어 Checkbox로 대체합니다.

### 17.11 표시·상태 계열 (Tag / Badge / Chip / Avatar / Progress)

- **Tag/Badge/Chip**: 명명이 시스템마다 크게 갈립니다 — Carbon은 라벨=`Tag`, Material은 통칭 `Chips`+카운트 `Badge`, Ant은 라벨 `Tag`+숫자 `Badge` 분리, Atlassian은 2026 개편으로 `Lozenge`(상태)/`Tag`(객체 라벨)/`Badge`(숫자) 3분할, Polaris는 사실상 `Badge` 하나로 통합. 상호작용 축을 가장 정교하게 명시하는 곳은 **Carbon Tag의 4변형**(read-only/dismissible/selectable/operational)입니다. `tone × style(filled/outlined/subtle)`이 명확한 2축이지만 — 뒤 17.14 참조 — 완전한 렌더 격자는 없습니다.
- **Avatar**: 이미지 → 폴백 이니셜 → 폴백 아이콘 3단 폴백 + 코너 프레즌스/상태 배지가 표준. Atlassian은 presence(온라인 여부)와 status(승인/거절 등)를 **별개 하위 컴포넌트**로 분리합니다. `AvatarGroup`은 대부분 별도 컴포넌트로, max 초과 시 "+N" 카운터 아바타를 규정 — 17.14의 "item vs group 분리" 패턴의 또 다른 사례입니다.
- **Progress/Spinner**: Carbon이 가장 체계적으로 `Progress bar`(선형)와 `Loading`(원형)을 분리하고 "5초 미만은 스피너, 예측 불가/장기는 progress bar"라는 선택 규칙까지 둡니다. 공통 축은 determinate/indeterminate, size, with-percentage, inline/block. Ant은 `type=line/circle/dashboard`로 나눕니다.

### 17.12 피드백 계열 (Alert / Toast / Tooltip)

- **Alert/Banner/Inline message**: 명명은 Ant `Alert`, Polaris `Banner`, Carbon `Notification`, Atlassian `SectionMessage`, Material `Banner`로 갈리지만, 아이콘 + 제목 + 본문 + 액션(옵션) + 닫기(옵션) 아나토미와 4~5단계 severity 축을 공유합니다. `severity × placement(inline/banner/toast)`가 명확한 2축이며, severity별로 접근성 live-region을 매핑(error/warning=assertive/`role=alert`, info/success=polite)하는 것이 공통 규칙입니다.
- **Toast/Snackbar(일시형)**: 텍스트 + 단일 액션(옵션) + 닫기. Material Snackbar는 최대 2줄 + 단일 액션만 허용. 축은 with-action 여부, 자동 소멸 타이밍(Polaris 기본 5000ms, 접근성 위해 최소 10000ms 권장), 위치, severity. 지속형(Banner)과의 차이("자동 소멸·최소 간섭" vs "사용자 액션으로만 dismiss·지속")를 모든 시스템이 명시적으로 대비시킵니다.
- **Tooltip/Popover**: 컨테이너 + caret/arrow + 콘텐츠. 축은 placement(top/right/bottom/left) × align(start/center/end), 트리거(hover/click/focus). Material은 `plain`(텍스트) vs `rich`(제목+설명+액션=사실상 popover), Carbon은 Tooltip(hover)/Popover(인터랙티브)/Toggletip(click) 3분할. **Ant Design의 Tooltip/Popover 문서가 12방향 placement를 중앙 요소 주위에 실제 렌더한 격자를 제공** — 이번 전체 리서치에서 확인된 유일한 실제 2축 렌더 매트릭스입니다.

### 17.13 내비게이션 계열 (Tabs / Breadcrumb / Pagination / Menu)

- **Tabs**: tab item(label + optional icon + optional badge) + tab list + active indicator + panel. 스타일 축은 Material `primary/secondary`, Carbon `line/contained`, Ant `line/card/editable-card`. 네임스페이스 패밀리는 Atlassian이 가장 명확(`Tabs`+`TabList`+`Tab`+`TabPanel` 각각 별도 문서), 반면 Ant/Polaris는 개별 Tab을 `items`/`tabs` 데이터 배열 객체로 취급합니다.
- **Breadcrumb**: page link 아이템 + separator + current-page 아이템 + overflow 메뉴. current(마지막) 아이템을 "비링크·비인터랙티브 텍스트"라는 별도 상태로 규정(Carbon)하는 것이 특징. Atlassian `Breadcrumbs`+`BreadcrumbsItem`, Ant은 `items` 배열로 전환(`Breadcrumb.Item` deprecated).
- **Pagination**: page number + prev/next + ellipsis + page-size selector(Select 내장) + item count 텍스트. Ant이 API가 가장 풍부(`showSizeChanger`/`showQuickJumper`/`simple`/`showTotal`), Polaris는 prev/next 중심 미니멀. 페이지 넘버 아이템을 독립 컴포넌트로 문서화하는 시스템은 없습니다(내부 렌더링 취급).
- **Menu/Dropdown menu**: menu item(container + label + leading icon + trailing shortcut/checkmark + submenu indicator + selection state) + section header + divider + submenu. Carbon은 아이템 상태를 7개(enabled/hover/focus/focus+hover/danger hover/danger hover+focus/disabled)까지 명시. `MenuItem`을 독립 컴포넌트로 분해하는 패턴(17.1의 ListItem 분해와 동형)은 Atlassian(`DropdownMenu`+`DropdownItem`+`DropdownItemGroup`)과 Carbon(`Menu`+`MenuItem`+`MenuItemDivider`+`MenuItemGroup`)이 대표적, Ant/Polaris는 `items` 데이터 배열 방식입니다.

### 17.14 전체 종합: 원자 카탈로그에서 반복되는 4가지 법칙

차트 텍스트부터 Input·Tag·Alert·Tabs까지 20여 개 원자·분자 컴포넌트를 검증한 결과, 시스템·컴포넌트를 가로질러 다음 4가지가 일관되게 반복됩니다.

1. **렌더 매트릭스는 예외, 아나토미+prose가 규칙**: 두 축이 명확한 컴포넌트(Tag의 tone×style, Alert의 severity×placement, Tooltip의 placement×align)조차 공개 문서는 거의 전부 "아나토미 다이어그램 + prose + 한 축(주로 tone/color) 렌더 갤러리"로 문서화합니다. 전체 리서치에서 확인된 **실제 2축 렌더 격자는 Ant Design Tooltip의 12방향 placement 그리드가 유일**했습니다. 이는 17.9 결론(매트릭스는 Figma 핸드오프 관행)을 원자 전 범위에서 재확인합니다.
2. **"아이템 vs 그룹"의 분리**: Radio/RadioGroup, Select/Option, Menu/MenuItem, Tabs/Tab, Breadcrumb/BreadcrumbItem, Avatar/AvatarGroup — 개별 아이템과 그 컨테이너(그룹)를 별도 컴포넌트/별도 문서로 나누는 것이 거의 모든 계열에서 반복됩니다. 그룹은 키보드 내비게이션·상호배타 동작·"+N 오버플로" 같은 고유 책임을 따로 갖기 때문입니다.
3. **네임스페이스 패밀리 vs 데이터 배열, 두 갈래**: 하위 파츠를 다루는 방식이 (a) 접두사/dot 네임스페이스 컴포넌트로 분해(Atlassian이 전 영역에서 가장 일관, Ant의 `Select.Option`·`Input.TextArea`)와 (b) `items`/`tabs`/`sections` 데이터 배열 객체로 취급(Ant·Polaris의 Tabs·Menu·Breadcrumb)으로 갈립니다. 이미지에서 학습한 `Chart`+`Value`/`Label`/`Legend`는 (a) 방식이며, shadcn/ui `Field`+`FieldLabel`/`FieldTitle`/`FieldDescription`이 가장 유사한 실사례입니다.
4. **상태(empty/loading/error)는 전역 패턴으로 위임**: 개별 컴포넌트 문서에 empty/loading/error를 다 넣지 않고, 시스템 전역 패턴 문서(Loading pattern, Empty states, Disabled states)에 정의한 뒤 링크로 참조하는 것이 지배적입니다. 예외적으로 Carbon만 컴포넌트별 `skeleton` 상태를 1급으로 문서화하는 경향이 강합니다.

`ds-transform`의 UI Archetype Reference와 Phase 4 규칙은 이 4가지 법칙을 반영합니다 — 특히 (2)(3)은 Phase 2(Atomic Mapping)에서 컴포넌트 후보를 "아이템/그룹"으로 쪼개고 네임스페이스를 부여하는 단계로, (4)는 Phase 4에서 상태를 개별 스펙에 중복 기술하지 않고 전역 패턴으로 링크하는 규칙으로 반영되어 있습니다.

## 18. 아이템 조합: 원자에서 컴포넌트, 컴포넌트에서 화면으로

17장이 개별 원자(아이템)의 스펙을 다뤘다면, 이 장은 그 원자들을 **조합(composition)** 해서 하나의 컴포넌트를 만들고, 그 컴포넌트들을 모아 웹 화면을 구성하는 계층을 다룹니다. 이 조합 계층은 6장의 Atomic Design(atom → molecule → organism → template → page)을 실제 스펙 시트 수준에서 구현하는 방식입니다.

### 18.1 조합 계층 모델

```text
atom(원자, 슬롯 단위)      title / description / meta / label / checkbox / icon
        ↓ compose
molecule(분자, 컴포넌트)    DataListItem  (원자들을 슬롯으로 조합)
        ↓ collect
organism(유기체, 컬렉션)    DataList      (DataListItem을 반복·정렬)
        ↓ place into layout
template(템플릿)           화면 골격에 컬렉션·컴포넌트를 배치
        ↓ fill content
page/screen(웹 화면)       실제 데이터가 채워진 최종 화면
```

핵심은 **"원자 → 컴포넌트 → 화면"의 각 단계가 상향식 조립**이라는 점입니다. 원자를 바꾸면 그 원자를 슬롯으로 쓰는 모든 컴포넌트와 화면이 함께 갱신됩니다(단일 정의, 다중 재사용).

### 18.2 슬롯(slot) 표기와 컴파운드 컴포넌트

레퍼런스 스펙(예: `DataList / DataListItem`)에서 `#title`, `#description`, `#meta`, `#label`처럼 `#` 접두사를 붙인 것은 **명명된 슬롯(named slot)** — 컴포넌트 내부의 "여기에 이런 역할의 콘텐츠가 들어간다"는 지정된 자리입니다. 점선 사각형(`⃞`)은 아직 채워지지 않은 빈 슬롯(예: 선택용 체크박스 자리)을 뜻합니다.

이 슬롯 조합을 코드로 구현하는 대표 패턴이 **컴파운드 컴포넌트(compound component)** 입니다.

- **부모-자식 암묵적 상태 공유**: 부모(`DataList`)가 공유 상태(선택 항목 등)를 관리하고, 자식(`DataListItem`, 그 안의 슬롯)은 각자의 렌더링만 담당합니다.
- **네이티브 HTML처럼 조립**: 긴 prop 목록 대신 `DataList.Item`, `DataList.Item.Title` 식으로 자식을 배치해 소비자가 자연스럽게 UI를 구성합니다.
- **구현 기술**: React children/compound 패턴, Radix UI의 `@radix-ui/react-slot`(`asChild`로 폴리모픽 렌더링), Web Components의 `<slot>`, React Aria의 slot prop 패턴이 모두 같은 아이디어입니다.

### 18.3 레이아웃 영역 = 정렬 변형

레퍼런스 이미지의 `left` / `right`는 **같은 `DataListItem`의 레이아웃(정렬) 변형**입니다 — 동일한 슬롯 세트(title/description/meta/label…)를 어느 쪽으로 정렬·배치하느냐만 다릅니다. 이는 17.14 법칙 1(축이 2개면 매트릭스가 아니라 아나토미+prose)과 연결됩니다: `DataListItem`은 "슬롯 구성 × 정렬 영역"이라는 두 축을 갖지만, 실제 스펙은 각 영역(region)에 슬롯을 배치한 **아나토미 다이어그램**으로 그리는 것이 자연스럽습니다. 이 이미지 자체가 그 아나토미 다이어그램의 전형입니다.

### 18.4 Composition over Configuration

성숙한 시스템일수록 "옵션이 20개 달린 거대한 단일 컴포넌트(configuration)"보다 "작은 원자를 슬롯으로 조립(composition)"하는 방향을 택합니다.

- **Atlassian Primitives**: `Box`, `Inline`, `Stack` 등 레이아웃 프리미티브 + 디자인 토큰으로 컴포넌트를 조립하도록 안내합니다("configuration이 아니라 composition"). 실제로 Atlassian은 전용 Card 컴포넌트 대신 프리미티브 조합을 권장합니다(17.4 참조).
- **Radix Primitives**: 접근성·동작만 제공하는 프리미티브 위에 `Slot`으로 콘텐츠를 조합하는 primitive-first 접근.
- **장점**: 슬롯은 "목적을 가진 영역(purposeful region)"이라, 같은 컴포넌트를 서로 다른 맥락(리치 콘텐츠 패널 vs 단순 폼)에서 재사용해도 파운데이션이 같아 일관성이 유지됩니다.

### 18.5 두 가지 조합 API (17.14 법칙 3의 재확인)

원자를 컴포넌트로 조합하는 API는 17.14에서 확인한 두 갈래가 그대로 반복됩니다.

| 방식 | 형태 | 대표 | 언제 |
| --- | --- | --- | --- |
| 컴파운드/네임스페이스 슬롯 | `<DataList.Item><Title/><Meta/></DataList.Item>` | Radix, Atlassian, shadcn/ui `Field` | 슬롯마다 독립 로직·자유 배치가 필요할 때 |
| 데이터 배열/설정 | `<DataList items={[{title, meta, label}]} />` | Ant `items`, Polaris `sections` | 항목이 균질하고 대량 반복될 때 |

`DataList/DataListItem`처럼 슬롯을 시각적으로 명시한 스펙은 전자(컴파운드/슬롯) 지향입니다.

### 18.6 ds-transform에의 반영

`ds-transform`의 5단계에 조합 계층을 명시적으로 넣었습니다.

- **Phase 2 (Atomic Mapping)**: 원자를 식별한 뒤, 반복적으로 함께 등장하는 원자 묶음을 **분자 컴포넌트 후보**(예: title+description+meta+label = `DataListItem`)로 승격하고, 각 원자를 **명명된 슬롯**으로 표기합니다.
- **Phase 4 (DS-Based Spec Rewrite)**: 분자 컴포넌트는 슬롯 아나토미 다이어그램 + 레이아웃 영역(정렬) 변형으로 기술하고, 조합 API(컴파운드 vs 데이터 배열)를 명시합니다.
- **화면 조립**: 최종 화면은 "컴포넌트 배치도(어떤 컴포넌트가 어느 영역에)"로 표현해, 원자 → 컴포넌트 → 화면의 추적성을 유지합니다.

실제 적용 예시는 `packages/ds-transform/examples/datalist-composition/`에 있습니다.

## 19. 화면 조립: 컴포넌트에서 페이지로

18장이 원자를 컴포넌트로 조합하는 단계였다면, 이 장은 그 컴포넌트들을 **레이아웃 위에 배치해 하나의 웹 화면(page)** 을 만드는 마지막 단계입니다. Atomic Design의 template → page 단계에 해당합니다.

### 19.1 레이아웃 그리드 (배치의 좌표계)

화면 조립의 토대는 **반응형 레이아웃 그리드**입니다.

- **IBM Carbon 2x Grid**: 16컬럼, 5개 기본 브레이크포인트, 8px mini-unit 기반. 컨테이너–행–컬럼 구조(Flexbox)로 정렬하며 기본 거터 32px.
- **Material Design 반응형 그리드**: 컬럼 폭은 고정값이 아니라 %로 정의(화면 크기에 유연), 거터는 브레이크포인트별 고정값. 브레이크포인트에서 레이아웃이 "적응(adapt)".
- **공통 원칙**: 컬럼(column) + 거터(gutter) + 마진(margin) + 브레이크포인트의 4요소로 좌표계를 정의하고, 컴포넌트는 이 그리드 위 컬럼 스팬(span)으로 폭을 지정합니다. 그리드 값도 토큰화 대상입니다(5장 참조).

### 19.2 앱 셸과 영역(region) 슬롯

페이지는 보통 **앱 셸(app shell)** — 헤더, 사이드 내비게이션, 콘텐츠 영역, 푸터 같은 최상위 영역(region)의 골격 — 위에 구성됩니다. 이것은 18장의 슬롯 개념을 **화면 레벨로 확장**한 것입니다: 컴포넌트에 `#title`·`#meta` 슬롯이 있었듯, 페이지 템플릿에는 `header`·`nav`·`main`·`aside`·`footer` 영역 슬롯이 있습니다.

- **Atlassian `Page layout`**: banner/top-nav/left-sidebar/main/right-sidebar/aside 같은 영역을 슬롯으로 제공.
- **Esri Calcite `Shell` / `Shell Panel`**: 셸이 헤더·콘텐츠 영역을 정의하고, 셸 패널이 접이식 사이드 영역(필터·범례·보조 콘텐츠)을 담당.

### 19.3 캐노니컬 레이아웃 (검증된 페이지 골격)

매번 레이아웃을 새로 짜는 대신, 검증된 페이지 골격을 재사용합니다. Material Design 3의 **canonical layouts** 3종이 대표적입니다.

| 레이아웃 | 구조 | 쓰임 |
| --- | --- | --- |
| List-detail | 좌: 항목 리스트 / 우: 선택 항목 상세 | 탐색형 목록 + 상세 (메일, 설정) |
| Supporting pane | 주 영역(대부분) + 보조 영역 | 본문 + 보조 정보/도구 |
| Feed | 그리드 컴포지션 | 카드형 콘텐츠 탐색 (뉴스, 소셜) |

각 레이아웃은 compact/medium/expanded 브레이크포인트별 구성을 함께 정의합니다 — 즉 "반응형 동작까지 포함한 페이지 템플릿"입니다.

### 19.4 화면 조립의 3단계

1. **템플릿 선택**: 화면의 정보 구조에 맞는 캐노니컬 레이아웃(또는 앱 셸 영역 구성)을 고릅니다.
2. **컴포넌트 배치도 작성**: 어떤 컴포넌트(18장에서 만든 `DataList` 등)를 어느 영역·컬럼 스팬에 놓을지 지정합니다. 이 배치도가 원자→컴포넌트→화면의 추적성을 잇는 핵심 산출물입니다.
3. **반응형 규칙 명시**: 브레이크포인트별로 영역이 어떻게 재배치/접힘/스택되는지(예: medium 이하에서 사이드바 → 상단 접이식)를 규정합니다.

### 19.5 전체 계층 요약

```text
token          색·간격·타이포 등 원시 결정 (5장)
  ↓
atom(slot)     title / label / checkbox / icon (17장)
  ↓ compose
molecule       DataListItem — 원자 슬롯 조합 (18장)
  ↓ collect
organism       DataList — 컴포넌트 컬렉션 (18장)
  ↓ place on grid + region
template       캐노니컬 레이아웃 / 앱 셸 영역 (19장)
  ↓ fill content + responsive rules
page/screen    최종 웹 화면 (19장)
```

`ds-transform`은 이 전체 계층을 커버합니다 — Phase 2에서 원자·분자를, Phase 4에서 컴포넌트 스펙과 **화면 조립(템플릿 선택 + 컴포넌트 배치도 + 반응형 규칙)** 까지 산출하도록 확장되었습니다.

## 20. 고차원 진화: 차세대 디자인 시스템 방향

1~19장이 "디자인 시스템을 어떻게 기획·설계·조립하는가"였다면, 이 장은 2025~2026년 기준 **디자인 시스템이 다음으로 진화하는 4가지 방향**을 다룹니다. 특히 20.1(AI 네이티브)은 이 저장소(AI 워크플로우 킷)와 `ds-transform` 도구에 직접 반영했습니다.

### 20.1 AI 네이티브 / 에이전틱 디자인 시스템

디자인 시스템이 사람뿐 아니라 **AI 에이전트가 소비하는 "컨텍스트 엔진(context engine)"** 으로 재정의되고 있습니다(Atlassian, "Design System: Building the context engine for the AI era").

- **머신 리더블 레이어**: 전통적 파운데이션/토큰/컴포넌트 위에 컨텍스트 레이어를 얹어, 컴포넌트·토큰·사용 규칙·접근성을 구조화된 형식으로 노출합니다. Atlassian은 이를 **ADS MCP 서버 + 구조화 콘텐츠 모델 + 코드 생성 템플릿 + ADS 스킬 + 이식 가능한 `DESIGN.md`** 로 구현합니다. `DESIGN.md`는 앞부분=기계 판독(토큰 나열), 뒷부분=인간/에이전트 판독(근거·규칙)으로 나뉩니다.
- **포맷 역할 분담 (핵심 실증)**: Indeed 벤치마크 결과 **구조화된 컴포넌트 메타데이터는 JSON, 자연어 규칙은 Markdown**이 최적 — JSON이 하이브리드 대비 동등·우수한 정확도를 약 80% 적은 토큰으로 달성(비용 약 5배 절감). "구조는 JSON, 규칙은 Markdown."
- **에이전트 UI 생성의 3층위**: (1) 정적(AI가 값만 채움), (2) 선언적(승인된 컴포넌트 레지스트리가 가드레일), (3) 완전 생성(원시 HTML/CSS). 완전 생성은 **컴포넌트 환각**(없는 컴포넌트/props 생성)·접근성·일관성 문제로, 실무는 **화이트리스트 제약 기반 선언적 생성**으로 수렴합니다.
- **개발 도구 MCP**: Figma Dev Mode MCP 서버(2025.6 베타 — 파일 구조·레이아웃·토큰을 MCP로 노출), shadcn MCP 서버(2025.8 CLI 3.0 — 실제 props·variants로 정확한 생성)가 대표적. MCP는 "컴포넌트 존재·조합 규칙·유효 props·토큰·비협상 접근성 규칙"을 시맨틱 메타데이터로 인코딩합니다.
- **결론**: AI는 대체가 아니라 가속기이며, **잘 거버넌스된 디자인 시스템이 AI 코드 생성의 가드레일**이 될 때만 일관성·접근성이 확보됩니다("제약은 영속, 생성물은 소모품").
- **이 저장소의 실행 구현**: `ds-transform`이 Phase 6에서 산출하는 머신 리더블 스펙(JSON)을, 의존성 없는 MCP stdio 서버 [`packages/ds-transform/plugins/ds-catalog-mcp/`](../packages/ds-transform/plugins/ds-catalog-mcp/)가 `list_components`·`get_component_spec`·`search_components` 툴로 노출합니다 — 에이전트가 UI를 생성하기 전에 실제 컴포넌트·슬롯·variant를 조회해 컴포넌트 환각을 막는 구조를 실제 실행 가능한 형태로 제공합니다.

### 20.2 토큰 파이프라인·멀티브랜드 심화

- **DTCG 표준 성숙**: W3C DTCG가 2025.10에 첫 안정판(Design Tokens Format Module 2025.10)을 발표 — JSON 기반, 미디어타입 `application/design-tokens+json`, 14개 색공간·멀티파일·테마 정식 지원. Adobe·Google·Microsoft·Figma 등 참여. **Style Dictionary v4**가 DTCG 1급 지원, v5에서 2025.10 대응 진행 중. Terrazzo(구 Cobalt)가 MIT DTCG 네이티브 대안.
- **멀티브랜드 3-tier 테마**: reference(원시값) → semantic/system(`color.text.brand`) → component(`button.background`)로 나누고, **브랜드 룩앤필을 컴포넌트에서 분리된 테마 레이어**에 둡니다. 공유 코어 컴포넌트 위로 여러 브랜드/모드(light·dark·high-contrast)를 흘려보내며, 런타임 전환은 CSS custom properties + 시맨틱 레이어 리매핑으로 구현합니다.
- **토큰을 API처럼 거버넌스**: CI로 검증·시맨틱 버저닝·changelog, 디자인/코드 토큰명 일치, 주기적 audit으로 중복·미사용 토큰 정리, drift detection으로 디자인-코드 동기화.
- **고급 컬러**: **OKLCH**가 표준 색공간으로 부상 — 인지 명도를 선형 추적해 예측 가능한 스케일과 **대비 안전(contrast-safe)** 팔레트 생성이 가능. Radix v3·Tailwind v4가 Display P3+OKLCH로 전환. Material dynamic color식 자동 tonal 팔레트 생성에도 적합.

### 20.3 DesignOps와 헬스 메트릭

- **헬스 메트릭**: 최상위 지표는 **커버리지**(전체 UI 대비 DS 컴포넌트 사용 %) — 프로덕션 HTML에 `data-*`를 심어 렌더 노드 기준으로 산출(Mews). 그 외 채택률, 컴포넌트 사용 빈도, **detached/overridden 인스턴스**(유스케이스 갭 신호), 폐기 부채, 기여율, time-to-adopt. 도구: Omlet(코드 레벨 애널리틱스), Figma Library Analytics(2025.2부터 변수·스타일 사용량 확장), Supernova, zeroheight.
- **제품으로서의 디자인 시스템**: 로드맵·메트릭·내부 사용자층을 갖고 DesignOps PO가 운영. 지원 모델(오피스아워·릴리스 케이던스·Slack·SLA), 4개 하위기능(Governance/Infrastructure/Intelligence). 중앙집중→연합형으로 이동하되, "담당자를 기존 업무에서 해방시키지 않은 연합형"의 정체 위험(Nathan Curtis) 유의.
- **자동화 품질 게이트**: 토큰/컴포넌트 린팅(Atlassian `@atlassian/eslint-plugin-design-system`, Stylelint), fixer(지속 강제) vs codemod(대규모 일회성 마이그레이션 — 2,500+파일을 수 분 내 변환), CI에 시각 회귀(Chromatic)+접근성(axe) 통합, Figma 내 디자인 린팅.
- **ROI**: 시간 절감→비용 환산이 근거. 디자인 효율 +38%·개발 +31%, Carbon 실험서 폼 구축 47% 단축, 제품팀은 개발 사이클의 34%를 기존 컴포넌트 재제작에 소모.

### 20.4 차세대 아키텍처

- **Web Components 부활**: Shopify가 2025.10 **Polaris를 Web Components로 GA**(Admin/Checkout/POS 통합, CDN 자동 업데이트, React/Vue/바닐라 어디서든). IBM Carbon Web Components(Lit), Microsoft Fluent(FAST), Web Awesome(구 Shoelace) 확산. **Declarative Shadow DOM**으로 JS 없는 SSR 개선(단 스타일링·타이핑은 미완).
- **헤드리스 프리미티브 + 스타일 레이어 분리**: 동작·접근성(Radix, React Aria, Base UI, Ark UI) ↔ 스타일(Tailwind, Panda CSS, vanilla-extract)을 분리. **shadcn/ui copy-paste 레지스트리**(Registry 2.0, Universal Registry Items)로 npm 설치 없이 코드를 소유하는 배포 모델이 부상.
- **크로스플랫폼**: 토큰 주도 일관성 — DTCG + Style Dictionary/Terrazzo로 웹·iOS·Android·RN에 동일 토큰 배포.
- **모던 CSS**: `@layer`(스페시피시티 전쟁 종식), 컨테이너 쿼리(부모 기준 모듈형), `:has()`(관계 선택), 네이티브 중첩, `light-dark()`로 "self-aware" 컴포넌트. 배포는 npm / copy-paste 레지스트리 / CDN 세 갈래, 버저닝은 Changesets가 사실상 표준.

### 20.5 성숙도 다음 단계: 진화 로드맵

2장의 성숙도 모델을 넘어, 위 4방향을 조직의 다음 성숙 단계로 배치하면:

| 현재 상태 | 다음 진화 | 대표 지표/산출물 |
| --- | --- | --- |
| 컴포넌트 라이브러리 존재 | 토큰을 API로 거버넌스 (20.2) | DTCG 파이프라인, 토큰 버저닝 |
| 수동 채택 | 헬스 메트릭·자동 게이트 (20.3) | 커버리지 대시보드, CI 린트 |
| 프레임워크 종속 | 프레임워크 독립·헤드리스 (20.4) | Web Components / 레지스트리 |
| 사람만 소비 | AI 에이전트가 소비 (20.1) | 머신 리더블 스펙, MCP, DESIGN.md |

이 저장소의 `ds-transform`은 20.1 방향을 실제로 구현합니다 — as-is 기획을 사람용 스펙뿐 아니라 **에이전트가 소비 가능한 머신 리더블 컴포넌트 스펙(JSON)** 으로도 산출하도록 확장했습니다(아래 참조).

## 21. 출처

### 기획·전략, 성숙도, 거버넌스, 팀 모델
- [Planning a Design System Generation – Nathan Curtis](https://medium.com/@nathanacurtis/planning-a-design-system-generation-ce4120393557)
- [Team Models for Scaling a Design System – EightShapes](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)
- [The Fallacy of Federated Design Systems – Nathan Curtis](https://medium.com/@nathanacurtis/the-fallacy-of-federated-design-systems-23b9a9a05542)
- [Consolidating Design Systems – EightShapes](https://medium.com/eightshapes-llc/consolidating-design-systems-6bb7ce72f393)
- [Design System Tiers – EightShapes](https://medium.com/eightshapes-llc/design-system-tiers-2c827b67eae1)
- [Design System Maturity Model – Sparkbox](https://sparkbox.com/foundry/design_system_maturity_model)
- [Design System Maturity Model Assessment – Sparkbox](https://sparkbox.com/foundry/design_system_maturity_model_assessment_design_system_evolution)
- [Design System ROI – Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)
- [Carbon Design System RFCs](https://github.com/carbon-design-system/rfcs)
- [Carbon CONTRIBUTING.md](https://github.com/carbon-design-system/carbon/blob/main/.github/CONTRIBUTING.md)
- [Uplifting Shopify Polaris](https://medium.com/shopify-ux/uplifting-shopify-polaris-7c54fc6564d9)
- [The Salesforce Team Model for Scaling a Design System](https://medium.com/salesforce-ux/the-salesforce-team-model-for-scaling-a-design-system-d89c2a2d404b)
- [Atlassian Design System Values & Principles](https://atlassian.design/resources/atlassian-design-system-values-principles)
- [Co-creating our Atlassian Design System Values and Principles](https://medium.com/designing-atlassian/co-creating-our-atlassian-design-system-values-and-principles-2547a0981923)
- [Building a Visual Language – Airbnb Design](https://medium.com/airbnb-design/building-a-visual-language-behind-the-scenes-of-our-airbnb-design-system-224748775e4e)
- [Design System Governance Models – UX Planet](https://uxplanet.org/design-system-governance-models-f66a97367ad5)

### 토큰, 아키텍처, 문서화, 접근성
- [Naming Tokens in Design Systems – Nathan Curtis](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676)
- [Design Tokens specification reaches first stable version – W3C DTCG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [Design Tokens Format Module – designtokens.org](https://www.designtokens.org/tr/drafts/format/)
- [Atomic Design Methodology – Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
- [Component checklist – Carbon Design System](https://carbondesignsystem.com/contributing/component-checklist/)
- [4 ways to document your design system with Storybook](https://storybook.js.org/blog/4-ways-to-document-your-design-system-with-storybook/)
- [Accessibility strategy – GOV.UK Design System](https://design-system.service.gov.uk/accessibility/accessibility-strategy/)
- [Collection accessibility tests – USWDS](https://designsystem.digital.gov/components/collection/accessibility-tests/)
- [axe-core – Deque](https://www.deque.com/axe/axe-core/)

### 엔지니어링, 핸드오프, 테스트, 채택
- [Monorepo Tools Compared](https://www.pkgpulse.com/blog/monorepo-tools-compared)
- [Framework-Agnostic Design Systems – Piccalilli](https://piccalil.li/blog/framework-agnostic-design-systems-part-1/)
- [Versioning Design Systems Best Practices](https://intodesignsystems.medium.com/versioning-design-systems-best-practices-ca8508653480)
- [Changesets](https://github.com/changesets/changesets)
- [Understanding Figma Variables and Design Tokens – Supernova](https://www.supernova.io/blog/understanding-the-differences-between-figma-variables-and-design-tokens)
- [Deep Dive: Visual Regression Testing](https://www.desplega.ai/blog/deep-dive-7-visual-regression-testing-ui-bugs)
- [Chromatic + Playwright](https://www.chromatic.com/playwright)
- [Shopify Design System – Shopify Partners](https://www.shopify.com/partners/blog/design-system)
- [Creating Coherence – Spotify Design](https://www.figma.com/blog/creating-coherence-how-spotifys-design-system-goes-beyond-platforms/)
- [Introducing Lottie – Airbnb Engineering](https://medium.com/airbnb-engineering/introducing-lottie-4ff4a0afac0e)
- [How We Measure Adoption of a Design System – Productboard](https://www.productboard.com/blog/how-we-measure-adoption-of-a-design-system-at-productboard/)

### 글로벌·국내 사례, 실패 패턴
- [Atlassian Design System – Contribution](https://atlassian.design/contribution)
- [Carbon Design System – Lessons Learned](https://medium.com/carbondesign/the-power-to-serve-fb84387deef8)
- [GOV.UK 접근성 전략](https://accessibility.blog.gov.uk/2023/01/06/a-new-accessibility-strategy-for-the-gov-uk-design-system/)
- [Ant Design – Design Values](https://ant.design/docs/spec/values/)
- [Adobe Spectrum – 토큰·거버넌스 인터뷰](https://www.knapsack.cloud/blog/garth-braithwaite-on-design-tokens-governance-and-scaling-spectrum-at-adobe)
- [Fluent 2 Design System – Design principles](https://fluent2.microsoft.design/design-principles)
- [토스 테크 – 디자인 시스템 다시 생각해보기](https://toss.tech/article/rethinking-design-system)
- [토스 테크 – 7년만의 컬러 시스템 업데이트](https://toss.tech/article/tds-color-system-update)
- [카카오스타일 devblog – 디자인 시스템 재구축기](https://devblog.kakaostyle.com/ko/2024-12-13-1-rebuilding-frontend-design-system/)
- [카카오뱅크 – Figma 도입 사례](https://www.figma.com/customers/kakaobank-faster-design-delivery-with-figma/)
- [우아한형제들 techblog – 셀프서비스 디자인시스템 #1](https://techblog.woowahan.com/6305/)
- [NAVER Pay Dev Blog – deFign](https://medium.com/naverfinancial/defign-%EB%84%A4%EC%9D%B4%EB%B2%84%ED%8C%8C%EC%9D%B4%EB%82%B8%EC%85%9C%EC%9D%98-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%9D%84-%EC%A0%95%EC%9D%98%ED%95%98%EB%8B%A4-7b7449832f26)
- [LY Corp Tech Blog – 3단계 토큰 디자인 시스템](https://techblog.lycorp.co.jp/ko/a-flexible-design-system-using-3-tier-tokens)
- [쿠팡 엔지니어링 – 쿠팡의 디자인 시스템을 소개합니다](https://medium.com/coupang-engineering/introducing-coupangs-design-system-baeb117949f1)
- [당근 블로그 – 당근 프로덕트 디자이너를 소개합니다](https://about.daangn.com/blog/archive/%EB%8B%B9%EA%B7%BC%EB%A7%88%EC%BC%93-%ED%94%84%EB%A1%9C%EB%8D%95%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88-%EC%B1%84%EC%9A%A9-%EB%8B%B9%ED%94%84%EC%86%8C/)
- [인프랩 tech – 오픈소스 기반 디자인시스템 구축 회고](https://tech.inflab.com/20240224-design-system/)
- [플립커뮤니케이션즈 – 디자인 시스템이 현장에서 무너지는 이유](https://blog.pulip.com/%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%9D%84-%EB%8F%84%EC%9E%85%ED%96%88%EC%A7%80%EB%A7%8C-%EC%99%9C-%ED%98%84%EC%9E%A5%EC%97%90%EC%84%9C-%EB%AC%B4%EB%84%88%EC%A7%80%EB%8A%94/)
- [Design System Pitfalls and Best Practices – neue.world](https://www.neue.world/learn/design-system/design-system-pitfalls-and-best-practices)

### 아이템 단위 스펙, 배리언트 매트릭스, 차트 컴포넌트
- [Create and use variants – Figma Learn](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants)
- [Component matrix – Orange Design System](https://system.design.orange.com/0c1af118d/p/65825e-component-matrix)
- [Component Variants in Design Systems: Naming, Organization, and Scale – Sigma Collection](https://www.thesigma.co/journal/component-variants-design-system)
- [Chart – shadcn/ui (ChartLegend, ChartLegendContent)](https://ui.shadcn.com/docs/components/radix/chart)
- [Legends – PatternFly Charts (ChartLegend standalone usage)](https://www.patternfly.org/charts/legends/)
- [Charts – Pajamas Design System (GitLab)](https://design.gitlab.com/data-visualization/charts/)
- [Simple charts – Carbon Design System](https://carbondesignsystem.com/data-visualization/simple-charts/)
- [Color usage – Carbon Design System](https://carbondesignsystem.com/elements/color/usage/)

### List / ListItem 아이템 스펙
- [Lists – Material Design 3 (Guidelines)](https://m3.material.io/components/lists/guidelines)
- [Lists – Material Design 3 (Specs)](https://m3.material.io/components/lists/specs)
- [List – Carbon Design System](https://carbondesignsystem.com/components/list/usage/)
- [Structured list – Carbon Design System](https://carbondesignsystem.com/components/structured-list/usage/)
- [Resource list / Resource item – Shopify Polaris React](https://polaris-react.shopify.com/components/lists/resource-list)
- [List – Ant Design](https://ant.design/components/list/)
- [React List component – Material UI (MUI)](https://mui.com/material-ui/react-list/)
- [LedgerHQ/ledger-live PR #13701 (ListItemLeading/Trailing 컴포지션)](https://github.com/LedgerHQ/ledger-live/pull/13701)
- [Summary list – GOV.UK Design System](https://design-system.service.gov.uk/components/summary-list/)

### Detail / 속성표(Description) 아이템 스펙
- [Descriptions – Ant Design](https://ant.design/components/descriptions/)
- [Structured list – Carbon Design System](https://carbondesignsystem.com/components/structured-list/usage/)
- [Description list – Shopify Polaris React](https://polaris-react.shopify.com/components/lists/description-list)
- [Summary list – GOV.UK Design System](https://design-system.service.gov.uk/components/summary-list/)
- [Check answers pattern – GOV.UK Design System](https://design-system.service.gov.uk/patterns/check-answers/)
- [Canonical layouts (list-detail) – Material Design 3](https://m3.material.io/foundations/layout/canonical-layouts/list-detail/)

### Search 아이템 스펙
- [Search – Material Design 3](https://m3.material.io/components/search/specs)
- [Search – Carbon Design System](https://carbondesignsystem.com/components/search/usage/)
- [Filtering pattern – Carbon Design System](https://carbondesignsystem.com/patterns/filtering/)
- [Search component – USWDS](https://designsystem.digital.gov/components/search/)
- [Search – MOJ Design System](https://design-patterns.service.justice.gov.uk/components/search/)
- [Text filter – Cloudscape Design System](https://cloudscape.design/components/text-filter/)
- [Filtering patterns – Cloudscape Design System](https://cloudscape.design/patterns/general/filter-patterns/)
- [Empty states – Cloudscape Design System](https://cloudscape.design/patterns/general/empty-states/)
- [The Anatomy of a Search-Results Page – NN/g](https://www.nngroup.com/articles/anatomy-search-results-page/)

### Card 아이템 스펙
- [Cards – Material Design 3 (Specs)](https://m3.material.io/components/cards/specs)
- [Tile – Carbon Design System](https://carbondesignsystem.com/components/tile/usage/)
- [Card – Shopify Polaris React](https://polaris-react.shopify.com/components/layout-and-structure/card)
- [Card – Ant Design](https://ant.design/components/card/)
- [Atlassian Design System – Components overview](https://atlassian.design/components)

### Checkbox / Radio 아이템 스펙
- [Checkbox – Material Design 3](https://m3.material.io/components/checkbox/guidelines)
- [Radio button – Material Design 3](https://m3.material.io/components/radio-button/guidelines)
- [Checkbox – Carbon Design System](https://carbondesignsystem.com/components/checkbox/usage/)
- [Radio button – Carbon Design System](https://carbondesignsystem.com/components/radio-button/usage/)
- [Checkbox – Ant Design](https://ant.design/components/checkbox/)
- [Radio – Ant Design](https://ant.design/components/radio/)
- [Checkbox – Atlassian Design](https://atlassian.design/components/checkbox)
- [Radio group – Atlassian Design](https://atlassian.design/components/radio/radio-group)
- [Checkbox – Shopify Polaris React](https://polaris-react.shopify.com/components/selection-and-input/checkbox)

### Button 아이템 스펙
- [Buttons – Material Design 3](https://m3.material.io/components/buttons/guidelines)
- [Button – Carbon Design System](https://carbondesignsystem.com/components/button/usage/)
- [Button – Ant Design](https://ant.design/components/button/)
- [Button – Shopify Polaris React](https://polaris-react.shopify.com/components/actions/button)
- [Button – Atlassian Design](https://atlassian.design/components/button)
- [Icon button – Atlassian Design](https://atlassian.design/components/button/icon-button)

### Label / Description / Title 아이템 스펙
- [Text fields – Material Design 3](https://m3.material.io/components/text-fields/guidelines)
- [Typography type scale – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
- [Form – Carbon Design System](https://carbondesignsystem.com/components/form/usage/)
- [Typography type sets – Carbon Design System](https://v11.carbondesignsystem.com/guidelines/typography/type-sets)
- [Form – Ant Design](https://ant.design/components/form/)
- [Forms patterns – Atlassian Design](https://atlassian.design/patterns/forms/)
- [Text input – GOV.UK Design System](https://design-system.service.gov.uk/components/text-input/)
- [Field – shadcn/ui](https://ui.shadcn.com/docs/components/radix/field)

### Input 계열 아이템 스펙
- [Text fields – Material Design 3](https://m3.material.io/components/text-fields/overview)
- [Menus – Material Design 3](https://m3.material.io/components/menus)
- [Switch – Material Design 3](https://m3.material.io/components/switch/guidelines)
- [Text input – Carbon Design System](https://carbondesignsystem.com/components/text-input/usage/)
- [Dropdown – Carbon Design System](https://carbondesignsystem.com/components/dropdown/usage/)
- [Toggle – Carbon Design System](https://carbondesignsystem.com/components/toggle/usage/)
- [Input – Ant Design](https://ant.design/components/input/)
- [Select – Ant Design](https://ant.design/components/select/)
- [Text field – Shopify Polaris React](https://polaris-react.shopify.com/components/selection-and-input/text-field)
- [Combobox – Shopify Polaris React](https://polaris-react.shopify.com/components/selection-and-input/combobox)

### 표시·상태 계열 아이템 스펙
- [Tag – Carbon Design System](https://carbondesignsystem.com/components/tag/usage/)
- [Chips – Material Design 3](https://m3.material.io/components/chips/guidelines)
- [Tag – Ant Design](https://ant.design/components/tag/)
- [Badge – Ant Design](https://ant.design/components/badge/)
- [Lozenge – Atlassian Design](https://atlassian.design/components/lozenge)
- [Avatar – Atlassian Design](https://atlassian.design/components/avatar/)
- [Avatar group – Atlassian Design](https://atlassian.design/components/avatar-group)
- [Progress bar – Carbon Design System](https://carbondesignsystem.com/components/progress-bar/usage/)
- [Progress indicators – Material Design 3](https://m3.material.io/components/progress-indicators/guidelines)

### 피드백 계열 아이템 스펙
- [Notification – Carbon Design System](https://carbondesignsystem.com/components/notification/usage/)
- [Snackbar – Material Design 3](https://m3.material.io/components/snackbar/guidelines)
- [Tooltips – Material Design 3](https://m3.material.io/components/tooltips/guidelines)
- [Alert – Ant Design](https://ant.design/components/alert/)
- [Tooltip – Ant Design](https://ant.design/components/tooltip/)
- [Popover – Ant Design](https://ant.design/components/popover/)
- [Banner – Shopify Polaris React](https://polaris-react.shopify.com/components/feedback-indicators/banner)
- [Section message – Atlassian Design](https://atlassian.design/components/section-message/)

### 내비게이션 계열 아이템 스펙
- [Tabs – Material Design 3](https://m3.material.io/components/tabs/guidelines)
- [Menus (specs) – Material Design 3](https://m3.material.io/components/menus/specs)
- [Tabs – Carbon Design System](https://carbondesignsystem.com/components/tabs/usage/)
- [Breadcrumb – Carbon Design System](https://carbondesignsystem.com/components/breadcrumb/usage/)
- [Menu – Carbon Design System](https://carbondesignsystem.com/components/menu/usage/)
- [Pagination – Ant Design](https://ant.design/components/pagination/)
- [Tabs – Atlassian Design](https://atlassian.design/components/tabs)
- [Dropdown menu – Atlassian Design](https://atlassian.design/components/dropdown-menu)
- [Action list – Shopify Polaris React](https://polaris-react.shopify.com/components/lists/action-list)

### 아이템 조합 (composition / slots / compound components)
- [Atomic Design – Chapter 2 (Brad Frost)](https://atomicdesign.bradfrost.com/chapter-2/)
- [Compound Pattern – patterns.dev](https://www.patterns.dev/react/compound-pattern/)
- [Slot-Based APIs in React – DEV](https://dev.to/talissoncosta/slot-based-apis-in-react-designing-flexible-and-composable-components-7pj)
- [Composition – Atlassian Design](https://atlassian.design/get-started/develop/composition/)
- [Primitives – Atlassian Design](https://atlassian.design/components/primitives/overview)
- [Component Composition Pattern – Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [The Compound Components Pattern in React – freeCodeCamp](https://www.freecodecamp.org/news/compound-components-pattern-in-react/)

### 화면 조립 (layout grid / templates / canonical layouts)
- [2x Grid – Carbon Design System](https://carbondesignsystem.com/elements/2x-grid/overview/)
- [Responsive layout grid – Material Design](https://m2.material.io/design/layout/responsive-layout-grid.html)
- [Canonical layouts – Material Design 3](https://m3.material.io/foundations/adaptive-design/canonical-layouts)
- [Layout overview – Material Design 3](https://m3.material.io/foundations/layout/layout-overview/overview)
- [Page layout – Atlassian Design](https://atlassian.design/components/page-layout/)
- [Layout patterns – Calcite Design System (Esri)](https://developers.arcgis.com/calcite-design-system/foundations/layouts/)
- [Layout – Cloudscape Design System](https://cloudscape.design/foundation/visual-foundation/layout/)
- [Layout grid – USWDS](https://designsystem.digital.gov/utilities/layout-grid/)

### 고차원 진화: AI 네이티브
- [Design System: Building the context engine for the AI era – Atlassian](https://www.atlassian.com/blog/ai-at-work/atlassian-design-system-building-the-context-engine-for-the-ai-era)
- [Atlassian's DESIGN.md is here – Atlassian](https://www.atlassian.com/blog/ai-at-work/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice)
- [Machine-readable design systems – Design Systems Collective](https://www.designsystemscollective.com/machine-readable-design-systems-designing-for-ai-as-a-user-28077c9f2144)
- [shadcn MCP server](https://ui.shadcn.com/docs/mcp)
- [Figma MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)
- [The three kinds of generative UI – CopilotKit](https://www.copilotkit.ai/blog/the-three-kinds-of-generative-ui)

### 고차원 진화: 토큰 파이프라인·멀티브랜드
- [Design Tokens spec first stable version – W3C DTCG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [Style Dictionary DTCG support](https://styledictionary.com/info/dtcg/)
- [Terrazzo tokens](https://terrazzo.app/docs/tokens/)
- [The many faces of themeable design systems – Brad Frost](https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/)
- [OKLCH in CSS: why quit RGB/HSL – Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)

### 고차원 진화: DesignOps·헬스 메트릭
- [Design system adoption metric – Mews](https://developers.mews.com/design-system-adoption-metric-building/)
- [Design systems 104: making metrics matter – Figma](https://www.figma.com/blog/design-systems-104-making-metrics-matter/)
- [How leaders measure design system adoption – Omlet](https://omlet.dev/blog/how-leaders-measure-design-system-adoption/)
- [Ensure design token usage (ESLint) – Atlassian](https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage/)
- [ROI of design systems – Netguru](https://www.netguru.com/blog/roi-design-systems)

### 고차원 진화: 차세대 아키텍처
- [Polaris unified and for the web – Shopify](https://www.shopify.com/partners/blog/polaris-unified-and-for-the-web)
- [Lit SSR overview](https://lit.dev/docs/ssr/overview/)
- [shadcn registry – getting started](https://ui.shadcn.com/docs/registry/getting-started)
- [Panda CSS](https://panda-css.com/docs/overview/getting-started)
- [CSS cascade layers – MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers)
- [Changesets](https://github.com/changesets/changesets)
