# Screenshot Sitemap 사용 가이드 (한국어)

폴더 안에 무작위로 모아둔 웹사이트/앱 스크린샷들을 depth(깊이)가 맞춰진
사이트맵 트리로 재구성하고, 최신 웹트렌드·UI/UX 패턴 기준으로 진단하는
워크플로우입니다.

## 언제 쓰나

- 스크린샷들이 크롤링 순서, URL, 파일명 규칙 없이 무작위로 저장되어 있을 때
- "이 화면들 depth 맞춰서 트리로 정리해줘" 같은 요청이 있을 때
- 사이트 구조(IA)를 스크린샷만 보고 역으로 추론해야 할 때
- 화면들이 최신 트렌드/신기술(글래스모피즘, 봄토 그리드, AI 챗 위젯, 스크롤
  기반 애니메이션 등)을 얼마나 반영하는지 함께 점검하고 싶을 때

## 구성 요소

| 구성 요소 | 경로 | 역할 |
| --- | --- | --- |
| Skill | `claude/skills/screenshot-sitemap/SKILL.md` | 전체 방법론: 인벤토리 → depth 추론 → 정규화 → 트리 조립 → 트렌드 감사 → 리포트 |
| Agent | `claude/agents/screenshot-sitemap-analyst.agent.md` | 스크린샷을 배치로 읽어 구조화된 근거(evidence)를 뽑아내는 비전 워커. 최종 depth 판단이나 트리 조립은 하지 않음 |
| Command | `claude/commands/screenshot-sitemap.md` | `/screenshot-sitemap <folder>` 실행 패턴과 배치 디스패치 규칙 |
| Trend checklist | `claude/skills/screenshot-sitemap/references/trend-checklist.md` | 레이아웃/비주얼/타이포/모션/내비게이션/AI-신기술 체크리스트 |

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

## 실행 흐름

```text
/screenshot-sitemap ./shots
```

1. 폴더 내 모든 이미지 인벤토리 작성 (누락 없이)
2. 적으면 직접, 많으면 `screenshot-sitemap-analyst`에 배치 위임
3. 배치별 구조화 레코드 수집
4. 전체 세트를 대상으로 depth 정규화 (섹션 간 비교 가능하도록)
5. Markdown 트리 + Mermaid 다이어그램 조립
6. `trend-checklist.md` 기준으로 최신 트렌드/신기술 반영도 진단
7. 리포트 작성: 인벤토리 요약 → 트리 → 노드별 표 → 충돌/저신뢰 항목 →
   트렌드 정합성 요약과 노드별 구체 개선안

## 산출물 예시

`examples/sample-sitemap-report.example.md`에 가상의 이커머스 사이트로 만든
전체 리포트 예시가 있습니다. 실제 사용 시에는 실제 스크린샷 폴더 경로와
파일명으로 같은 구조의 리포트를 생성합니다.
