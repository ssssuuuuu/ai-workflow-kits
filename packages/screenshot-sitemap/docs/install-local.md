# 로컬 설치 가이드 (Claude Code)

이 패키지를 로컬 PC의 Claude Code에서 사용하기 위한 설치 절차.

## 1. 사전 요구사항

| 도구 | 용도 | 확인 |
|---|---|---|
| Claude Code CLI (또는 데스크톱 앱) | 스킬/에이전트 실행 | `claude --version` |
| ffmpeg | 영상 프레임 추출 | `ffmpeg -version` |
| Python 3 + Pillow | 중복 프레임 제거(dHash) | `python3 -c "import PIL"` (없으면 `pip install pillow`) |

Windows에서 ffmpeg은 `winget install ffmpeg` 또는 https://ffmpeg.org 에서 설치.

## 2. 저장소 받기

```bash
git clone https://github.com/ssssuuuuu/ai-workflow-kits.git
cd ai-workflow-kits
# 아직 main에 머지 전이면:
git checkout claude/screenshot-sitemap-agent-3vbibj
```

## 3. 파일 복사 위치

Claude Code는 사용자 레벨(`~/.claude/`, 모든 프로젝트에 적용) 또는
프로젝트 레벨(`<프로젝트>/.claude/`, 해당 프로젝트만)에서 스킬·에이전트를
읽는다. Windows의 사용자 레벨 경로는 `%USERPROFILE%\.claude\`.

| 구성 요소 | 복사 원본 | 복사 대상 (사용자 레벨) |
|---|---|---|
| 스킬 (레퍼런스 포함) | `packages/screenshot-sitemap/claude/skills/screenshot-sitemap/` | `~/.claude/skills/screenshot-sitemap/` |
| 비전 에이전트 | `packages/screenshot-sitemap/claude/agents/screenshot-sitemap-analyst.agent.md` | `~/.claude/agents/screenshot-sitemap-analyst.md` |
| HTML 신호 에이전트 | `packages/screenshot-sitemap/claude/agents/html-signal-analyst.agent.md` | `~/.claude/agents/html-signal-analyst.md` |
| 커맨드 | `packages/screenshot-sitemap/claude/commands/screenshot-sitemap.md` | `~/.claude/commands/screenshot-sitemap.md` |

macOS/Linux 예시:

```bash
mkdir -p ~/.claude/skills ~/.claude/agents ~/.claude/commands
cp -r packages/screenshot-sitemap/claude/skills/screenshot-sitemap ~/.claude/skills/
cp packages/screenshot-sitemap/claude/agents/screenshot-sitemap-analyst.agent.md ~/.claude/agents/screenshot-sitemap-analyst.md
cp packages/screenshot-sitemap/claude/agents/html-signal-analyst.agent.md ~/.claude/agents/html-signal-analyst.md
cp packages/screenshot-sitemap/claude/commands/screenshot-sitemap.md ~/.claude/commands/
```

Windows PowerShell 예시:

```powershell
$c = "$env:USERPROFILE\.claude"
New-Item -ItemType Directory -Force -Path "$c\skills","$c\agents","$c\commands" | Out-Null
Copy-Item -Recurse -Force packages\screenshot-sitemap\claude\skills\screenshot-sitemap "$c\skills\"
Copy-Item packages\screenshot-sitemap\claude\agents\screenshot-sitemap-analyst.agent.md "$c\agents\screenshot-sitemap-analyst.md"
Copy-Item packages\screenshot-sitemap\claude\agents\html-signal-analyst.agent.md "$c\agents\html-signal-analyst.md"
Copy-Item packages\screenshot-sitemap\claude\commands\screenshot-sitemap.md "$c\commands\"
```

## 4. 에이전트 frontmatter 조정 (로컬 1회)

에이전트 파일의 `model_profile`은 런타임 중립 표기다. 로컬 Claude Code에서는
`model` 키로 바꾼다:

- `model_profile: balanced` → `model: sonnet`
- `model_profile: fast` → `model: haiku`
- `model_profile: frontier` → `model: opus`

`reasoning_level`, `keepworking_tier` 같은 비표준 키는 무시되므로 그대로 둬도 된다.

## 5. 사용법

```text
# 스크린샷 폴더만
/screenshot-sitemap ./shots

# 영상(PPT 녹화 포함) 함께
/screenshot-sitemap ./shots --videos ./recordings

# HTML 속성/태그 문서 함께 (컨설팅 모드)
/screenshot-sitemap ./shots --html-docs ./html-audit
```

스킬은 대화에서 "스크린샷으로 사이트맵", "영상 프레임 분석", "컨설팅 보고서"
같은 요청 시 자동으로도 트리거된다.

## 6. 산출물 모드

최종 보고서는 세 가지 모드로 낼 수 있다 —
`skills/screenshot-sitemap/references/report-modes.md` 참고:

1. **실무 상세 모드** — 근거 등급·ID 체계 전면 노출 (분석가용)
2. **경영 보고 모드** — 결론·수치·의사결정 요청 먼저, 상세는 부록 (상급자 보고용)
3. **심플 문서형** — 로마자 항목 체계·표 중심의 결재 문서 스타일

## 7. 검증된 파이프라인 메모

- 프레임 추출: `ffmpeg -i in.mp4 -vf fps=1 frames/f_%05d.png` (긴 영상은 fps=0.5)
- 중복 제거: dHash 64bit, 해밍 거리 임계 6, "마지막 채택 프레임"과 비교
  (스크립트: `references/video-frame-extraction.md`) — 합성 테스트로 검증됨
- pptx 내장 영상: `unzip -o deck.pptx 'ppt/media/*'`
- Pinterest는 비로그인 403 — 직접 크롤링하지 말고 웹 검색으로 우회
  (`references/trend-snapshot-2026.md`의 리서치 노트 참고)
