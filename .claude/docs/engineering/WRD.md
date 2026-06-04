# WRD: Layer 회고 협업 플랫폼

## 기술 스택
| 구분 | 기술 |
|------|------|
| Monorepo | pnpm workspace, Lerna |
| Web Frontend | React, TypeScript, Vite, React Router |
| Mobile App | Expo, React Native, Expo Router |
| Server State | TanStack Query |
| Client State | Jotai |
| Styling | Emotion, CSS, design token modules |
| API Client | Axios, cookie 기반 인증 토큰, refresh interceptor |
| Analytics/Support | Mixpanel, Microsoft Clarity, ChannelTalk |
| Shared Package | `@layer/shared` |

## 프로젝트 구조
- `apps/web`: 주요 웹/PWA 앱. 모바일/데스크탑 화면을 같은 React Router 안에서 디바이스별로 분기한다.
- `apps/mobile`: Expo 기반 네이티브 앱. `app` 라우트와 WebView/bridge 관련 레이어를 포함한다.
- `packages/shared`: 앱 간 공유 상수와 경로 모듈.
- `docs`: Git workflow 등 협업 문서.
- `.github/workflows`: PR 메시지 생성, 리뷰어 배정, 빌드 테스트 자동화.

## 기능 명세

### 인증 및 세션
- 구현 방식: `apps/web/src/api/index.ts`의 Axios interceptor가 access token을 요청 헤더에 주입하고 401/403 응답에서 refresh를 시도한다.
- 입력: 소셜 로그인 OAuth redirect, 닉네임, 프로필 정보.
- 출력: 인증 쿠키, 로그인 상태, 보호 라우트 접근 허용.
- 엣지케이스: refresh 실패 시 쿠키 삭제 후 인증 만료 이벤트를 발생시킨다.

### 라우팅 및 레이아웃
- 구현 방식: `apps/web/src/router/index.tsx`에서 `getDeviceType()` 결과에 따라 mobile/desktop route set을 생성한다.
- 입력: URL path, 디바이스 타입, 인증 필요 여부.
- 출력: `MobileGlobalLayout` 또는 `DesktopGlobalLayout` 하위 화면.
- 제약사항: 신규 기능은 모바일/데스크탑 중 적용 대상 라우트를 명시해야 한다.

### 스페이스 관리
- 구현 방식: `hooks/api/space`의 query/mutation hook과 `store/space` atom을 사용한다.
- 입력: 스페이스 이름, 분야, 이미지, 초대 ID, 멤버 액션.
- 출력: 스페이스 목록, 상세 정보, 멤버 목록, 초대/수정/삭제 결과.
- 엣지케이스: 이미지 업로드는 presigned URL에 직접 PUT하므로 파일 타입과 실패 처리를 분리한다.

### 회고 생성
- 구현 방식: `store/retrospect/retrospectCreate` 계열 atom으로 단계별 입력을 보관하고 `usePostRetrospectCreate`로 제출한다.
- 입력: 스페이스 ID, 제목, 기간, 마감일, 템플릿 ID 또는 커스텀 질문.
- 출력: 생성된 회고와 완료 화면 이동.
- 제약사항: 생성 단계 변경 시 모바일/데스크탑 생성 플로우를 함께 확인한다.

### 템플릿 탐색 및 커스텀
- 구현 방식: `hooks/api/template`과 `hooks/api/retrospect/recommend`를 사용하고 추천 상태는 Jotai atom으로 관리한다.
- 입력: 추천 조건, 검색어, 템플릿 선택, 커스텀 질문 편집.
- 출력: 기본 템플릿 목록, 커스텀 템플릿 목록, 추천 템플릿, 선택된 템플릿.
- 엣지케이스: 템플릿 제목 수정/삭제 후 관련 query cache를 무효화해야 한다.

### 회고 작성
- 구현 방식: `hooks/api/write`에서 질문/답변/임시 저장 데이터를 조회하고 제출 mutation을 호출한다.
- 입력: 회고 ID, 질문별 답변, 임시 저장 여부.
- 출력: 저장된 답변, 작성 완료 상태, 완료 페이지.
- 엣지케이스: 작성 중 이탈 시 `useTemporarySave`와 수정 상태 atom을 기준으로 모달 노출을 결정한다.

### 분석 및 인사이트
- 구현 방식: `hooks/api/analysis`, `hooks/api/retrospect/analysis`로 분석 데이터를 조회한다.
- 입력: 스페이스 ID, 회고 ID, 멤버 ID.
- 출력: 분석 요약, 만족도 차트, 인사이트, 답변 기반 분석.
- 제약사항: 분석 API는 비동기 생성 가능성이 있으므로 pending/empty/error 상태를 화면별로 분리한다.

### 액션 아이템
- 구현 방식: `hooks/api/actionItem` query/mutation으로 개인/팀 액션 아이템을 관리한다.
- 입력: 스페이스 ID, 액션 아이템 내용, 완료/수정/삭제 액션.
- 출력: 홈 목표 목록, 스페이스별 팀 액션 아이템 목록.
- 엣지케이스: 생성/수정/삭제 후 관련 query cache를 갱신한다.

### 사용자 정보 및 지원 화면
- 구현 방식: `hooks/api/user`, `app/mobile/info`, 공통 Modal/ProfileImage 컴포넌트를 사용한다.
- 입력: 닉네임, 프로필 이미지, 탈퇴 요청, 피드백.
- 출력: 내 정보 화면, 수정 결과, 안내 문서 화면.
- 제약사항: 계정 삭제 성공 시 인증 상태와 로컬 사용자 상태를 함께 정리한다.

## API 설계
현재 프론트엔드는 구체 endpoint 문자열을 각 API hook 내부에 캡슐화한다. 신규 API는 아래 도메인별 hook 경계를 유지한다.

| Method | Path 범위 | 설명 |
|--------|-----------|------|
| GET/POST | `/api/auth`, OAuth redirect | 로그인, 회원가입, 로그아웃, 토큰 교환 |
| GET/POST/PATCH/DELETE | `/spaces` | 스페이스 목록, 생성, 수정, 삭제, 참여 |
| GET/POST/PATCH/DELETE | `/spaces/{spaceId}/members` | 멤버 목록, 리더 변경, 내보내기 |
| GET/POST/PATCH/DELETE | `/retrospects` | 회고 목록, 생성, 수정, 삭제, 마감 |
| GET/POST/PATCH/DELETE | `/templates` | 기본/커스텀 템플릿 조회, 선택, 수정, 삭제 |
| GET/POST | `/write`, `/answers` | 질문/답변 조회, 임시 저장, 제출 |
| GET | `/analysis` | 팀/개인 분석 조회 |
| GET/POST/PATCH/DELETE | `/action-items` | 액션 아이템 조회, 생성, 수정, 삭제 |
| POST | `/backoffice/*` | 클릭/노출 이벤트 수집 |

## 데이터 모델
```ts
User {
  id: string
  nickname: string
  profileImageUrl?: string
  socialType: "kakao" | "google" | "apple"
}

Space {
  id: string
  name: string
  field?: string
  imageUrl?: string
  leaderId: string
  members: Member[]
}

Retrospect {
  id: string
  spaceId: string
  title: string
  templateId: string
  status: "inProgress" | "completed" | "closed"
  dueDate?: string
}

Template {
  id: string
  title: string
  questions: Question[]
  type: "default" | "custom" | "recommended"
}

ActionItem {
  id: string
  spaceId?: string
  retrospectId?: string
  content: string
  isCompleted: boolean
}
```

## 비기능 요구사항
- 성능: route component는 lazy loading을 유지하고, 서버 데이터는 TanStack Query cache를 사용한다.
- 인증: access token은 요청 interceptor에서만 주입하고, refresh 실패 시 인증 상태를 일관되게 정리한다.
- 안정성: mutation 성공 후 관련 query invalidation 또는 local state reset을 명시한다.
- 반응형: web 앱은 device type 분기에 따라 모바일/데스크탑 라우트를 분리한다.
- 유지보수: 공통 UI는 `component/common`, 도메인 UI는 `component/{domain}` 또는 `app/{device}/{domain}` 경계를 따른다.
- 협업: `main`, `develop`은 직접 푸시하지 않고 PR로 머지한다.

## 구현 우선순위
| 우선순위 | 기능 | 이유 |
|----------|------|------|
| P0 | 인증/세션/보호 라우트 | 로그인 사용자가 모든 핵심 기능에 접근하기 위한 기반 |
| P0 | 스페이스 생성/참여/조회 | 회고가 소속될 기본 단위 |
| P0 | 회고 생성/작성/제출 | 제품의 핵심 사용자 플로우 |
| P1 | 템플릿 추천/커스텀 | 회고 품질과 생성 완료율에 직접 영향 |
| P1 | 분석/인사이트 | 회고 결과를 가치로 전환하는 핵심 경험 |
| P1 | 액션 아이템 | 회고 이후 실행으로 이어지는 기능 |
| P2 | 내 정보/공지/도움말/피드백 | 운영 및 사용자 지원 경험 |
| P2 | 백오피스 이벤트 수집 | 제품 개선을 위한 행동 데이터 확보 |

## 개발 검증
- Web 타입 검증: `pnpm -F @layer/web exec tsc --noEmit`
- Web 빌드: `pnpm -F @layer/web run build`
- 전체 lint: `pnpm -r --parallel run lint`
- 변경 범위가 React UI일 경우 로컬 실행 후 모바일/데스크탑 라우트 중 영향 화면을 확인한다.
