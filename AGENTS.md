# AGENTS.md

Layer 프로젝트에서 AI 에이전트가 작업할 때 가장 먼저 읽는 문서 인덱스다. 실제 제품/기술/아키텍처 문서는 `.claude/docs` 아래에 있으며, 이 파일은 작업 유형별로 어떤 문서를 읽어야 하는지 안내한다.

## Read Order

1. 항상 이 파일을 먼저 읽는다.
2. 작업 성격에 맞는 문서만 추가로 읽는다.
3. 문서와 실제 코드가 충돌하면 실제 코드를 우선 확인하고, 필요한 경우 문서 갱신을 제안한다.

## Document Index

| 문서 | 언제 읽는가 | 포함 내용 |
|------|-------------|-----------|
| `CLAUDE.md` | 모든 AI 개발 작업 전 | 사고 방식, 단순성, 작은 변경, 목표 기반 실행 원칙 |
| `.claude/docs/README.md` | 문서 저장소 구조를 확인할 때 | AI 문서 디렉터리 구조와 유지보수 규칙 |
| `.claude/docs/product/PRD.md` | 제품 목적, 기능 범위, 사용자 가치 판단이 필요할 때 | Layer의 문제 정의, 목표, 주요 기능, 성공 지표 |
| `.claude/docs/engineering/WRD.md` | 구현 방식, 기술 경계, 도메인 구조가 필요할 때 | 기술 스택, 기능별 개발 요구사항, API/data model 개요 |
| `.claude/docs/architecture/PROJECT_ARCHITECTURE.md` | 전체 구조, 라우팅, 상태/API 경계가 필요할 때 | monorepo, web/mobile, runtime flow, domain map |
| `docs/git-workflow-guide/README.md` | 브랜치, PR, 릴리즈, 커밋 관련 작업 | Git Flow, PR base/head, merge 전략, 체크리스트 |
| `docs/git-workflow-conflict-2026_05_12.md` | rebase, 충돌 해소, release sync 작업 | 충돌 사고 사례와 금지해야 할 Git 안티패턴 |
| `apps/web/README.md` | Web 앱 로컬 실행 또는 앱 개요 확인 | 현재는 이미지 중심의 최소 README |
| `apps/mobile/README.md` | Expo 앱 실행 또는 모바일 앱 구조 확인 | Expo 실행 방법과 모바일 앱 기본 안내 |

## Task Routing

### 제품/기획 작업
- 먼저 `.claude/docs/product/PRD.md`를 읽는다.
- 구현 영향이 있으면 `.claude/docs/engineering/WRD.md`도 읽는다.
- 기능 범위가 바뀌면 PRD와 WRD 중 영향을 받는 문서를 함께 갱신한다.

### Web 기능 개발
- 먼저 `.claude/docs/engineering/WRD.md`와 `.claude/docs/architecture/PROJECT_ARCHITECTURE.md`를 읽는다.
- 라우팅 변경은 `apps/web/src/router/index.tsx`를 확인한다.
- API 변경은 `apps/web/src/hooks/api/{domain}`와 `apps/web/src/api`를 확인한다.
- 상태 변경은 TanStack Query와 Jotai 사용 경계를 확인한다.

### Mobile 기능 개발
- 먼저 `.claude/docs/engineering/WRD.md`와 `.claude/docs/architecture/PROJECT_ARCHITECTURE.md`를 읽는다.
- Expo route는 `apps/mobile/app`을 확인한다.
- WebView/bridge 영향은 `apps/mobile/bridge`, `apps/mobile/layout`, `apps/mobile/provider`를 확인한다.

### UI/컴포넌트 작업
- 먼저 `.claude/docs/architecture/PROJECT_ARCHITECTURE.md`의 Web App Architecture와 Domain Map을 확인한다.
- 공통 UI는 `apps/web/src/component/common`을 먼저 확인한다.
- 도메인 UI는 `apps/web/src/component/{domain}` 또는 `apps/web/src/app/{device}/{domain}`을 확인한다.
- 모바일/데스크탑 공통 경험이면 양쪽 route와 화면을 모두 확인한다.

### API/데이터 작업
- 먼저 `.claude/docs/engineering/WRD.md`와 `.claude/docs/architecture/PROJECT_ARCHITECTURE.md`의 API Boundary를 확인한다.
- API client 공통 동작은 `apps/web/src/api/index.ts`를 확인한다.
- 도메인별 호출은 `apps/web/src/hooks/api/{domain}`에서 기존 hook 패턴을 따른다.
- 타입은 `apps/web/src/types/{domain}`을 우선 확인한다.

### Git/PR/릴리즈 작업
- `docs/git-workflow-guide/README.md`를 먼저 읽는다.
- `develop -> main`, release sync, rebase 충돌 작업이면 `docs/git-workflow-conflict-2026_05_12.md`도 읽는다.
- `main`, `develop`에는 직접 push하지 않는다.

## Project Map

- `apps/web`: React, TypeScript, Vite 기반 웹/PWA 앱. 모바일/데스크탑 화면을 device type으로 분기한다.
- `apps/mobile`: Expo, React Native 기반 모바일 앱.
- `packages/shared`: 앱 간 공유 상수와 경로 모듈.
- `docs`: 협업, Git workflow, 사고 방지 문서.
- `.github/workflows`: PR 메시지 생성, 리뷰어 배정, 빌드/테스트 자동화.

## Core Development Rules

- `CLAUDE.md`의 기본 원칙을 따른다.
- 요청과 직접 관련된 파일만 수정한다.
- 기존 폴더 구조, 네이밍, hook/API 패턴을 우선한다.
- 단일 사용처를 위한 과한 추상화나 미래 확장용 옵션을 만들지 않는다.
- 관련 없는 dead code, 포맷팅, 리팩토링은 임의로 처리하지 않는다.
- 내가 만든 변경 때문에 생긴 unused import, unused variable, orphan code는 정리한다.

## Verification

- Web 타입 검증: `pnpm -F @layer/web exec tsc --noEmit`
- Web 빌드: `pnpm -F @layer/web run build`
- 전체 lint: `pnpm -r --parallel run lint`
- UI 변경은 관련 화면을 실제로 열어 모바일/데스크탑 레이아웃을 확인한다.
- 검증을 실행하지 못했거나 기존 오류 때문에 실패하면 실패 원인과 남은 리스크를 보고한다.

## Completion Report

작업 완료 시 다음을 짧게 보고한다.

- 수정한 파일
- 핵심 변경
- 실행한 검증과 결과
- 남은 리스크 또는 후속 작업
