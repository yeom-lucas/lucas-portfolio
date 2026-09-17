# 포트폴리오 단계 0~2 구현 계획 (메인 페이지 완성)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 메인 페이지(첫 화면·기술 스택·경력·프로젝트 목록·연락처)가 실제 데이터로 동작하는 상태까지 만든다.

**Architecture:** Vite + React + TypeScript 정적 사이트. 내용은 `src/data/content/`의 `.ts` 파일에 두고, `src/data/source.ts`의 비동기 함수를 통해서만 접근한다. `routes/HomePage.tsx`만 데이터를 불러오고 `sections/`·`components/`는 props로 받는다. 스타일은 `styles/tokens.css`의 CSS 변수 + CSS Modules로 작성한다 (Tailwind는 계획 2에서 도입).

**Tech Stack:** React, Vite, TypeScript, CSS Modules, Vitest, Pretendard(웹폰트)

**설계 문서:** `docs/superpowers/specs/2026-09-17-portfolio-design.md`

**범위 밖 (계획 2·3에서 처리):** 라우팅, 프로젝트 상세 페이지, Tailwind 전환, 다크모드, 접근성 점검, 배포

---

## 파일 구조

이 계획에서 만드는 파일과 각자의 책임이다.

| 파일 | 책임 |
|---|---|
| `src/styles/tokens.css` | 디자인 토큰. 간격·글자·색 정의. 다른 곳에서 값을 직접 쓰지 않는다 |
| `src/styles/global.css` | 리셋, `body` 기본값, 공용 레이아웃 컨테이너 |
| `src/data/types.ts` | 모든 데이터 타입. 다른 파일이 참조만 하고 수정하지 않는다 |
| `src/data/content/*.ts` | 실제 내용. 타입만 맞추면 되고 로직은 없다 |
| `src/data/source.ts` | 데이터 접근의 유일한 통로. 화면은 이 파일만 부른다 |
| `src/data/source.test.ts` | 내용 파일의 유효성 검사 |
| `src/hooks/useAsyncData.ts` | 비동기 조회의 로딩·에러 상태 공통 처리 |
| `src/components/ErrorBoundary.tsx` | 렌더링 에러가 전체 흰 화면이 되는 것을 막는다 |
| `src/components/SectionHeader.tsx` | 섹션 제목(번호 + 제목 + 구분선). 모든 섹션이 공유 |
| `src/components/TechTag.tsx` | 기술 태그 하나 |
| `src/components/ProjectCard.tsx` | 프로젝트 카드 하나 |
| `src/sections/*.tsx` | 메인 페이지의 각 덩어리. 데이터를 props로 받아 그리기만 한다 |
| `src/routes/HomePage.tsx` | 데이터 조회 + 로딩·에러 처리 + 섹션 조립 |

각 컴포넌트는 같은 이름의 `.module.css`를 옆에 둔다 (`Hero.tsx` ↔ `Hero.module.css`).

---

## Task 1: Vite 프로젝트 생성

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`
- Modify: 없음 (`.gitignore`는 기존 것을 유지)

- [ ] **Step 1: 임시 디렉터리에 Vite 프로젝트를 만든다**

현재 디렉터리에 `.git`과 `docs/`가 이미 있어서 `npm create vite@latest .`은 대화형 확인 프롬프트를 띄운다. 임시 폴더에 만든 뒤 옮긴다.

```bash
cd /Users/lucas/repository/lucas-portfolio
npm create vite@latest .vite-tmp -- --template react-ts
```

버전에 따라 "Install with npm and start now?" 같은 추가 질문이 뜰 수 있다. 뜨면 **No**를 고른다 (설치는 Step 2에서 한다). 프레임워크/변형을 다시 묻는다면 React → TypeScript를 고른다.

- [ ] **Step 2: 파일을 현재 디렉터리로 옮긴다**

Vite가 만든 `.gitignore`는 버리고 기존 것을 유지한다 (`.superpowers/` 제외 규칙이 들어 있다).

```bash
rm .vite-tmp/.gitignore
cp -R .vite-tmp/. .
rm -rf .vite-tmp
npm install
```

- [ ] **Step 3: 불필요한 기본 파일을 지운다**

```bash
rm src/App.css src/index.css src/assets/react.svg public/vite.svg
rmdir src/assets 2>/dev/null || true
```

- [ ] **Step 4: 폴더 구조를 만든다**

```bash
mkdir -p src/routes src/sections src/components src/hooks src/styles \
         src/data/content/projects public/diagrams
```

- [ ] **Step 5: `src/App.tsx`를 임시 내용으로 교체한다**

지운 `App.css`를 참조하고 있어 그대로 두면 빌드가 깨진다.

```tsx
// src/App.tsx
export default function App() {
  return <div>포트폴리오 준비 중</div>;
}
```

- [ ] **Step 6: `src/main.tsx`에서 `index.css` import를 제거한다**

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 7: 개발 서버가 뜨는지 확인한다**

Run: `npm run dev`
Expected: `Local: http://localhost:5173/` 출력. 브라우저에서 "포트폴리오 준비 중"이 보인다. 확인 후 `Ctrl+C`로 종료.

- [ ] **Step 8: 타입 검사와 빌드를 확인한다**

Run: `npx tsc --noEmit && npm run build`
Expected: 에러 없이 종료, `dist/` 생성

- [ ] **Step 9: 커밋**

```bash
git add -A
git commit -m "chore: Vite + React + TypeScript 프로젝트 생성"
```

---

## Task 2: 디자인 토큰과 전역 스타일

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`
- Modify: `src/main.tsx`, `index.html`

- [ ] **Step 1: `src/styles/tokens.css`를 작성한다**

설계 §6의 토큰을 그대로 옮긴다. 색은 **1층(실제 색) / 2층(역할)** 두 겹으로 나눈다. 컴포넌트는 2층만 사용한다.

```css
/* src/styles/tokens.css */
:root {
  /* ── 1층: 실제 색 (고정) ── */
  --stone-50: #fafaf9;
  --stone-100: #f5f5f4;
  --stone-200: #e7e5e4;
  --stone-400: #a8a29e;
  --stone-500: #78716c;
  --stone-700: #44403c;
  --stone-800: #292524;
  --stone-900: #1c1917;
  --amber-400: #fbbf24;
  --amber-700: #b45309;

  /* ── 2층: 역할 (다크모드에서 이 블록만 바뀐다) ── */
  --color-bg: var(--stone-50);
  --color-surface: #ffffff;
  --color-text: var(--stone-900);
  --color-text-muted: var(--stone-500);
  --color-border: var(--stone-200);
  --color-border-strong: var(--stone-900);
  --color-accent: var(--amber-700);

  /* ── 간격: 4px 배수 ── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* ── 글자 크기 ── */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
  --text-xl: 28px;
  --text-2xl: 40px;
  --text-3xl: 56px;

  /* ── 그 외 ── */
  --font-sans: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
    'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
  --container: 56rem;
  --radius: 6px;
}

/* 화면이 좁을 때 큰 글자만 줄인다 */
@media (max-width: 640px) {
  :root {
    --text-3xl: 34px;
    --text-2xl: 28px;
    --text-xl: 22px;
  }
}
```

- [ ] **Step 2: `src/styles/global.css`를 작성한다**

```css
/* src/styles/global.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img,
svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  cursor: pointer;
}

h1,
h2,
h3 {
  line-height: 1.2;
  letter-spacing: -0.022em;
  font-weight: 700;
}

/* 페이지 가로 폭을 잡는 공용 컨테이너 */
.container {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--space-6);
}
```

- [ ] **Step 3: `src/main.tsx`에서 두 파일을 불러온다**

`tokens.css`가 먼저 와야 `global.css`에서 변수를 쓸 수 있다.

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/global.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 4: `index.html`에 폰트와 문서 정보를 넣는다**

Pretendard는 한글 웹에서 널리 쓰이는 폰트다. `<head>` 안의 `<title>`을 바꾸고 폰트 링크와 `lang`을 넣는다.

```html
<!-- index.html -->
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>이루카스 — 백엔드 엔지니어</title>
    <meta name="description" content="EV 충전 인프라 백엔드 엔지니어 포트폴리오" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: 토큰이 적용됐는지 눈으로 확인한다**

Run: `npm run dev`
Expected: 배경이 순백이 아닌 따뜻한 흰색(`#fafaf9`)이고, 글꼴이 Pretendard로 바뀐다. 확인 후 종료.

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "feat: 디자인 토큰과 전역 스타일 추가"
```

---

## Task 3: 데이터 타입 정의

**Files:**
- Create: `src/data/types.ts`

- [ ] **Step 1: `src/data/types.ts`를 작성한다**

설계 §5.4 그대로다.

```ts
// src/data/types.ts

export interface Metric {
  /** "200만" */
  value: string;
  /** "일 정산 건수" */
  label: string;
}

export interface ThemedImage {
  light: string;
  dark: string;
  /** 이미지 로딩 실패 시·스크린리더용 설명 */
  alt: string;
}

export interface Profile {
  name: string;
  /** 한 줄 정의 */
  headline: string;
  /** 3~4줄 소개 */
  intro: string;
  /** 첫 화면 성과 수치 (3개) */
  highlights: Metric[];
  links: {
    github: string;
    email: string;
    resumePdf: string;
  };
}

/** 주력 / 사용 경험 — 숙련도 퍼센트는 쓰지 않는다 (설계 §3.1) */
export type SkillLevel = 'primary' | 'experienced';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  /** "언어" | "프레임워크" | "데이터" | "인프라" */
  category: string;
  items: Skill[];
}

export interface CareerEntry {
  company: string;
  /** "2021.03 – 현재" */
  period: string;
  title: string;
  /** 2~3줄 */
  achievements: string[];
}

export interface ProjectSummary {
  slug: string;
  title: string;
  summary: string;
  period: string;
  tech: string[];
  /** 아키텍처 구성도 축소판 */
  thumbnail: ThemedImage;
  headlineMetric?: Metric;
}

export interface CodeSnippet {
  language: string;
  caption?: string;
  code: string;
}

export interface Challenge {
  title: string;
  problem: string;
  /** 고민한 선택지 */
  options: string[];
  /** 택한 이유 */
  decision: string;
  outcome: string;
  code?: CodeSnippet;
}

export interface Project extends ProjectSummary {
  /** 문제/배경 */
  context: string;
  role: {
    teamSize?: number;
    scope: string;
  };
  architecture: {
    image: ThemedImage;
    description: string;
  };
  /** 1~3개 */
  challenges: Challenge[];
  results: Metric[];
  retrospective?: string;
}
```

- [ ] **Step 2: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/data/types.ts
git commit -m "feat: 포트폴리오 데이터 타입 정의"
```

---

## Task 4: 내용 파일과 구성도 자리표

**Files:**
- Create: `src/data/content/profile.ts`, `skills.ts`, `career.ts`, `projects/charging-settlement.ts`, `projects/obd-pipeline.ts`, `projects/safe-notify.ts`, `projects/index.ts`
- Create: `public/diagrams/placeholder-light.svg`, `public/diagrams/placeholder-dark.svg`

여기 들어가는 값은 **실제로 동작하는 샘플**이다. 설계 §11에 따라 본인 내용으로 교체해야 하며, 교체는 이 파일들만 고치면 된다.

- [ ] **Step 1: 구성도 자리표 SVG 두 개를 만든다**

실제 구성도는 나중에 Excalidraw로 그려 `<slug>-light.svg` / `<slug>-dark.svg`로 넣는다. 그 전까지 이미지가 깨지지 않도록 자리표를 쓴다.

```xml
<!-- public/diagrams/placeholder-light.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
  <rect width="320" height="180" fill="#f5f5f4"/>
  <g fill="none" stroke="#a8a29e" stroke-width="1.5">
    <rect x="24" y="66" width="72" height="40" rx="4"/>
    <rect x="124" y="66" width="72" height="40" rx="4"/>
    <rect x="224" y="66" width="72" height="40" rx="4"/>
    <path d="M96 86h28M196 86h28"/>
  </g>
  <g fill="#78716c" font-family="sans-serif" font-size="9" text-anchor="middle">
    <text x="60" y="90">수집</text>
    <text x="160" y="90">처리</text>
    <text x="260" y="90">저장</text>
    <text x="160" y="150">구성도 준비 중</text>
  </g>
</svg>
```

```xml
<!-- public/diagrams/placeholder-dark.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
  <rect width="320" height="180" fill="#292524"/>
  <g fill="none" stroke="#78716c" stroke-width="1.5">
    <rect x="24" y="66" width="72" height="40" rx="4"/>
    <rect x="124" y="66" width="72" height="40" rx="4"/>
    <rect x="224" y="66" width="72" height="40" rx="4"/>
    <path d="M96 86h28M196 86h28"/>
  </g>
  <g fill="#a8a29e" font-family="sans-serif" font-size="9" text-anchor="middle">
    <text x="60" y="90">수집</text>
    <text x="160" y="90">처리</text>
    <text x="260" y="90">저장</text>
    <text x="160" y="150">구성도 준비 중</text>
  </g>
</svg>
```

- [ ] **Step 2: `src/data/content/profile.ts`를 작성한다**

```ts
// src/data/content/profile.ts
// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것 (설계 §11)
import type { Profile } from '../types';

export const profile: Profile = {
  name: '이루카스',
  headline: '대용량 수집과 정산을 설계합니다',
  intro:
    'EV 충전 인프라와 차량 데이터 도메인에서 7년간 백엔드를 맡았습니다. ' +
    '수집 파이프라인과 정산 시스템을 주로 다뤘고, 장애가 나면 돈이 틀어지는 영역이라 ' +
    '재처리와 정합성 검증에 특히 공을 들였습니다.',
  highlights: [
    { value: '7년', label: '경력' },
    { value: '200만', label: '일 정산 건수' },
    { value: '-90%', label: '알림 발송 지연' },
  ],
  links: {
    github: 'https://github.com/yeom-lucas',
    email: 'control5534@gmail.com',
    resumePdf: '/resume.pdf',
  },
};
```

- [ ] **Step 3: `src/data/content/skills.ts`를 작성한다**

```ts
// src/data/content/skills.ts
// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    category: '언어',
    items: [
      { name: 'Java', level: 'primary' },
      { name: 'Kotlin', level: 'experienced' },
      { name: 'TypeScript', level: 'experienced' },
    ],
  },
  {
    category: '프레임워크',
    items: [
      { name: 'Spring Boot', level: 'primary' },
      { name: 'Spring Batch', level: 'primary' },
      { name: 'JPA / QueryDSL', level: 'primary' },
    ],
  },
  {
    category: '데이터',
    items: [
      { name: 'PostgreSQL', level: 'primary' },
      { name: 'MongoDB', level: 'experienced' },
      { name: 'Redis', level: 'experienced' },
      { name: 'Kafka', level: 'primary' },
    ],
  },
  {
    category: '인프라',
    items: [
      { name: 'Docker', level: 'experienced' },
      { name: 'AWS', level: 'experienced' },
      { name: 'GitHub Actions', level: 'experienced' },
    ],
  },
];
```

- [ ] **Step 4: `src/data/content/career.ts`를 작성한다**

```ts
// src/data/content/career.ts
// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { CareerEntry } from '../types';

export const career: CareerEntry[] = [
  {
    company: '현재 회사',
    period: '2021.03 – 현재',
    title: '백엔드 엔지니어',
    achievements: [
      'EV 충전 정산 시스템 설계와 운영. 일 200만 건 규모의 배치 정산을 담당',
      '차량 OBD 데이터 수집 파이프라인 구축. MQTT 수신부터 적재까지',
      '사내 공통 알림 플랫폼을 맡아 발송 지연을 90% 단축',
    ],
  },
  {
    company: '이전 회사',
    period: '2019.01 – 2021.02',
    title: '백엔드 개발자',
    achievements: [
      '렌터카 예약·정산 API 개발 및 유지보수',
      '레거시 모놀리식 서비스의 정산 모듈 분리',
    ],
  },
];
```

- [ ] **Step 5: 프로젝트 파일 세 개를 작성한다**

`Project` 타입의 모든 필수 항목을 채운다. `challenges`와 `results`는 계획 2의 상세 페이지에서 쓰이지만, 지금 채워두면 Task 5의 유효성 검사가 이를 검증한다.

```ts
// src/data/content/projects/charging-settlement.ts
// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { Project } from '../../types';

export const chargingSettlement: Project = {
  slug: 'charging-settlement',
  title: 'EV 충전 정산 시스템',
  summary: '충전 이력을 집계해 사업자·로밍사에 정산하는 배치 시스템',
  period: '2022.04 – 2024.08',
  tech: ['Java', 'Spring Batch', 'Kafka', 'PostgreSQL'],
  thumbnail: {
    light: '/diagrams/placeholder-light.svg',
    dark: '/diagrams/placeholder-dark.svg',
    alt: '충전 이력 수집에서 정산 결과 적재까지의 흐름도',
  },
  headlineMetric: { value: '200만', label: '일 정산 건수' },
  context:
    '충전 사업자마다 정산 주기와 요율 체계가 달라 수작업 보정이 잦았고, ' +
    '한 건이라도 누락되면 매출이 틀어지는 구조였습니다.',
  role: {
    teamSize: 6,
    scope: '정산 배치와 외부 사업자 연동을 담당했습니다. 프론트와 인프라는 다른 분들이 맡았습니다.',
  },
  architecture: {
    image: {
      light: '/diagrams/placeholder-light.svg',
      dark: '/diagrams/placeholder-dark.svg',
      alt: '충전 이력 수집에서 정산 결과 적재까지의 흐름도',
    },
    description:
      '충전기에서 올라온 이력을 Kafka로 받아 적재하고, 일 단위 Spring Batch가 ' +
      '사업자별 요율을 적용해 정산 결과를 만듭니다.',
  },
  challenges: [
    {
      title: '재처리 가능한 정산 파이프라인',
      problem:
        '요율이 소급 변경되면 이미 끝난 정산을 다시 계산해야 했는데, ' +
        '기존 구조는 원본 이력을 덮어써서 되돌릴 수가 없었습니다.',
      options: [
        '정산 결과만 보정하는 별도 테이블 추가',
        '원본 이력을 불변으로 두고 정산을 언제든 재실행 가능하게 재설계',
      ],
      decision:
        '두 번째를 택했습니다. 보정 테이블은 당장은 빠르지만 보정의 보정이 쌓이면 ' +
        '결국 무엇이 맞는 값인지 아무도 모르게 됩니다.',
      outcome: '소급 정산 요청 처리 시간이 이틀에서 30분으로 줄었습니다.',
      code: {
        language: 'java',
        caption: '정산 실행 단위를 멱등하게 만든 부분',
        code: `@Bean
public Step settleStep(JobRepository repo, PlatformTransactionManager tx) {
    return new StepBuilder("settleStep", repo)
        .<ChargeLog, Settlement>chunk(1000, tx)
        .reader(chargeLogReader(null))
        .processor(settlementProcessor())
        // 같은 (사업자, 정산일)로 다시 실행하면 기존 결과를 지우고 다시 쓴다
        .writer(idempotentSettlementWriter())
        .faultTolerant()
        .retryLimit(3)
        .retry(TransientDataAccessException.class)
        .build();
}`,
      },
    },
  ],
  results: [
    { value: '200만', label: '일 정산 건수' },
    { value: '2일 → 30분', label: '소급 정산 처리 시간' },
  ],
  retrospective:
    '정산 결과를 검증하는 리포트를 처음부터 만들었다면 초기 6개월의 수작업 대조를 ' +
    '줄일 수 있었을 것 같습니다.',
};
```

```ts
// src/data/content/projects/obd-pipeline.ts
// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { Project } from '../../types';

export const obdPipeline: Project = {
  slug: 'obd-pipeline',
  title: 'OBD 차량 데이터 수집 파이프라인',
  summary: '차량 단말에서 올라오는 주행 데이터를 실시간으로 받아 적재하는 파이프라인',
  period: '2021.06 – 2022.03',
  tech: ['Java', 'Spring Boot', 'MQTT', 'MongoDB'],
  thumbnail: {
    light: '/diagrams/placeholder-light.svg',
    dark: '/diagrams/placeholder-dark.svg',
    alt: '차량 단말에서 MQTT를 거쳐 저장소로 가는 수집 흐름도',
  },
  headlineMetric: { value: '1.2만 대', label: '동시 연결 단말' },
  context:
    '단말이 늘면서 기존 HTTP 폴링 방식이 한계에 부딪혔습니다. ' +
    '전송 주기를 늦추면 데이터가 성겨지고, 유지하면 서버가 버티지 못했습니다.',
  role: {
    teamSize: 4,
    scope: '수신 서버와 적재 계층을 담당했습니다. 단말 펌웨어는 다른 팀이 맡았습니다.',
  },
  architecture: {
    image: {
      light: '/diagrams/placeholder-light.svg',
      dark: '/diagrams/placeholder-dark.svg',
      alt: '차량 단말에서 MQTT를 거쳐 저장소로 가는 수집 흐름도',
    },
    description:
      '단말이 MQTT로 주행 데이터를 보내면 수신 서버가 파싱해 저장소에 적재합니다. ' +
      '단말별 마지막 상태는 별도로 캐시해 조회 부하를 분리했습니다.',
  },
  challenges: [
    {
      title: '폴링에서 상시 연결로 전환',
      problem:
        '단말 1만 대가 30초마다 HTTP 요청을 보내면서 수신 서버가 커넥션을 감당하지 못했습니다.',
      options: ['수신 서버 수평 확장', 'MQTT 기반 상시 연결로 전환'],
      decision:
        'MQTT를 택했습니다. 수평 확장은 비용만 늘 뿐 요청 자체가 줄지 않아, ' +
        '단말이 2만 대가 되면 같은 문제가 반복될 구조였습니다.',
      outcome: '수신 서버 대수를 절반으로 줄이면서 전송 주기를 30초에서 10초로 당겼습니다.',
    },
  ],
  results: [
    { value: '1.2만 대', label: '동시 연결 단말' },
    { value: '30초 → 10초', label: '데이터 수집 주기' },
  ],
};
```

```ts
// src/data/content/projects/safe-notify.ts
// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { Project } from '../../types';

export const safeNotify: Project = {
  slug: 'safe-notify',
  title: '사내 공통 알림 플랫폼',
  summary: '여러 서비스가 공유하는 알림 발송 기반. 채널 추가를 서비스별 작업 없이 처리',
  period: '2024.09 – 2025.12',
  tech: ['Java', 'Spring Boot', 'Redis', 'PostgreSQL'],
  thumbnail: {
    light: '/diagrams/placeholder-light.svg',
    dark: '/diagrams/placeholder-dark.svg',
    alt: '알림 요청 접수부터 채널별 발송까지의 흐름도',
  },
  headlineMetric: { value: '-90%', label: '발송 지연' },
  context:
    '서비스마다 알림 발송 코드를 따로 갖고 있어, 채널을 하나 추가하면 ' +
    '모든 서비스가 각자 같은 작업을 반복했습니다.',
  role: {
    teamSize: 3,
    scope: '발송 큐와 채널 어댑터 구조를 설계하고 구현했습니다.',
  },
  architecture: {
    image: {
      light: '/diagrams/placeholder-light.svg',
      dark: '/diagrams/placeholder-dark.svg',
      alt: '알림 요청 접수부터 채널별 발송까지의 흐름도',
    },
    description:
      '각 서비스는 알림 요청만 보내고, 플랫폼이 우선순위에 따라 큐에 넣어 ' +
      '채널별 어댑터로 발송합니다. 채널 추가는 어댑터 하나를 더하는 것으로 끝납니다.',
  },
  challenges: [
    {
      title: '긴급 알림이 대량 발송에 밀리는 문제',
      problem:
        '마케팅 대량 발송이 큐를 채우면 안전 관련 긴급 알림이 뒤에서 대기했습니다.',
      options: ['큐를 우선순위별로 분리', '대량 발송에 전송 속도 제한 적용'],
      decision:
        '둘 다 적용했습니다. 큐 분리만으로는 대량 발송이 외부 채널의 한도를 ' +
        '먹어치우는 문제가 남았습니다.',
      outcome: '긴급 알림 평균 발송 지연이 90% 줄었습니다.',
    },
  ],
  results: [
    { value: '-90%', label: '긴급 알림 발송 지연' },
    { value: '5개', label: '통합된 서비스' },
  ],
};
```

- [ ] **Step 6: `src/data/content/projects/index.ts`를 작성한다**

메인 페이지에 보이는 **순서**가 이 배열 순서다. 가장 보여주고 싶은 것을 앞에 둔다.

```ts
// src/data/content/projects/index.ts
import type { Project } from '../../types';
import { chargingSettlement } from './charging-settlement';
import { obdPipeline } from './obd-pipeline';
import { safeNotify } from './safe-notify';

/** 배열 순서가 곧 화면 표시 순서다 */
export const projects: Project[] = [chargingSettlement, obdPipeline, safeNotify];
```

- [ ] **Step 7: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음. 에러가 난다면 타입과 내용이 어긋난 것이므로 내용 파일을 고친다.

- [ ] **Step 8: 커밋**

```bash
git add -A
git commit -m "feat: 포트폴리오 내용 파일과 구성도 자리표 추가"
```

---

## Task 5: Vitest 설정과 데이터 유효성 테스트 (실패 확인)

**Files:**
- Modify: `vite.config.ts`, `package.json`
- Create: `src/data/source.test.ts`

설계 §8에 따라 **데이터 계층만** 테스트한다. 컴포넌트 테스트는 하지 않는다.

- [ ] **Step 1: Vitest를 설치한다**

```bash
npm install -D vitest
```

- [ ] **Step 2: `vite.config.ts`에 테스트 설정을 넣는다**

`vitest/config`의 `defineConfig`를 써야 `test` 항목에 타입이 붙는다.

```ts
// vite.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 3: `package.json`에 테스트 스크립트를 추가한다**

`scripts` 항목에 다음 두 줄을 넣는다.

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: 실패하는 테스트를 작성한다**

```ts
// src/data/source.test.ts
import { describe, expect, it } from 'vitest';
import { getCareer, getProfile, getProject, getProjects, getSkills } from './source';

describe('getProfile', () => {
  it('성과 수치를 정확히 3개 반환한다', async () => {
    const profile = await getProfile();
    expect(profile.highlights).toHaveLength(3);
  });

  it('이름과 한 줄 정의가 비어 있지 않다', async () => {
    const profile = await getProfile();
    expect(profile.name.trim()).not.toBe('');
    expect(profile.headline.trim()).not.toBe('');
  });
});

describe('getSkills', () => {
  it('카테고리마다 기술이 하나 이상 있다', async () => {
    const groups = await getSkills();
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(group.items.length, `${group.category}가 비어 있다`).toBeGreaterThan(0);
    }
  });
});

describe('getCareer', () => {
  it('경력마다 성과가 하나 이상 있다', async () => {
    const entries = await getCareer();
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.achievements.length, `${entry.company}에 성과가 없다`).toBeGreaterThan(0);
    }
  });
});

describe('getProjects', () => {
  it('slug가 중복되지 않는다', async () => {
    const summaries = await getProjects();
    const slugs = summaries.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('요약에 필수 항목이 모두 채워져 있다', async () => {
    const summaries = await getProjects();
    expect(summaries.length).toBeGreaterThan(0);
    for (const p of summaries) {
      expect(p.slug.trim(), 'slug가 비었다').not.toBe('');
      expect(p.title.trim(), `${p.slug}: title이 비었다`).not.toBe('');
      expect(p.summary.trim(), `${p.slug}: summary가 비었다`).not.toBe('');
      expect(p.period.trim(), `${p.slug}: period가 비었다`).not.toBe('');
      expect(p.tech.length, `${p.slug}: tech가 비었다`).toBeGreaterThan(0);
      expect(p.thumbnail.alt.trim(), `${p.slug}: thumbnail.alt가 비었다`).not.toBe('');
    }
  });
});

describe('getProject', () => {
  it('없는 slug면 null을 반환한다', async () => {
    expect(await getProject('존재하지-않는-슬러그')).toBeNull();
  });

  it('상세에 필수 항목이 모두 채워져 있다', async () => {
    const summaries = await getProjects();
    for (const summary of summaries) {
      const project = await getProject(summary.slug);
      expect(project, `${summary.slug}를 찾지 못했다`).not.toBeNull();
      expect(project!.context.trim(), `${summary.slug}: context가 비었다`).not.toBe('');
      expect(project!.role.scope.trim(), `${summary.slug}: role.scope가 비었다`).not.toBe('');
      expect(
        project!.architecture.description.trim(),
        `${summary.slug}: architecture.description이 비었다`,
      ).not.toBe('');
      expect(project!.challenges.length, `${summary.slug}: challenges가 비었다`).toBeGreaterThan(0);
      expect(project!.results.length, `${summary.slug}: results가 비었다`).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 5: 테스트를 실행해 실패를 확인한다**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./source"` (아직 `source.ts`가 없다)

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "test: 데이터 계층 유효성 테스트 추가 (아직 실패)"
```

---

## Task 6: 데이터 계층 구현

**Files:**
- Create: `src/data/source.ts`

- [ ] **Step 1: `src/data/source.ts`를 작성한다**

설계 §5.3에 따라 **모든 함수를 비동기로 만든다.** 지금은 파일에서 읽지만, 나중에 API로 바꿀 때 이 파일 내부만 고치면 되도록 하기 위함이다.

```ts
// src/data/source.ts
//
// 화면이 데이터에 접근하는 유일한 통로다.
// 컴포넌트는 content/ 를 직접 import 하지 않는다.
//
// 나중에 백엔드 API로 바꿀 때는 이 파일의 함수 본문만 fetch 로 교체하면 된다.
// 호출하는 쪽은 이미 비동기를 전제로 하고 있어 고칠 것이 없다.

import { career } from './content/career';
import { profile } from './content/profile';
import { projects } from './content/projects';
import { skillGroups } from './content/skills';
import type { CareerEntry, Profile, Project, ProjectSummary, SkillGroup } from './types';

export async function getProfile(): Promise<Profile> {
  return profile;
}

export async function getSkills(): Promise<SkillGroup[]> {
  return skillGroups;
}

export async function getCareer(): Promise<CareerEntry[]> {
  return career;
}

export async function getProjects(): Promise<ProjectSummary[]> {
  return projects.map(toSummary);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

/** 목록에는 상세 내용(challenges, results 등)을 내보내지 않는다 */
function toSummary(project: Project): ProjectSummary {
  const { slug, title, summary, period, tech, thumbnail, headlineMetric } = project;
  return { slug, title, summary, period, tech, thumbnail, headlineMetric };
}
```

- [ ] **Step 2: 테스트가 통과하는지 확인한다**

Run: `npm test`
Expected: PASS — 모든 테스트 통과 (8 passed)

- [ ] **Step 3: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/data/source.ts
git commit -m "feat: 데이터 계층 구현"
```

---

## Task 7: 비동기 조회 훅과 Error Boundary

**Files:**
- Create: `src/hooks/useAsyncData.ts`, `src/components/ErrorBoundary.tsx`, `src/components/ErrorBoundary.module.css`

- [ ] **Step 1: `src/hooks/useAsyncData.ts`를 작성한다**

설계 §9의 **"150ms를 넘을 때만 로딩 표시"** 규칙이 여기 들어간다. 파일 읽기는 즉시 끝나므로 로딩 문구가 한 프레임 번쩍이는데, 그게 없는 것보다 거슬린다.

```ts
// src/hooks/useAsyncData.ts
import { useEffect, useRef, useState } from 'react';

/** 로딩 표시를 시작하기까지 기다리는 시간 (설계 §9) */
const LOADING_DELAY_MS = 150;

export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  /** 조회가 150ms를 넘겼을 때만 true */
  isLoading: boolean;
  reload: () => void;
}

export function useAsyncData<T>(loader: () => Promise<T>): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // loader가 매 렌더마다 새 함수여도 조회를 다시 돌리지 않도록 ref에 담는다
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let cancelled = false;
    setError(null);

    const timer = setTimeout(() => {
      if (!cancelled) setIsLoading(true);
    }, LOADING_DELAY_MS);

    loaderRef
      .current()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e : new Error(String(e)));
      })
      .finally(() => {
        clearTimeout(timer);
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [attempt]);

  return { data, error, isLoading, reload: () => setAttempt((n) => n + 1) };
}
```

- [ ] **Step 2: `src/components/ErrorBoundary.module.css`를 작성한다**

```css
/* src/components/ErrorBoundary.module.css */
.wrap {
  max-width: var(--container);
  margin-inline: auto;
  padding: var(--space-24) var(--space-6);
}

.title {
  font-size: var(--text-xl);
  margin-bottom: var(--space-3);
}

.message {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin-bottom: var(--space-6);
}

.button {
  border: 1px solid var(--color-border-strong);
  background: none;
  color: var(--color-text);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  font-size: var(--text-sm);
}
```

- [ ] **Step 3: `src/components/ErrorBoundary.tsx`를 작성한다**

Error Boundary는 React에서 **클래스 컴포넌트로만** 만들 수 있다. 함수 컴포넌트에는 대응되는 기능이 없다.

```tsx
// src/components/ErrorBoundary.tsx
import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * 하위 컴포넌트에서 렌더링 에러가 나면 전체가 흰 화면이 되는 것을 막는다.
 * 이벤트 핸들러나 비동기 코드의 에러는 잡지 못한다 (그쪽은 useAsyncData가 담당).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('렌더링 에러:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.wrap}>
          <h1 className={styles.title}>화면을 그리는 중 문제가 생겼습니다</h1>
          <p className={styles.message}>{this.state.error.message}</p>
          <button className={styles.button} onClick={() => window.location.reload()}>
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

- [ ] **Step 4: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: 비동기 조회 훅과 Error Boundary 추가"
```

---

## Task 8: 공용 컴포넌트 (SectionHeader, TechTag)

**Files:**
- Create: `src/components/SectionHeader.tsx`, `SectionHeader.module.css`, `src/components/TechTag.tsx`, `TechTag.module.css`

- [ ] **Step 1: `src/components/SectionHeader.module.css`를 작성한다**

에디토리얼 톤의 핵심 장치다. 번호 + 제목 + 굵은 구분선.

```css
/* src/components/SectionHeader.module.css */
.header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-strong);
  margin-bottom: var(--space-8);
}

.number {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
}

.title {
  font-size: var(--text-lg);
  font-weight: 700;
}
```

- [ ] **Step 2: `src/components/SectionHeader.tsx`를 작성한다**

```tsx
// src/components/SectionHeader.tsx
import styles from './SectionHeader.module.css';

interface Props {
  /** "01" 같은 두 자리 번호 */
  number: string;
  title: string;
}

export function SectionHeader({ number, title }: Props) {
  return (
    <div className={styles.header}>
      <span className={styles.number}>{number}</span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
```

- [ ] **Step 3: `src/components/TechTag.module.css`를 작성한다**

주력은 테두리를 진하게, 사용 경험은 흐리게. 설계 §3.1의 두 단계 표기다.

```css
/* src/components/TechTag.module.css */
.tag {
  display: inline-block;
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.primary {
  border-color: var(--color-border-strong);
  color: var(--color-text);
  font-weight: 600;
}
```

- [ ] **Step 4: `src/components/TechTag.tsx`를 작성한다**

```tsx
// src/components/TechTag.tsx
import type { SkillLevel } from '../data/types';
import styles from './TechTag.module.css';

interface Props {
  name: string;
  /** 생략하면 일반 태그로 그린다 (프로젝트 카드의 기술 목록 등) */
  level?: SkillLevel;
}

export function TechTag({ name, level }: Props) {
  const className = level === 'primary' ? `${styles.tag} ${styles.primary}` : styles.tag;
  return <span className={className}>{name}</span>;
}
```

- [ ] **Step 5: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "feat: SectionHeader와 TechTag 공용 컴포넌트 추가"
```

---

## Task 9: 첫 화면 (Hero)

**Files:**
- Create: `src/sections/Hero.tsx`, `src/sections/Hero.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/sections/Hero.module.css`를 작성한다**

```css
/* src/sections/Hero.module.css */
.hero {
  padding-block: var(--space-8) var(--space-24);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: var(--text-xs);
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-strong);
  margin-bottom: var(--space-16);
}

.label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.headline {
  font-size: var(--text-3xl);
  margin-bottom: var(--space-6);
  max-width: 16em;
}

.intro {
  color: var(--color-text-muted);
  max-width: 34em;
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-8);
}

.stats {
  display: flex;
  margin-bottom: var(--space-8);
}

.stat {
  flex: 1;
  padding-left: var(--space-4);
  border-left: 1px solid var(--color-border);
}

.stat:first-child {
  padding-left: 0;
  border-left: none;
}

.statValue {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.statLabel {
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-top: var(--space-1);
}

.actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.primaryAction,
.secondaryAction {
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  border: 1px solid transparent;
}

.primaryAction {
  background: var(--color-text);
  color: var(--color-bg);
}

.secondaryAction {
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .topbar {
    margin-bottom: var(--space-12);
  }

  .stats {
    flex-direction: column;
    gap: var(--space-4);
  }

  .stat {
    padding-left: 0;
    border-left: none;
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-border);
  }

  .stat:first-child {
    padding-top: 0;
    border-top: none;
  }
}
```

- [ ] **Step 2: `src/sections/Hero.tsx`를 작성한다**

`profile`을 props로 받는다. 이 컴포넌트는 데이터가 어디서 왔는지 모른다.

```tsx
// src/sections/Hero.tsx
import type { Profile } from '../data/types';
import styles from './Hero.module.css';

interface Props {
  profile: Profile;
}

export function Hero({ profile }: Props) {
  return (
    <header className={`${styles.hero} container`}>
      <div className={styles.topbar}>
        <span>
          {profile.name} — 백엔드 엔지니어
        </span>
        <span>Portfolio</span>
      </div>

      <p className={styles.label}>Backend · EV Infrastructure</p>
      <h1 className={styles.headline}>{profile.headline}</h1>
      <p className={styles.intro}>{profile.intro}</p>

      <div className={styles.stats}>
        {profile.highlights.map((metric) => (
          <div key={metric.label} className={styles.stat}>
            <div className={styles.statValue}>{metric.value}</div>
            <div className={styles.statLabel}>{metric.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <a className={styles.primaryAction} href="#projects">
          프로젝트 보기
        </a>
        <a className={styles.secondaryAction} href={profile.links.resumePdf}>
          이력서 PDF
        </a>
        <a
          className={styles.secondaryAction}
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: `src/App.tsx`에서 임시로 Hero를 띄운다**

`HomePage`는 Task 14에서 만든다. 지금은 눈으로 확인만 한다.

```tsx
// src/App.tsx
import { Hero } from './sections/Hero';
import { profile } from './data/content/profile';

export default function App() {
  return <Hero profile={profile} />;
}
```

- [ ] **Step 4: 브라우저에서 확인한다**

Run: `npm run dev`
Expected: 상단 가로선, 앰버색 라벨, 큰 제목, 소개 문단, 수치 3개가 세로선으로 구분되어 보인다. 브라우저 창을 640px 아래로 줄이면 수치가 세로로 쌓인다.

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: 첫 화면(Hero) 섹션 추가"
```

---

## Task 10: 기술 스택 섹션

**Files:**
- Create: `src/sections/TechStack.tsx`, `src/sections/TechStack.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/sections/TechStack.module.css`를 작성한다**

카테고리 이름이 왼쪽, 태그가 오른쪽에 오는 2열 구조다.

```css
/* src/sections/TechStack.module.css */
.section {
  padding-bottom: var(--space-24);
}

.group {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.group:last-child {
  border-bottom: none;
}

.category {
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding-top: var(--space-1);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.legend {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-6);
}

@media (max-width: 640px) {
  .group {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}
```

- [ ] **Step 2: `src/sections/TechStack.tsx`를 작성한다**

```tsx
// src/sections/TechStack.tsx
import { SectionHeader } from '../components/SectionHeader';
import { TechTag } from '../components/TechTag';
import type { SkillGroup } from '../data/types';
import styles from './TechStack.module.css';

interface Props {
  groups: SkillGroup[];
}

export function TechStack({ groups }: Props) {
  return (
    <section className={`${styles.section} container`} id="skills">
      <SectionHeader number="01" title="기술 스택" />

      {groups.map((group) => (
        <div key={group.category} className={styles.group}>
          <div className={styles.category}>{group.category}</div>
          <div className={styles.tags}>
            {group.items.map((skill) => (
              <TechTag key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      ))}

      <div className={styles.legend}>
        <span>진한 테두리 = 주력</span>
        <span>흐린 테두리 = 사용 경험</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `src/App.tsx`에 추가한다**

```tsx
// src/App.tsx
import { Hero } from './sections/Hero';
import { TechStack } from './sections/TechStack';
import { profile } from './data/content/profile';
import { skillGroups } from './data/content/skills';

export default function App() {
  return (
    <>
      <Hero profile={profile} />
      <TechStack groups={skillGroups} />
    </>
  );
}
```

- [ ] **Step 4: 브라우저에서 확인한다**

Run: `npm run dev`
Expected: "01 기술 스택" 제목 아래 카테고리 4개가 가로선으로 구분되고, 주력 태그가 더 진하게 보인다.

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: 기술 스택 섹션 추가"
```

---

## Task 11: 경력 섹션

**Files:**
- Create: `src/sections/Career.tsx`, `src/sections/Career.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/sections/Career.module.css`를 작성한다**

```css
/* src/sections/Career.module.css */
.section {
  padding-bottom: var(--space-24);
}

.entry {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: var(--space-6);
  padding-block: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

.entry:first-of-type {
  padding-top: 0;
}

.entry:last-of-type {
  border-bottom: none;
}

.period {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding-top: var(--space-1);
}

.company {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-1);
}

.title {
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.achievements {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: var(--space-2);
}

.achievement {
  position: relative;
  padding-left: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.achievement::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: var(--space-2);
  height: 1px;
  background: var(--color-border-strong);
}

@media (max-width: 640px) {
  .entry {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}
```

- [ ] **Step 2: `src/sections/Career.tsx`를 작성한다**

```tsx
// src/sections/Career.tsx
import { SectionHeader } from '../components/SectionHeader';
import type { CareerEntry } from '../data/types';
import styles from './Career.module.css';

interface Props {
  entries: CareerEntry[];
}

export function Career({ entries }: Props) {
  return (
    <section className={`${styles.section} container`} id="career">
      <SectionHeader number="02" title="경력" />

      {entries.map((entry) => (
        <article key={`${entry.company}-${entry.period}`} className={styles.entry}>
          <div className={styles.period}>{entry.period}</div>
          <div>
            <h3 className={styles.company}>{entry.company}</h3>
            <p className={styles.title}>{entry.title}</p>
            <ul className={styles.achievements}>
              {entry.achievements.map((achievement) => (
                <li key={achievement} className={styles.achievement}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
```

- [ ] **Step 3: `src/App.tsx`에 추가한다**

```tsx
// src/App.tsx
import { Hero } from './sections/Hero';
import { TechStack } from './sections/TechStack';
import { Career } from './sections/Career';
import { profile } from './data/content/profile';
import { skillGroups } from './data/content/skills';
import { career } from './data/content/career';

export default function App() {
  return (
    <>
      <Hero profile={profile} />
      <TechStack groups={skillGroups} />
      <Career entries={career} />
    </>
  );
}
```

- [ ] **Step 4: 브라우저에서 확인한다**

Run: `npm run dev`
Expected: 왼쪽에 기간, 오른쪽에 회사·직책·성과가 보인다. 성과 앞에 짧은 가로 막대가 붙는다. 좁은 화면에서는 위아래로 쌓인다.

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: 경력 섹션 추가"
```

---

## Task 12: 프로젝트 목록 섹션

**Files:**
- Create: `src/components/ProjectCard.tsx`, `ProjectCard.module.css`, `src/sections/ProjectList.tsx`, `ProjectList.module.css`
- Modify: `src/App.tsx`

상세 페이지는 계획 2에서 만든다. 지금은 카드까지다.

- [ ] **Step 1: `src/components/ProjectCard.module.css`를 작성한다**

```css
/* src/components/ProjectCard.module.css */
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--color-surface);
  height: 100%;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.period {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.title {
  font-size: var(--text-lg);
}

.summary {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  flex: 1;
}

.metric {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.metricValue {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-accent);
}

.metricLabel {
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}
```

- [ ] **Step 2: `src/components/ProjectCard.tsx`를 작성한다**

계획 2에서 라우팅을 붙이면 이 카드를 링크로 감싼다. 지금은 카드만 그린다.

```tsx
// src/components/ProjectCard.tsx
import type { ProjectSummary } from '../data/types';
import { TechTag } from './TechTag';
import styles from './ProjectCard.module.css';

interface Props {
  project: ProjectSummary;
}

export function ProjectCard({ project }: Props) {
  return (
    <article className={styles.card}>
      <img
        className={styles.thumbnail}
        src={project.thumbnail.light}
        alt={project.thumbnail.alt}
        loading="lazy"
      />
      <div className={styles.body}>
        <p className={styles.period}>{project.period}</p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        <div className={styles.tags}>
          {project.tech.map((name) => (
            <TechTag key={name} name={name} />
          ))}
        </div>

        {project.headlineMetric && (
          <div className={styles.metric}>
            <span className={styles.metricValue}>{project.headlineMetric.value}</span>
            <span className={styles.metricLabel}>{project.headlineMetric.label}</span>
          </div>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 3: `src/sections/ProjectList.module.css`를 작성한다**

```css
/* src/sections/ProjectList.module.css */
.section {
  padding-bottom: var(--space-24);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: `src/sections/ProjectList.tsx`를 작성한다**

```tsx
// src/sections/ProjectList.tsx
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/SectionHeader';
import type { ProjectSummary } from '../data/types';
import styles from './ProjectList.module.css';

interface Props {
  projects: ProjectSummary[];
}

export function ProjectList({ projects }: Props) {
  return (
    <section className={`${styles.section} container`} id="projects">
      <SectionHeader number="03" title="프로젝트" />
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `src/App.tsx`에 추가한다**

`getProjects()`가 비동기라 임시 확인에서는 쓰기 번거롭다. Task 14에서 `HomePage`가 제대로 처리한다. 지금은 내용 파일에서 직접 요약을 만들어 확인한다.

```tsx
// src/App.tsx
import { Hero } from './sections/Hero';
import { TechStack } from './sections/TechStack';
import { Career } from './sections/Career';
import { ProjectList } from './sections/ProjectList';
import { profile } from './data/content/profile';
import { skillGroups } from './data/content/skills';
import { career } from './data/content/career';
import { projects } from './data/content/projects';

export default function App() {
  return (
    <>
      <Hero profile={profile} />
      <TechStack groups={skillGroups} />
      <Career entries={career} />
      <ProjectList projects={projects} />
    </>
  );
}
```

- [ ] **Step 6: 브라우저에서 확인한다**

Run: `npm run dev`
Expected: 카드 3개가 2열로 배치된다 (세 번째는 다음 줄). 구성도 자리표 이미지가 보이고, 앰버색 수치가 카드 하단에 있다. 720px 아래로 줄이면 1열이 된다.

- [ ] **Step 7: 커밋**

```bash
git add -A
git commit -m "feat: 프로젝트 목록 섹션 추가"
```

---

## Task 13: 연락처 섹션

**Files:**
- Create: `src/sections/Contact.tsx`, `src/sections/Contact.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/sections/Contact.module.css`를 작성한다**

```css
/* src/sections/Contact.module.css */
.section {
  padding-bottom: var(--space-24);
}

.links {
  display: grid;
  gap: var(--space-4);
}

.link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-lg);
}

.link:hover .value {
  color: var(--color-accent);
}

.label {
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.value {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  word-break: break-all;
}

.footer {
  margin-top: var(--space-16);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
```

- [ ] **Step 2: `src/sections/Contact.tsx`를 작성한다**

```tsx
// src/sections/Contact.tsx
import { SectionHeader } from '../components/SectionHeader';
import type { Profile } from '../data/types';
import styles from './Contact.module.css';

interface Props {
  profile: Profile;
}

export function Contact({ profile }: Props) {
  return (
    <section className={`${styles.section} container`} id="contact">
      <SectionHeader number="04" title="연락처" />

      <div className={styles.links}>
        <a className={styles.link} href={`mailto:${profile.links.email}`}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{profile.links.email}</span>
        </a>
        <a className={styles.link} href={profile.links.github} target="_blank" rel="noreferrer">
          <span className={styles.label}>GitHub</span>
          <span className={styles.value}>{profile.links.github}</span>
        </a>
      </div>

      <p className={styles.footer}>© {new Date().getFullYear()} {profile.name}</p>
    </section>
  );
}
```

- [ ] **Step 3: `src/App.tsx`에 추가한다**

```tsx
// src/App.tsx
import { Hero } from './sections/Hero';
import { TechStack } from './sections/TechStack';
import { Career } from './sections/Career';
import { ProjectList } from './sections/ProjectList';
import { Contact } from './sections/Contact';
import { profile } from './data/content/profile';
import { skillGroups } from './data/content/skills';
import { career } from './data/content/career';
import { projects } from './data/content/projects';

export default function App() {
  return (
    <>
      <Hero profile={profile} />
      <TechStack groups={skillGroups} />
      <Career entries={career} />
      <ProjectList projects={projects} />
      <Contact profile={profile} />
    </>
  );
}
```

- [ ] **Step 4: 브라우저에서 확인한다**

Run: `npm run dev`
Expected: 이메일·GitHub 링크가 가로선으로 구분되어 보이고, 마우스를 올리면 값이 앰버색으로 바뀐다.

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: 연락처 섹션 추가"
```

---

## Task 14: HomePage 조립 — 데이터 계층 연결

**Files:**
- Create: `src/routes/HomePage.tsx`, `src/routes/HomePage.module.css`
- Modify: `src/App.tsx`

여기서 **설계 §5.2의 계층 규칙이 실제로 적용된다.** 지금까지 `App.tsx`가 내용 파일을 직접 import 했지만, 이제 `HomePage`가 `source.ts`를 통해서만 데이터를 가져온다.

- [ ] **Step 1: `src/routes/HomePage.module.css`를 작성한다**

```css
/* src/routes/HomePage.module.css */
.state {
  max-width: var(--container);
  margin-inline: auto;
  padding: var(--space-24) var(--space-6);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.retry {
  display: block;
  margin-top: var(--space-4);
  border: 1px solid var(--color-border-strong);
  background: none;
  color: var(--color-text);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  font-size: var(--text-sm);
}
```

- [ ] **Step 2: `src/routes/HomePage.tsx`를 작성한다**

`useAsyncData`를 한 번만 써서 네 가지 데이터를 동시에 가져온다. 로딩·에러 처리 지점이 이 파일 한 곳뿐이다.

```tsx
// src/routes/HomePage.tsx
import { useAsyncData } from '../hooks/useAsyncData';
import { getCareer, getProfile, getProjects, getSkills } from '../data/source';
import { Hero } from '../sections/Hero';
import { TechStack } from '../sections/TechStack';
import { Career } from '../sections/Career';
import { ProjectList } from '../sections/ProjectList';
import { Contact } from '../sections/Contact';
import styles from './HomePage.module.css';

function loadHomeData() {
  return Promise.all([getProfile(), getSkills(), getCareer(), getProjects()]);
}

export function HomePage() {
  const { data, error, isLoading, reload } = useAsyncData(loadHomeData);

  if (error) {
    return (
      <div className={styles.state}>
        <p>내용을 불러오지 못했습니다: {error.message}</p>
        <button className={styles.retry} onClick={reload}>
          다시 시도
        </button>
      </div>
    );
  }

  // 150ms 안에 끝나면 이 화면은 나타나지 않는다 (설계 §9)
  if (isLoading) {
    return <div className={styles.state}>불러오는 중…</div>;
  }

  if (!data) {
    return <div className={styles.state} />;
  }

  const [profile, skillGroups, career, projects] = data;

  return (
    <>
      <Hero profile={profile} />
      <TechStack groups={skillGroups} />
      <Career entries={career} />
      <ProjectList projects={projects} />
      <Contact profile={profile} />
    </>
  );
}
```

- [ ] **Step 3: `src/App.tsx`를 교체한다**

내용 파일 import를 전부 걷어내고 Error Boundary로 감싼다.

```tsx
// src/App.tsx
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './routes/HomePage';

export default function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
```

- [ ] **Step 4: 계층 규칙이 지켜졌는지 확인한다**

`routes/` 밖에서 `data/content/`를 직접 불러오는 곳이 없어야 한다.

Run: `grep -rn "data/content" src --include=*.tsx`
Expected: 결과 없음 (출력이 비어 있음)

Run: `grep -rn "from '../data/source'" src/routes`
Expected: `src/routes/HomePage.tsx`만 나온다

- [ ] **Step 5: 브라우저에서 확인한다**

Run: `npm run dev`
Expected: Task 13과 똑같은 화면이 보인다. 로딩 문구는 나타나지 않는다 (파일 읽기가 150ms보다 빠르다).

- [ ] **Step 6: 에러 처리가 동작하는지 확인한다**

`src/data/source.ts`의 `getProfile`을 임시로 고쳐서 확인한다.

```ts
export async function getProfile(): Promise<Profile> {
  throw new Error('테스트용 에러');
}
```

Expected: "내용을 불러오지 못했습니다: 테스트용 에러"와 다시 시도 버튼이 보인다.

확인 후 **반드시 원래대로 되돌린다.**

```ts
export async function getProfile(): Promise<Profile> {
  return profile;
}
```

Run: `git diff src/data/source.ts`
Expected: 출력이 비어 있음 (되돌리기 완료)

- [ ] **Step 7: 전체 검증**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: 테스트 통과, 타입 에러 없음, 빌드 성공

- [ ] **Step 8: 커밋**

```bash
git add -A
git commit -m "feat: HomePage에서 데이터 계층을 통해 내용을 불러오도록 연결"
```

---

## Task 15: 반응형 점검과 마무리

**Files:**
- Modify: 점검 중 발견한 CSS 파일

- [ ] **Step 1: 세 가지 폭에서 확인한다**

Run: `npm run dev`

브라우저 개발자도구의 반응형 모드로 아래 폭을 확인한다.

| 폭 | 확인할 것 |
|---|---|
| 375px (모바일) | 가로 스크롤이 생기지 않는다. 첫 화면 수치가 세로로 쌓인다. 프로젝트 카드가 1열이다 |
| 768px (태블릿) | 경력의 기간/내용 2열이 유지된다. 프로젝트 카드가 1열이다 |
| 1280px (데스크톱) | 본문이 가운데 정렬되고 좌우 여백이 생긴다. 프로젝트 카드가 2열이다 |

가로 스크롤이 생기면 원인이 되는 요소에 `min-width: 0` 또는 `overflow-wrap: anywhere`를 준다.

- [ ] **Step 2: 빌드 결과물이 실제로 동작하는지 확인한다**

개발 서버가 아니라 **빌드 결과**를 봐야 한다.

```bash
npm run build
npm run preview
```

Expected: `http://localhost:4173/`에서 개발 서버와 같은 화면이 보인다. 구성도 이미지가 깨지지 않는다.

- [ ] **Step 3: 최종 검증**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: 모두 통과

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "fix: 반응형 점검 후 레이아웃 보정"
```

- [ ] **Step 5: 푸시**

```bash
git push
```

---

## 완료 기준

- [ ] `npm test` 통과 (데이터 유효성 검사 8건)
- [ ] `npx tsc --noEmit` 에러 없음
- [ ] `npm run build` 성공
- [ ] `npm run preview`에서 메인 페이지 전체가 정상 표시
- [ ] 375px / 768px / 1280px에서 가로 스크롤 없음
- [ ] `grep -rn "data/content" src --include=*.tsx` 결과 없음 (계층 규칙 준수)

## 다음 계획으로 넘길 것

- 라우팅과 프로젝트 상세 페이지 → 계획 2
- Tailwind 전환 → 계획 2
- 다크모드 (`thumbnail.dark`가 아직 쓰이지 않는다) → 계획 3
- 접근성 점검, 공유 미리보기 메타 태그, NAS 배포 → 계획 3
- **내용 교체** — `src/data/content/`의 샘플을 본인 것으로 (설계 §11)
- **구성도 작성** — Excalidraw로 그려 `public/diagrams/<slug>-{light,dark}.svg`로 저장
