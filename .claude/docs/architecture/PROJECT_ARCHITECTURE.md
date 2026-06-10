# Project Architecture: Layer

## Overview

Layer는 `pnpm` workspace 기반 monorepo로 구성된 회고 협업 플랫폼이다. 현재 주요 실행 단위는 React/Vite 기반 `apps/web`, Expo 기반 `apps/mobile`, 공유 패키지 `packages/shared`다. 제품 도메인은 스페이스, 회고, 템플릿, 분석, 액션 아이템, 인증/사용자 정보로 나뉜다.

## Repository Layout

```text
.
├── apps
│   ├── web
│   │   ├── src
│   │   │   ├── api
│   │   │   ├── app
│   │   │   ├── component
│   │   │   ├── hooks
│   │   │   ├── layout
│   │   │   ├── lib
│   │   │   ├── router
│   │   │   ├── store
│   │   │   ├── style
│   │   │   ├── types
│   │   │   └── utils
│   │   └── package.json
│   └── mobile
│       ├── app
│       ├── bridge
│       ├── components
│       ├── layout
│       ├── provider
│       └── package.json
├── packages
│   └── shared
├── docs
├── .github
│   └── workflows
├── .claude
│   └── docs
├── AGENTS.md
├── CLAUDE.md
├── pnpm-workspace.yaml
└── package.json
```

## Workspace Architecture

| 영역 | 역할 |
|------|------|
| `apps/web` | 웹/PWA 앱. 모바일과 데스크탑 라우트를 디바이스 타입에 따라 분기한다. |
| `apps/mobile` | Expo 기반 네이티브 앱. Expo Router와 WebView bridge 관련 구조를 포함한다. |
| `packages/shared` | 앱 간 공유 상수, 경로, 유틸리티 진입점. |
| `docs` | Git workflow와 충돌 대응 같은 협업 문서. |
| `.claude/docs` | AI 에이전트가 읽는 제품/기술/아키텍처 문서. |

## Web App Architecture

`apps/web`은 React Router를 중심으로 모바일/데스크탑 라우트를 구성한다. `getDeviceType()` 결과에 따라 모바일은 `/` 기준, 데스크탑은 `/desktop` 기준 라우트로 이동한다.

### Key Directories

| 경로 | 역할 |
|------|------|
| `src/router/index.tsx` | 모바일/데스크탑 라우트 정의, 인증 레이아웃 적용, device type 분기 |
| `src/app/mobile` | 모바일 페이지 단위 화면 |
| `src/app/desktop` | 데스크탑 페이지 단위 화면 |
| `src/component/common` | 재사용 가능한 공통 UI 컴포넌트 |
| `src/component/{domain}` | 도메인별 UI 컴포넌트 |
| `src/hooks/api` | 도메인별 TanStack Query hook |
| `src/api` | Axios client, token refresh, interceptor |
| `src/store` | Jotai 기반 클라이언트 상태 |
| `src/types` | 도메인 타입 정의 |
| `src/lib/provider` | Query, analytics, bridge, PWA, offline provider |

### Runtime Flow

```text
React entry
  -> app.tsx
  -> ClarityProvider
  -> MixpanelProvider
  -> QueryClientProvider
  -> BridgeProvider
  -> Routers
  -> MobileGlobalLayout or DesktopGlobalLayout
  -> RequireLoginLayout when route.auth is true
  -> page/component
```

### State Boundaries

| 상태 유형 | 사용 기술 | 위치 |
|-----------|-----------|------|
| 서버 데이터 | TanStack Query | `src/hooks/api`, `src/lib/tanstack-query` |
| UI/플로우 상태 | Jotai | `src/store`, 일부 `src/hooks/store` |
| 인증 토큰 | Cookie + Axios interceptor | `src/api`, `src/config/storage-keys` |
| 전역 UI 알림 | Jotai + Toast component | `src/store/toast`, `src/component/common/Toast` |

### API Boundary

API 요청은 도메인별 hook에서 시작하고, 공통 Axios instance를 통해 서버와 통신한다.

```text
Page/Component
  -> hooks/api/{domain}/use...
  -> api instance
  -> request interceptor adds Authorization
  -> response interceptor handles refresh/logout/error
```

신규 API는 기존 도메인 hook 경계를 먼저 따른다. 직접 `axios`를 사용하는 경우는 OAuth token 교환, presigned URL 업로드처럼 공통 API client 경계를 벗어나야 하는 케이스로 제한한다.

## Mobile App Architecture

`apps/mobile`은 Expo Router 기반 구조다. 현재 라우트는 `app` 디렉터리에 있으며, 주요 화면은 홈 탭, 분석, 목표, 로그인, 닉네임 설정, 스페이스, 회고 생성, 회고 작성으로 나뉜다.

### Key Directories

| 경로 | 역할 |
|------|------|
| `app` | Expo Router 페이지 |
| `app/(tabs)` | 탭 기반 홈, 분석, 목표 화면 |
| `app/space` | 스페이스 목록, 생성, 상세 |
| `app/retrospect` | 회고 생성 관련 화면 |
| `app/write` | 회고 작성 화면 |
| `bridge` | WebView bridge 경계 |
| `layout` | WebView layout 등 화면 레이아웃 |
| `provider` | 모바일 앱 provider |

## Domain Map

| 도메인 | 주요 Web 위치 | 관련 API hook |
|--------|---------------|---------------|
| 인증/사용자 | `component/login`, `app/*/login`, `app/mobile/info` | `hooks/api/login`, `hooks/api/auth`, `hooks/api/user` |
| 스페이스 | `component/space`, `app/mobile/space`, `app/desktop/space` | `hooks/api/space` |
| 회고 생성 | `component/retrospectCreate`, `app/mobile/retrospectCreate`, `app/desktop/component/retrospectCreate` | `hooks/api/retrospect/create` |
| 회고 작성 | `component/write`, `app/mobile/write`, `app/desktop/retrospectWrite` | `hooks/api/write` |
| 템플릿 | `component/template`, `component/retrospect/template` | `hooks/api/template`, `hooks/api/retrospect/recommend` |
| 분석 | `component/retrospect/analysis`, `app/*/retrospect/analysis` | `hooks/api/analysis`, `hooks/api/retrospect/analysis` |
| 액션 아이템 | `component/ActionItem`, `component/retrospect/space/actionItems` | `hooks/api/actionItem` |

## Development Commands

| 목적 | 명령 |
|------|------|
| 전체 개발 서버 | `pnpm -r --parallel run dev` |
| Web package 명령 진입 | `pnpm -F @layer/web ...` |
| Mobile package 명령 진입 | `pnpm -F @layer/mobile ...` |
| Web 타입 검증 | `pnpm -F @layer/web exec tsc --noEmit` |
| Web 빌드 | `pnpm -F @layer/web run build` |
| 전체 lint | `pnpm -r --parallel run lint` |

## Architecture Change Rules

- 라우트 구조를 바꾸면 `apps/web/src/router/index.tsx`와 이 문서를 함께 갱신한다.
- API hook 경계를 바꾸면 `.claude/docs/engineering/WRD.md`와 이 문서를 함께 갱신한다.
- 신규 도메인을 추가하면 `Domain Map`에 위치와 API hook 경계를 추가한다.
- `.claude/docs` 문서는 AI 에이전트의 컨텍스트 진입점이므로, 코드 구조와 다르게 방치하지 않는다.
