# 디자인 시스템 기획 및 개발 방법론

웹 검색을 통해 수집한 디자인 시스템(Design System)의 기획·전략, 아키텍처, 엔지니어링, 국내외 사례를 정리한 리서치 노트입니다. Nathan Curtis(EightShapes), Brad Frost(Atomic Design), Sparkbox 등 업계에서 널리 참조되는 방법론과, Material Design 3 · Atlassian · Shopify Polaris · IBM Carbon · GOV.UK Design System 같은 실제 시스템의 공개 사례, 그리고 토스 · 카카오 · 배달의민족 · 네이버 · LINE · 쿠팡 · 당근마켓 · 인프랩 등 국내 사례를 함께 다룹니다.

이 문서는 코드가 아닌 지식 정리 자료이며, 팀에서 디자인 시스템을 새로 기획하거나 기존 시스템을 진단할 때 체크리스트로 활용하는 것을 목표로 합니다.

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
17. [출처](#17-출처)

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

## 17. 출처

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
