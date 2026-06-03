# Layer AI Documentation Index

이 디렉터리는 AI 에이전트가 Layer 프로젝트를 이해하고 작업할 때 참조하는 문서 저장소다. 루트 `AGENTS.md`는 진입점이고, 실제 제품/기술/아키텍처 문서는 이 디렉터리 아래에 둔다.

## Directory Structure

```text
.claude/docs
├── README.md
├── product
│   └── PRD.md
├── engineering
│   └── WRD.md
└── architecture
    └── PROJECT_ARCHITECTURE.md
```

## Read Guide

| 작업 유형 | 먼저 읽을 문서 |
|-----------|----------------|
| 제품 목적, 사용자 가치, 기능 범위 확인 | `product/PRD.md` |
| 구현 방식, 기술 경계, 기능별 개발 요구사항 확인 | `engineering/WRD.md` |
| 전체 폴더 구조, 런타임 흐름, 상태/API 경계 확인 | `architecture/PROJECT_ARCHITECTURE.md` |
| Git/PR/릴리즈 작업 | `../../docs/git-workflow-guide/README.md` |
| rebase, 충돌, release sync 작업 | `../../docs/git-workflow-conflict-2026_05_12.md` |

## Maintenance Rules

- 제품 범위가 바뀌면 `product/PRD.md`를 갱신한다.
- 구현 방식이나 기술 경계가 바뀌면 `engineering/WRD.md`를 갱신한다.
- 폴더 구조, 라우팅, 상태관리, API 경계가 바뀌면 `architecture/PROJECT_ARCHITECTURE.md`를 갱신한다.
- 문서와 실제 코드가 충돌하면 실제 코드를 우선하고, 문서를 함께 수정한다.
