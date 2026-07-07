# Screenshot Sitemap 사용 가이드 (한국어)

폴더 안에 무작위로 모아둔 웹사이트/앱 스크린샷들을 depth(깊이)가 맞춰진
사이트맵 트리로 재구성하고, 최신 웹트렌드·UI/UX 패턴 기준으로 진단하는
워크플로우입니다. PPT로 녹화한 웹/앱 테스트 영상도 입력으로 받아 1~2초
간격으로 프레임을 추출하고 중복 화면은 제거한 뒤 스크린샷과 동일하게
분석합니다. 페이지별 HTML 속성/태그가 정리된 문서를 함께 주면, 비주얼
디자인과 마크업 품질을 교차 검증한 컨설팅 리포트까지 생성합니다.

## 언제 쓰나

- 스크린샷들이 크롤링 순서, URL, 파일명 규칙 없이 무작위로 저장되어 있을 때
- "이 화면들 depth 맞춰서 트리로 정리해줘" 같은 요청이 있을 때
- 사이트 구조(IA)를 스크린샷만 보고 역으로 추론해야 할 때
- 화면들이 최신 트렌드/신기술(글래스모피즘, 봄토 그리드, AI 챗 위젯, 스크롤
  기반 애니메이션 등)을 얼마나 반영하는지 함께 점검하고 싶을 때
- HTML 속성/태그 문서가 있어서 "겉(디자인)과 속(마크업)이 맞는지" 교차
  진단한 컨설팅 결과가 필요할 때
- 테스트 세션을 PPT 화면 녹화나 일반 영상(mp4/mov/webm 등)으로 기록해둬서
  스크린샷 대신/함께 영상에서 화면을 뽑아 분석해야 할 때

## 구성 요소

| 구성 요소 | 경로 | 역할 |
| --- | --- | --- |
| Skill | `claude/skills/screenshot-sitemap/SKILL.md` | 전체 방법론: 인벤토리 → HTML 문서 파싱 → depth 추론 → 정규화 → 트리 조립 → 트렌드 감사 → 컨설팅 종합 → 리포트 |
| Agent (비전) | `claude/agents/screenshot-sitemap-analyst.agent.md` | 스크린샷을 배치로 읽어 구조화된 근거(evidence)를 뽑아내는 비전 워커. 최종 depth 판단이나 트리 조립은 하지 않음 |
| Agent (HTML) | `claude/agents/html-signal-analyst.agent.md` | HTML 속성/태그 문서를 배치로 읽어 페이지별 시맨틱/접근성/SEO/성능/신기술 신호를 인용과 함께 추출하는 텍스트 워커 |
| Command | `claude/commands/screenshot-sitemap.md` | `/screenshot-sitemap <folder> [--html-docs <docs>]` 실행 패턴과 배치 디스패치 규칙 |
| Trend checklist | `claude/skills/screenshot-sitemap/references/trend-checklist.md` | 레이아웃/비주얼/타이포/모션/내비게이션/AI-신기술 체크리스트 |
| HTML signal checklist | `claude/skills/screenshot-sitemap/references/html-signal-checklist.md` | 시맨틱 구조/접근성/SEO/성능/모던 플랫폼 기능 신호 목록 + 비주얼×마크업 교차 검증 패턴과 심각도 기준 |
| Video frame extraction | `claude/skills/screenshot-sitemap/references/video-frame-extraction.md` | pptx 내장 영상 추출, ffmpeg 1~2초 간격 프레임 추출, 차이 해시(dHash) 기반 중복 프레임 제거 레시피 |

## 핵심 원칙

1. **파일 순서나 이름으로 depth를 정하지 않는다.** 브레드크럼, URL, 내비
   하이라이트, 콘텐츠 카디널리티(단일 아이템 vs. 그리드) 같은 실제 시각적
   근거로만 depth를 판단한다.
2. **모든 브랜치가 같은 depth 기준을 쓴다.** Home(0) → Section(1) →
   Listing(2) → Detail(3) → Transactional/Utility(4) → Terminal(5) 6단계
   스케일에 각 화면을 매핑한다. 특정 depth에 캡처된 화면이 없으면 자리표시자
   노드를 명시적으로 남긴다 (건너뛰지 않는다).
3. **근거 없는 분류는 금지.** 애매한 화면은 "unclear/low confidence"로
   표시하고, 서로 다른 신호가 충돌하면 conflicts 목록에 남긴다.
4. **화면이 많으면 에이전트에 배치로 위임**해서 메인 대화창의 컨텍스트를
   이미지 토큰으로 채우지 않는다 (8~10장 단위 권장).
5. **영상은 추출→중복 제거→스크린샷과 동급 취급.** pptx는 압축을 풀어
   `ppt/media/`의 내장 영상을 꺼내고, ffmpeg로 1초(긴 영상은 2초) 간격
   프레임을 추출한 뒤, 차이 해시(dHash)로 "마지막으로 채택한 프레임"과
   비교해 같은 화면이면 버린다. 애매하면 남긴다(화면 유실 금지). 채택된
   프레임은 `video-frame <파일> @ <mm:ss>` 출처를 달고 인벤토리에 합류하며,
   녹화 내 전환 순서는 부모→자식 추론의 **보조** 근거로만 쓴다(브레드크럼·
   URL·내비 신호를 절대 이기지 못함). 추출/제거/채택 수는 리포트에 명시.
6. **컨설팅 결론은 반드시 양쪽 근거를 쌍으로 인용한다.** 스크린샷의 시각적
   단서 + 문서에서 인용한 실제 태그/속성이 모두 있어야 하나의 finding이
   된다. 문서에 없는 마크업은 "absent(없음)"가 아니라 "not covered(문서
   미기재)"로 구분하고, 스크린샷만 있거나 문서만 있는 페이지는 교차 검증
   대상이 아니라 "근거 부족" 목록에 남긴다.

## 컨설팅 모드: 스크린샷 × HTML 문서 교차 검증

HTML 속성/태그 문서(`html_docs`)를 함께 주면 다음이 추가됩니다:

1. 문서의 페이지를 URL, `<title>`, 페이지명으로 스크린샷과 매칭 (강제 매칭
   금지, 못 맞춘 페이지는 양쪽 모두 명시)
2. 페이지별 HTML 신호 추출: 시맨틱 랜드마크, 헤딩 계층, ARIA/alt, 폼
   시맨틱, 메타/캐노니컬/OG, JSON-LD 구조화 데이터, `srcset`/lazy-loading,
   `<dialog>`/popover 같은 모던 플랫폼 기능
3. 비주얼 × 마크업 교차 검증 — 예:
   - 화면은 최신 디자인인데 마크업이 div-soup → 표면만 리디자인된 상태
     (접근성/SEO 리스크)
   - 브레드크럼이 보이는데 `BreadcrumbList` JSON-LD 없음 → quick-win
   - 이미지 그리드 페이지에 `loading="lazy"` 없음 → 이미지가 가장 많은
     지점의 성능 부채
   - 결제/가입 폼에 label·autocomplete 없음 → 전환율+접근성 리스크
4. 컨설팅 산출물: 경영 요약 → 섹션별 스코어카드(비주얼 최신성 × 마크업
   품질) → 심각도(`critical`/`major`/`minor`/`quick-win`)별 우선순위
   로드맵. 모든 항목은 트리의 특정 노드에 앵커링.

## 트렌드 참고 소스: 웹어워드 + 핀터레스트

`trend-checklist.md`는 시상식형 쇼케이스와 무드보드형 플랫폼의 패턴을
기준으로 구성되어 있고, 최신성이 중요할 때는 라이브 검색으로 보강합니다.

- **웹 어워드 쇼케이스** — Awwwards, CSS Design Awards, FWA: 인터랙션·모션·
  레이아웃 측면에서 현재 최상위로 인정받는 패턴 (WebGL 히어로, 스크롤 기반
  스토리텔링, 커스텀 커서, 인트로 로더 등)
- **핀터레스트 트렌드/무드보드** — 색상, 텍스처, 비주얼 무드 트렌드 (시즌
  컬러, 콜라주 레이아웃, 오가닉 블롭 형태 등)

라이브 검색은 `WebSearch`/`WebFetch`로 `Awwwards site of the day <업종>`,
`Pinterest web design trends <연도>` 같은 질의를 실행해 2~4개의 구체적인
참고 사례를 뽑고, `출처 — 제목/URL — 관찰된 패턴` 형식으로 인용합니다. 다만
이는 정적 체크리스트를 보강하는 용도이며, 실제 스크린샷 태깅은 여전히 화면에
보이는 근거에 기반해야 합니다. `screenshot-sitemap-analyst` 에이전트는 배치
단위로는 외부 검색을 하지 않고, 이 라이브 리서치는 전체 세트를 모은 뒤 메인
대화에서 한 번만 수행합니다.

**주의:** `pinterest.com`은 비로그인 접근을 403으로 차단하므로 검색 페이지를
직접 크롤링하지 말고, Pinterest Predicts 리포트를 다룬 2차 자료를 웹 검색으로
수집합니다. 실제로 수행한 리서치 결과는
`claude/skills/screenshot-sitemap/references/trend-snapshot-2026.md`에
날짜와 출처와 함께 저장되어 있습니다 — Pinterest Predicts 2026의 21개
트렌드(Cool Blue, Neo Deco, Glitchy Glam, 젤리/고무 질감, 오팔 광택, 레이스
텍스처 등)를 스크린샷에서 태깅 가능한 시각 신호로 번역해두었고, 2026
어워드/프로덕트 디자인 합의(타이포 중심 레이아웃, 키네틱 타입, 목적 있는
모션, 절제된 글래스모피즘, 바텀 시트 표준화, "코파일럿형" AI 배치, WebGL
선별 사용)도 정리되어 있습니다. 스냅샷이 2시즌 이상 오래되면 재검색합니다.

## 실행 흐름

```text
/screenshot-sitemap ./shots
/screenshot-sitemap ./shots --videos ./recordings
/screenshot-sitemap ./shots --html-docs ./html-audit
```

1. 폴더 내 모든 이미지 인벤토리 작성 (누락 없이)
2. 영상이 있으면 `video-frame-extraction.md` 파이프라인 실행: pptx 내장
   영상 추출 → ffmpeg 1~2초 간격 프레임 추출 → 중복 프레임 제거 →
   채택 프레임을 출처와 함께 인벤토리에 합류
3. 적으면 직접, 많으면 `screenshot-sitemap-analyst`에 배치 위임 (같은
   녹화의 프레임은 시간 순서대로 같은 배치에 연속 배치)
4. HTML 문서가 있으면 `html-signal-analyst`로 페이지별 신호 추출 후
   스크린샷과 매칭 (이미지 배치와 병렬 실행 가능)
5. 배치별 구조화 레코드 수집
6. 전체 세트를 대상으로 depth 정규화 (섹션 간 비교 가능하도록; 녹화 전환
   순서는 보조 근거)
7. Markdown 트리 + Mermaid 다이어그램 조립
8. `trend-checklist.md` 기준으로 최신 트렌드/신기술 반영도 진단
9. HTML 문서가 있으면 `html-signal-checklist.md` 기준으로 교차 검증 후
   컨설팅 섹션 생성
10. 리포트 작성: 인벤토리 요약(영상별 추출/제거/채택 수 포함) → 트리 →
    노드별 표 → 충돌/저신뢰 항목 → 트렌드 정합성 요약 → (컨설팅 모드)
    경영 요약·스코어카드·우선순위 로드맵

## 산출물 예시

`examples/sample-sitemap-report.example.md`에 가상의 이커머스 사이트로 만든
전체 리포트 예시가 있습니다. 실제 사용 시에는 실제 스크린샷 폴더 경로와
파일명으로 같은 구조의 리포트를 생성합니다.
