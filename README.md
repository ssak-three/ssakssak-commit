# 🧹 싹싹커밋 (Ssakssak Commit)

<p align="center">
  <img src="./public/logo.svg" alt="Ssakssak Commit Logo" width="160" />
</p>

기업 채용 담당자는 지원자가 제출한 과제의 수십, 수백 개 커밋을 일일이 확인하며 개발 과정을 파악하는 데 많은 시간을 소비합니다.  
단순한 Git log와 코드 변경 내역만으로는 "왜 이렇게 개발했는지", "어떤 전략으로 문제를 해결했는지" 알기 어렵습니다.

싹싹커밋은 GitHub 커밋 데이터를 AI로 분석하여 사용자에게 요약 및 분석 결과를 제공합니다.

<br>

## 목차

- [📘 프로젝트 소개](#프로젝트-소개)
  - [🪴 서비스 개요](#서비스-개요)

- [🗂️ 레포지토리 개요](#레포지토리-개요)
  - [🧠 레포지토리의 역할](#1-레포지토리의-역할)
  - [🧩 레포지토리의 구조](#2-레포지토리의-구조)

- [🚀 핵심 기능 소개](#핵심-기능-소개)
  - [1️⃣ GitHub 레포지토리 연결](#1️⃣-github-레포지토리-연결)
  - [2️⃣ 리포트 생성 요청](#2️⃣-리포트-생성-요청)
  - [3️⃣ 리포트 생성 진행 상태 표시](#3️⃣-리포트-생성-진행-상태-표시)
  - [4️⃣ 분석 결과 리포트 제공](#4️⃣-분석-결과-리포트-제공)

- [🏋️‍♀️ 기능 구현 방식 / 기술 챌린지](#기능-구현-방식--기술-챌린지)
  - [김민지](#)
  - [이한세](#)
  - [조혜주](#)

- [🛠️ 기술 스택](#기술-스택)
  - [🖥️ 프론트엔드](#️-프론트엔드)
  - [⚙️ 백엔드](#️-백엔드)
  - [📀 데이터](#-데이터)
  - [🤖 AI & 오케스트레이션](#-ai--오케스트레이션)
  - [🚀 배포](#-배포)

- [🪄 작업 방식 / 회고](#작업-방식--회고)
  - [⚡️ 깃 브랜치 전략](#️-깃-브랜치-전략)
  - [📝 PR 규칙](#-pr-규칙)
  - [💭 개인 회고](#-개인-회고)

- [🔨 리팩토링 항목](#리팩토링-항목)

<br>

## 📘 프로젝트 소개 <a id="프로젝트-소개"></a>

### 🪴 서비스 개요

<strong>싹싹커밋(Ssakssak Commit)</strong>은 개발자, 코드 리뷰어(**면접관·기업 평가자**)가  
**프로젝트의 개발 의도와 문제 해결 과정을 빠르고 명확하게 파악할 수 있도록**,  
GitHub 커밋 로그를 **AI가 자동 분석·요약해 리포트로 시각화하는 서비스**입니다.

- 👩‍💻 **개발자**는 자신의 개발 과정을 되돌아보는 학습 리포트로 활용할 수 있으며,
- 👨‍🏫 **코드 리뷰어**는 커밋별 의도와 흐름을 한눈에 이해해 평가와 피드백 시간을 단축할 수 있습니다.

<br>

### 🗂️ 레포지토리 구조

<pre>
  ├── prisma/                  # Prisma 스키마 및 마이그레이션 관리
  │   └── schema.prisma
  ├── public/                  # 정적 리소스 (로고, 에러 이미지 등)
  ├── src/
  │   ├── app/                 # Next.js App Router (UI + API 통합 라우팅)
  │   │   ├── (routes)/        # 페이지 라우팅 그룹 (홈, 리포트, 로그인 등)
  │   │   └── api/             # 백엔드 API 엔드포인트 (Next.js API Route)
  │   ├── constants/           # 공통 상수, 설정값, 밸리데이션 정의
  │   ├── errors/              # 커스텀 에러 클래스 정의
  │   ├── hooks/               # 커스텀 훅
  │   ├── infra/               # 인프라 레벨(캐시, 메시징, 외부 연동) 코드
  │   ├── lib/                 # 공용 유틸, 인증, 로거, 파서 등 핵심 로직
  │   ├── repositories/        # 데이터 접근 계층 (Prisma 기반)
  │   ├── services/            # 비즈니스 로직 (커밋 분석, 리포트 생성 등)
  │   ├── stores/              # Zustand 기반 전역 상태 관리
  │   └── types/               # 전역 타입 정의
  ├── tsconfig.json
  └── package.json
</pre>

싹싹커밋은 Next.js 기반의 단일 레포지토리로,  
src/app 내부에 UI(Route)와 백엔드(API) 를 함께 구성하여  
프론트엔드·백엔드·DB·AI 분석 로직을 하나의 파이프라인으로 통합한 구조입니다.

<br>

## 🚀 핵심 기능 소개 <a id="핵심-기능-소개"></a>

### 1️⃣ GitHub 레포지토리 연결

GitHub 레포지토리 URL 입력 시 브랜치 목록이 자동으로 조회되어 분석 대상을 간편하게 선택할 수 있습니다.  
`Public` 및 로그인 시 `Private` 레포지토리 까지 모두 연결 가능합니다.

> <img src="./public/readme/repository-input.png" width="500" alt="Repository Input" />

### 2️⃣ 리포트 생성 요청

리포트 이름과 레포지토리 개요를 입력하고 생성 버튼을 클릭하면  
AI 분석 요청과 리포트 생성이 한 번에 진행됩니다.

<img src="./public/readme/request-report.png" width="500" alt="Repository Input" />

- 리포트명을 입력해 원하는 이름으로 리포트 생성
- 프로젝트 개요 작성 시 맥락 기반 AI 분석 제공

### 3️⃣ 리포트 생성 진행 상태 표시

리포트 생성 중인 진행 상황을 시각적으로 확인할 수 있습니다.

| 분석 진행 중 | 분석 완료 |
| ------------ | --------- |

| <img src="./public/readme/loading-polling-2.png" width="300" alt="Loading Step 2" />| <img src="./public/readme/loading-polling-3.png" width="300" alt="Loading Step 3" /> |

</p>

### 4️⃣ 분석 결과 리포트 제공

AI가 커밋을 분석해

- 주요 변경 요약
- 커밋 분석 내용에 맞는 다이어그램(플로우 차트, 시퀀스 다이어그램, 클래스 다이어그램)
- 주요 code diff(수정 내역)
- 커밋 목록(클릭 시 해당 커밋 분석 내용으로 이동)
- 해당 커밋 GitHub 링크
- 해당 레포지토리 링크

등을 리포트 형태로 시각화해 보여줍니다.

> 예시 화면  
> ![alt text](./public/readme/result-report.gif)

<br>

## 🛠️ 기술 스택 <a id="기술-스택"></a>

### 🖥️ 프론트엔드

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/Zustand-443D34?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/shadcnui-18181B?style=for-the-badge&logo=shadcnui&logoColor=white">
<img src="https://img.shields.io/badge/Mermaid-FF3670?style=for-the-badge&logo=mermaid&logoColor=white">
<img src="https://img.shields.io/badge/Monaco_Editor-00599C?style=for-the-badge&logo=visualstudiocode&logoColor=white">

### ⚙️ 백엔드

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/zod-408AFF?style=for-the-badge&logo=zod&logoColor=white">
<img src="https://img.shields.io/badge/pino-687634?style=for-the-badge&logo=pino&logoColor=white">

### 📀 데이터

<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"> <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
<img src="https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white">

### 🤖 AI & 오케스트레이션

<img src="https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white"> <img src="https://img.shields.io/badge/BullMQ-EA580C?style=for-the-badge&logo=apachekafka&logoColor=white">

### 🚀 배포

<img src="https://img.shields.io/badge/render-3178C6?style=for-the-badge&logo=render&logoColor=white">

###

> 🔗 세부 기술 선정 이유 및 대안 비교는 Wiki에서 확인할 수 있습니다.  
> [프론트엔드](https://github.com/team-vaco-20/ssakssak-commit/wiki/%F0%9F%9B%A0%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D#1-%EF%B8%8F-front-end) · [백엔드](https://github.com/team-vaco-20/ssakssak-commit/wiki/%F0%9F%9B%A0%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D#2-%EF%B8%8F-back-end) · [데이터](https://github.com/team-vaco-20/ssakssak-commit/wiki/%F0%9F%9B%A0%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D#3--%EB%8D%B0%EC%9D%B4%ED%84%B0) ·[AI & 오케스트레이션](https://github.com/team-vaco-20/ssakssak-commit/wiki/%F0%9F%9B%A0%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D#4--ai--%EC%98%A4%EC%BC%80%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98) · [배포](https://github.com/team-vaco-20/ssakssak-commit/wiki/%F0%9F%9B%A0%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D#5--%EB%B0%B0%ED%8F%AC)

<br>

## 🏋️‍♀️ 기능 구현 방식 / 기술 챌린지 <a id="기능-구현-방식--기술-챌린지"></a>

### 김민지

### 이한세

### 조혜주

<br>

## 🪄 작업 방식 / 회고 <a id="작업-방식--회고"></a>

### ⚡️ 깃 브랜치 전략

#### 💡 전략 개요

![alt text](./public/readme/gitflow-strategy.png)

**Git Flow 전략**(기능 개발·통합·배포 단계를 분리해 브랜치를 운영하는 방식)을 기반으로,  
`main` / `develop` / `feature` 중심으로 브랜치를 관리했습니다.  
운영 환경이 아닌 **개발·테스트 중심 프로젝트**이므로  
`hotfix` / `release` 브랜치는 상황에 맞게 생략했습니다.

<details>
<summary>🚫 Hotfix / Release 브랜치 미사용 사유</summary>
  Hotfix 브랜치 — 운영 중 긴급 수정용으로 사용되지만,  
  본 프로젝트는 실제 서비스 환경이 아니므로 긴급 패치가 필요하지 않았습니다.  
  Release 브랜치 — 일반적으로 QA 및 배포 준비용으로 사용되나,  
  본 프로젝트에서는 feature 리뷰 + develop 통합 테스트로 동일한 역할을 대체했습니다.
</details>

#### 🌳 브랜치 역할

| 브랜치      | 역할                                  |
| ----------- | ------------------------------------- |
| **main**    | 배포 및 출시용 안정 버전              |
| **develop** | 다음 출시 버전을 통합하는 개발 브랜치 |
| **feature** | 기능 단위 개발 브랜치                 |

#### 🔀 병합(Merge) 방식

| 방향                  | 방식               | 목적                                   |
| --------------------- | ------------------ | -------------------------------------- |
| `feature` → `develop` | **Squash & Merge** | 기능 단위 커밋만 남기고 중간 기록 정리 |
| `develop` → `main`    | **Merge Commit**   | 배포 단위 히스토리 유지                |

<details>
<summary>💬 develop 브랜치의 Squash & Merge 방식 선정 이유</summary>
  개발 중 반복 커밋(디자인 수정, 콘솔 로그 제거 등)을 압축해
  <strong>develop</strong> 브랜치를 깔끔하게 유지하기 위함입니다.
</details>

<details>
<summary>💬 feature 브랜치의 Merge Commit 방식 선정 이유</summary>
  Rebase(기존 커밋 히스토리를 재작성하여 선형으로 만드는 방식)는
  히스토리가 깔끔하다는 장점이 있지만,
  협업 중에는 이미 공유된 커밋이 변경되어 충돌 및 추적 혼란이 발생할 수 있습니다.
  반면 Merge Commit은 실제 개발 흐름과 병합 시점을 명확히 남겨
  협업 히스토리의 투명성과 추적성을 유지할 수 있습니다.
  따라서 팀 프로젝트에서는 안정성과 기록 일관성을 우선시해 Merge 방식을 선택했습니다.
</details>

<br>

---

### 📝 PR 규칙

모든 기능은 **브랜치 단위로 명확히 구분**하고,  
**PR(Pull Request)** 를 통해 팀원 간의 피드백, 코드 품질, 의사 결정을 공유했습니다.

#### 💡 기본 원칙

1. 각자 작업한 브랜치는 **`develop` 병합 전 반드시 Pull Request(PR)** 를 생성합니다.  
   → **하나의 기능(혹은 단위 작업) = 하나의 PR** 로 관리
2. 모든 PR은 **리뷰어의 승인 후 병합**하며, **작성자 본인이 직접 병합**합니다.  
   → 책임 있는 머지와 코드 일관성 유지
3. **PR 제목 규칙:**  
   `Feat: 보일러플레이트 세팅` 처럼, 이슈명 대괄호(`[]`) 안의 키워드와 함께 작성합니다.  
   예: `Feat: 로그인 API 구현`, `Fix: 히스토리 조회 오류 수정`

> 💬 **PR은 변경 의도와 배경을 함께 기록하여, 나중에 히스토리를 읽는 사람도 이해할 수 있도록 작성합니다.**

<br>

### 💭 개인별 회고

<details>
<summary>👩‍💻 김민지</summary>

#### 🌱 배운 점 및 인사이트

협업 과정에서 의견 충돌이 발생하더라도 합의점을 찾으려는 태도가 얼마나 중요한지를 체감했습니다.  
단순히 "누가 맞다"를 가리는 대신, 서로의 근거를 공유하고 설득하며  
결국 더 나은 방향으로 정리해 나갈 수 있었던 경험이었습니다.  
UX 관점에서의 설계 중요성을 다시 한 번 깨달았습니다.  
개발자 중심의 로직보다 사용자 입장에서의 흐름과 경험을 먼저 고려했을 때  
결과물의 완성도와 일관성이 훨씬 높아졌습니다.

<br />

#### 💎 프로젝트를 통해 좋았던 점

팀 전체가 문제 해결 중심의 대화를 유지하려고 노력했습니다.  
단순한 의사결정보다 "왜 이 방향을 택했는가"를 함께 고민하는 과정이 많았습니다.  
Git Flow + PR 리뷰 프로세스를 통해  
각자의 역할과 책임이 명확해지고, 코드 품질이 일정 수준 이상으로 유지될 수 있었습니다.  
Notion과 Slack을 통한 일정 공유·리뷰 히스토리 관리로  
커뮤니케이션 가시성이 높고, 피드백을 되짚어보기도 쉬웠습니다.

<br />

#### ⚠️ 아쉬웠던 점

초기에 너무 탄탄한 설계를 목표로 하다 보니,  
이후 수정이 필요한 부분에서도 쉽게 변경하기 어려운 구조가 되어  
오히려 일정이 지연된 적이 있었습니다.  
지금 돌이켜보면 Happy Path(가장 이상적인 사용자 흐름) 중심으로 빠르게 구현하고  
이후 반복 개선하는 방식이 더 효율적이었을 것 같습니다.  
일부 기능에서 서로 공통되는 영역(예: 상태 관리, 데이터 흐름) 에 대한 논의가 충분하지 않아  
나중에 중복 코드나 의도 불일치가 발생하는 경우가 있었습니다.  
이 부분은 초기 단계에서 명세와 데이터 흐름을 시각화한 뒤 합의하는 절차가 있었으면 더 좋았을 것 같습니다.

<br />

#### 🔮 향후 개선 방안

초기 설계 시 유연성 확보:
완벽한 구조보다, 변경 가능성을 고려한 모듈화 중심 설계로 진행  
공통 영역 사전 정의:
데이터 모델, 상태 흐름, 공용 훅 등은 개발 전 미리 문서화 및 논의  
리뷰 주기 고정화:
매일 정해진 시간에 PR 리뷰 타임을 확보해 피드백 속도 균일화

</details>

<br />

## 🔨 리팩토링 항목 <a id="리팩토링-항목"></a>
