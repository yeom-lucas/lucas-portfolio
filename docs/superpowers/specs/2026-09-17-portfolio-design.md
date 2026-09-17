# 백엔드 개발자 포트폴리오 사이트 — 설계

작성일: 2026-09-17

## 1. 개요

### 목적

두 가지를 동시에 노린다.

1. **채용 담당자·면접관에게 보여줄 포트폴리오** — 3초 안에 어떤 개발자인지, 30초 안에 무엇을 했는지 파악되어야 한다.
2. **프론트엔드 학습** — 결과물을 만들면서 React와 CSS를 실제로 익힌다.

두 목적의 비중은 **반반**이다. 배우되 결과물도 내놓을 수 있어야 하므로, 직접 짜는 영역(React 구조, CSS)과 빌려쓰는 영역(디자인 규칙)을 구분한다.

### 대상 독자

채용 담당자와 면접관. 인사팀이 1차로 거르는 경우와 개발자가 직접 보는 경우를 모두 상정한다.

### 제약

- 배포는 나중에 개인 NAS에 올린다. 지금은 배포 자동화·도메인·HTTPS를 다루지 않는다.
- 회사 프로젝트가 대부분이며, **코드는 핵심 부분 발췌(10~30줄) 수준까지 공개 가능**하다.
- 회사명·고객사명·성과 수치의 공개 범위는 프로젝트별로 개별 확인이 필요하다 (§11 참조).

### 성공 기준

- 채용 담당자가 메인 페이지만 보고 30초 안에 경력·주력 기술·대표 프로젝트를 파악할 수 있다.
- 프로젝트별 주소가 있어 지원하는 회사에 맞는 프로젝트만 골라 링크로 보낼 수 있다.
- 작성자가 **직접 수정할 수 있다.** 6개월 뒤에 프로젝트를 추가할 때 남의 코드처럼 느껴지지 않아야 한다.
- 단계 6을 마쳤을 때 `npm run build` 결과물이 정적 서버에서 정상 동작한다.

---

## 2. 확정된 결정

| 항목 | 결정 | 이유 |
|---|---|---|
| 학습/결과물 비중 | 반반 | 배움만 노리면 지치고, 결과만 노리면 나중에 수정 못 해 방치됨 |
| 데이터 위치 | 정적 파일로 시작, **데이터 계층 한 겹으로 분리** | 지금은 단순하게, 나중에 백엔드 API로 교체 가능하게 |
| 프레임워크 | **React + Vite + TypeScript** | 현업 공용어. Next.js는 지금 필요 없는 서버 개념이 React 학습을 흐림 |
| CSS | **순수 CSS + 토큰 → 이후 Tailwind 전환** | Tailwind는 CSS의 별명. CSS를 먼저 알아야 우회가 아닌 활용이 됨 |
| 페이지 구조 | **메인 1장 + 프로젝트 상세 N장** | 훑기와 파고들기를 분리. 프로젝트별 주소 확보 |
| 비주얼 톤 | **에디토리얼** (선·라벨로 칸을 나눈 기술 문서 인상) | 성과 수치를 첫 화면에 배치하기 좋고, 인사팀·개발팀 양쪽에 안전 |
| 강조색 | **앰버/러스트** | 따뜻한 회색과 어울려 인쇄물 인상을 살림. 개발자 사이트에서 드묾 |
| 포함 섹션 | 자기소개, 아키텍처 다이어그램, 성과 수치, 다크모드 | — |
| 제외 | 기술 블로그 | 꾸준히 쓰지 않으면 빈 채로 방치됨. 나중에 추가 가능 |

---

## 3. 화면 구성

### 3.1 메인 페이지 (`/`)

채용 담당자가 궁금해하는 순서대로 배치한다.

1. **첫 화면 (Hero)** — 이름 / 한 줄 정의 / 3~4줄 소개 / **성과 수치 3개** / 버튼(프로젝트 보기, 이력서 PDF, GitHub)
2. **기술 스택** — 카테고리별(언어 · 프레임워크 · 데이터 · 인프라)
3. **경력** — 세로 타임라인. 회사 / 기간 / 직책 + 핵심 성과 2~3줄
4. **프로젝트** — 카드 3~5개. 썸네일은 **아키텍처 구성도 축소판**을 쓴다 (의미 없는 사진 대신). 클릭 시 상세로 이동
5. **연락처** — 이메일, GitHub

**숙련도 막대(★★★☆☆, 80%)는 쓰지 않는다.** 자기 평가라 신뢰를 얻지 못하고, "Spring 90%"라고 적으면 오히려 깊게 찌를 구실이 된다. 대신 **주력(primary) / 사용 경험(experienced)** 두 단계로만 표시한다.

### 3.2 프로젝트 상세 (`/projects/:slug`)

1. **헤더** — 프로젝트명, 한 줄 요약, 기간, 기술 태그
2. **문제** — 왜 필요했는지 (배경)
3. **내 역할과 범위** — 팀 규모와 **내가 맡은 부분**
4. **아키텍처** — 구성도 + 설명
5. **핵심 해결 과제 1~3개** — 각각 `문제 → 고민한 선택지 → 택한 이유 → 결과` + **코드 발췌**
6. **결과** — 성과 수치
7. **아쉬운 점 / 다시 한다면** — 2~3줄 (선택)

**3번(역할)은 반드시 넣는다.** 팀 성과를 혼자 한 것처럼 쓰면 면접에서 무너진다. "6명 팀에서 정산 배치와 외부 연동을 담당"처럼 범위를 명시하면 오히려 신뢰가 오른다.

**5번은 "선택지와 이유"가 핵심이다.** "Kafka를 썼다"는 누구나 쓰고, "RabbitMQ와 비교했으나 재처리 요구 때문에 Kafka를 택했다"가 실력을 증명한다.

### 3.3 라우트

| 주소 | 화면 |
|---|---|
| `/` | 메인 |
| `/projects/:slug` | 프로젝트 상세 |
| 그 외 | 404 |

---

## 4. 기술 스택

- **React + Vite + TypeScript** — 버전은 단계 0에서 Vite 공식 템플릿이 설치하는 최신 안정판을 따른다
- **React Router** — 라우팅
- **Tailwind CSS** — 단계 3부터 도입 (그 전까지는 순수 CSS + CSS Modules)
- **Vitest** — 데이터 계층 단위 테스트
- **Shiki** — 코드 발췌의 문법 강조. 빌드 시점에 강조 처리를 끝내므로 브라우저에서 강조용 코드를 내려받지 않는다. 정적 사이트에 적합하다

---

## 5. 코드 구조

### 5.1 폴더

```
src/
├─ main.tsx                 진입점
├─ App.tsx                  주소 ↔ 화면 연결, Error Boundary
│
├─ routes/                  주소 하나 = 파일 하나 (컨트롤러 역할)
│  ├─ HomePage.tsx
│  ├─ ProjectDetailPage.tsx
│  └─ NotFoundPage.tsx
│
├─ sections/                메인 페이지의 각 덩어리 (한 번만 쓰임)
│  ├─ Hero.tsx
│  ├─ TechStack.tsx
│  ├─ Career.tsx
│  ├─ ProjectList.tsx
│  └─ Contact.tsx
│
├─ components/              재사용되는 조각 (여러 번 쓰임)
│  ├─ ProjectCard.tsx
│  ├─ TechTag.tsx
│  ├─ CodeBlock.tsx
│  ├─ ArchitectureDiagram.tsx
│  ├─ MetricList.tsx
│  ├─ ThemeToggle.tsx
│  └─ ErrorBoundary.tsx
│
├─ data/                    데이터 계층
│  ├─ types.ts
│  ├─ source.ts             데이터에 닿는 유일한 통로
│  ├─ source.test.ts
│  └─ content/
│     ├─ profile.ts
│     ├─ skills.ts
│     ├─ career.ts
│     └─ projects/
│        ├─ index.ts
│        └─ <slug>.ts
│
├─ styles/
│  ├─ tokens.css            디자인 토큰
│  └─ global.css
│
└─ hooks/
   ├─ useTheme.ts
   └─ useAsyncData.ts       로딩·에러 처리 공통화
public/
└─ diagrams/<slug>-light.svg, <slug>-dark.svg
```

`sections/`와 `components/`의 구분은 **재사용 여부**다. `components/`를 고치면 사이트 전체가 바뀌고, `sections/`를 고치면 그 자리만 바뀐다. 파일을 열기 전에 변경 파급 범위를 알 수 있도록 나눈다. 규모가 작아 이득이 크지는 않으나, 습관을 들이는 쪽을 택한다.

### 5.2 계층 규칙

- **`routes/`만 데이터를 불러온다.** 로딩·에러 처리도 여기서 한다.
- **`sections/`·`components/`는 props로 받기만 한다.** 데이터 출처를 모른다.
- 결과적으로 로딩 처리 지점은 **페이지당 한 곳**(총 2곳)이며, 나머지 컴포넌트는 받은 값을 그리는 순수한 조각이 된다.

### 5.3 데이터 계층

**내용을 JSON이 아니라 `.ts`로 둔다.** 필드 이름을 오타 내면 컴파일 에러가 난다. JSON은 조용히 `undefined`가 되어 화면에 빈칸이 뜬다.

**모든 조회 함수는 처음부터 비동기(`Promise`)로 만든다.** 지금은 파일에서 읽으므로 동기가 간단하지만, API로 바꾸면 반드시 비동기가 된다. 그때 동기였다면 이 함수를 쓰는 화면을 전부 고쳐야 하고, 이는 데이터 계층을 분리한 목적 자체를 무너뜨린다. 추가 비용은 코드 10줄 남짓이며, 그 대가로 API 전환 시 `source.ts` 내부만 고치면 된다.

```ts
// data/source.ts — 화면이 데이터에 접근하는 유일한 통로
export async function getProfile(): Promise<Profile>
export async function getSkills(): Promise<SkillGroup[]>
export async function getCareer(): Promise<CareerEntry[]>
export async function getProjects(): Promise<ProjectSummary[]>
export async function getProject(slug: string): Promise<Project | null>
```

### 5.4 타입 정의

```ts
// data/types.ts

export interface Metric {
  value: string;              // "200만"
  label: string;              // "일 정산 건수"
}

export interface ThemedImage {
  light: string;              // "/diagrams/settlement-light.svg"
  dark: string;
  alt: string;                // 이미지 실패 시·스크린리더용 설명
}

export interface Profile {
  name: string;
  headline: string;           // 한 줄 정의
  intro: string;              // 3~4줄 소개
  highlights: Metric[];       // 첫 화면 성과 수치 (3개)
  links: { github: string; email: string; resumePdf: string };
}

export interface Skill {
  name: string;
  level: 'primary' | 'experienced';   // 주력 / 사용 경험
}

export interface SkillGroup {
  category: string;           // "언어" | "프레임워크" | "데이터" | "인프라"
  items: Skill[];
}

export interface CareerEntry {
  company: string;
  period: string;             // "2021.03 – 현재"
  title: string;
  achievements: string[];     // 2~3줄
}

export interface ProjectSummary {
  slug: string;
  title: string;
  summary: string;
  period: string;
  tech: string[];
  thumbnail: ThemedImage;     // 구성도 축소판
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
  options: string[];          // 고민한 선택지
  decision: string;           // 택한 이유
  outcome: string;
  code?: CodeSnippet;
}

export interface Project extends ProjectSummary {
  context: string;            // 문제/배경
  role: { teamSize?: number; scope: string };
  architecture: { image: ThemedImage; description: string };
  challenges: Challenge[];    // 1~3개
  results: Metric[];
  retrospective?: string;
}
```

### 5.5 아키텍처 구성도

**Excalidraw 등으로 그려 SVG로 내보낸다.** 코드로 그리는 방식(HTML/CSS 박스 + 화살표 좌표 계산)은 반응형까지 맞추면 구성도 하나에 며칠이 걸리는데 결과물은 그림 파일과 같다. Mermaid는 텍스트 기반이라 수정이 쉽지만 자동 배치라 원하는 모양이 나오지 않는 경우가 많아, 보여주기용으로는 부적합하다.

다크모드 대응을 위해 **밝은 버전·어두운 버전 두 벌**을 만들어 `public/diagrams/`에 둔다.

---

## 6. 디자인 시스템

### 6.1 간격 — 4px 배수, 9단계

```
--space-1: 4px    --space-4: 16px   --space-12: 48px
--space-2: 8px    --space-6: 24px   --space-16: 64px
--space-3: 12px   --space-8: 32px   --space-24: 96px
```

### 6.2 타이포 — 7단계

에디토리얼 톤은 대비가 커야 살아난다 (본문 16px 옆에 제목 56px).

```
--text-xs: 12px   (라벨)      --text-xl:  28px
--text-sm: 14px               --text-2xl: 40px
--text-base: 16px (본문)      --text-3xl: 56px  (첫 화면 제목)
--text-lg: 20px
```

### 6.3 색 — 두 겹 구조

**1층: 실제 색 (고정)**

```css
--stone-50:  #fafaf9;   --stone-500: #78716c;   --stone-900: #1c1917;
--stone-200: #e7e5e4;   --stone-700: #44403c;
--stone-400: #a8a29e;   --stone-800: #292524;
--amber-400: #fbbf24;   --amber-700: #b45309;
```

**2층: 역할 (테마마다 다름)**

| 역할 | 라이트 | 다크 |
|---|---|---|
| `--color-bg` | `--stone-50` | `--stone-900` |
| `--color-surface` | `#ffffff` | `--stone-800` |
| `--color-text` | `--stone-900` | `--stone-50` |
| `--color-text-muted` | `--stone-500` | `--stone-400` |
| `--color-border` | `--stone-200` | `--stone-700` |
| `--color-border-strong` | `--stone-900` | `--stone-50` |
| `--color-accent` | `--amber-700` | `--amber-400` |

**컴포넌트는 2층만 사용한다.** 그러면 다크모드 전환이 2층 정의 블록 하나를 바꾸는 것으로 끝나고, 컴포넌트는 한 줄도 고치지 않는다. 컴포넌트에서 색을 직접 적으면 다크모드를 넣는 날 전체 파일을 뒤져야 한다.

**그림자 토큰은 만들지 않는다.** 에디토리얼 톤은 선(border)으로 영역을 나눈다. 필요해지면 그때 추가한다.

### 6.4 다크모드

- 첫 방문: OS 설정을 따른다 (`prefers-color-scheme`)
- 토글 시 `localStorage`에 저장 → 다음 방문에 유지
- 동작: `<html data-theme="dark">` 속성 변경

**깜빡임(FOUC) 처리:** React 실행 전에 브라우저가 먼저 HTML을 그리므로, 다크모드 사용자에게 흰 화면이 한 번 번쩍인다. `index.html`의 `<head>`에 인라인 스크립트를 넣어 React보다 먼저 테마를 적용한다.

### 6.5 CSS → Tailwind 전환

Tailwind는 CSS를 대체하는 것이 아니라 CSS에 별명을 붙인 것이다 (`p-6` = `padding: 1.5rem`). 따라서 **CSS를 먼저 익히고 Tailwind를 도입한다.** 순서를 뒤집으면 별명만 알고 본명을 모르는 상태가 된다.

전환은 §7의 **구현 단계 3**에서 일어난다. 그 시점에는 단계 1~2에서 순수 CSS로 만든 컴포넌트가 8개 남짓 있으며, 이를 옮기는 작업 자체가 대응 관계를 익히는 학습 구간이 된다. 전환 이후(단계 4~6)의 화면은 처음부터 Tailwind로 작성한다.

전환 시 **`tokens.css`의 변수를 Tailwind 설정에 연결한다.** 그러면 토큰이 Tailwind의 눈금이 된다 (`--space-4` → `p-4`, `--color-accent` → `text-accent`). 두 시스템이 경쟁하지 않고 **토큰이 Tailwind의 설정 역할**을 한다. 정확한 설정 문법은 설치 시점의 최신 버전 문서로 확인한다.

**최종 코드베이스는 Tailwind로 통일된다.** CSS Modules는 단계 3에서 제거한다.

다크모드(단계 5)를 전환 이후에 두는 것은 의도적이다. 색을 §6.3의 2층 구조로 관리하므로 Tailwind의 `dark:` 접두사를 거의 쓸 필요가 없다 — CSS 변수만 바뀌면 Tailwind 클래스는 그대로 따라온다. 이 점을 직접 확인하는 것이 학습 목표 중 하나다.

---

## 7. 구현 단계

각 단계 끝에 **눈으로 볼 수 있는 결과**가 남도록 자른다.

| 단계 | 만드는 것 | CSS 방식 | 새로 배우는 것 |
|---|---|---|---|
| **0** | 프로젝트 생성, 폴더 구조, git | — | npm, 빌드 도구의 역할, 개발 서버 |
| **1** | `tokens.css` + Hero 한 화면 | 순수 CSS | JSX, 컴포넌트, flex, 반응형 |
| **2** | 데이터 계층 + 기술 스택·경력·프로젝트 목록 | 순수 CSS | props, `useState`, `useEffect`, 목록 렌더링 |
| **3** | **Tailwind 전환** — 단계 1~2의 컴포넌트를 옮김 | → Tailwind | 유틸리티 방식, 토큰 연결 |
| **4** | 라우팅 + 프로젝트 상세 페이지 | Tailwind | 주소와 화면의 관계, 코드 블록, 구성도 |
| **5** | 다크모드 | Tailwind | 커스텀 훅, `localStorage`, 렌더링 순서 |
| **6** | 반응형 점검, 접근성, 공유 미리보기, 빌드 검증 | Tailwind | 마무리 실무 |

**전환(단계 3) 시점에 컴포넌트가 8개 남짓이다.** 이보다 늦추면 옮길 양이 많아지고, 이보다 당기면 순수 CSS로 flex·grid·반응형을 겪어볼 기회가 부족해진다.

**1단계가 가장 느릴 것으로 예상한다.** CSS로 원하는 위치에 요소를 놓는 일이 처음에는 답답하다. 이 구간을 통과하면 이후는 빨라진다.

각 단계가 끝날 때마다 `npx tsc --noEmit && npm run build`가 통과하는지 확인한다 (§8).

---

## 8. 검증 전략

값싸고 효과가 큰 것만 한다. 포트폴리오 규모에 테스트 피라미드를 세우지 않는다.

**① 타입 검사 + 빌드 통과** (가장 중요)

```bash
npx tsc --noEmit && npm run build
```

내용을 `.ts`로 둔 효과가 여기서 나온다. 필드 오타가 여기서 걸린다.

**② 데이터 계층 단위 테스트** (Vitest)

- **프로젝트 데이터 필수 항목 검사** — 새 프로젝트를 추가할 때 `role`이나 `results`를 빠뜨리면 화면에 빈칸이 조용히 뜬다. 이를 막는다.
- `getProject('없는슬러그')`가 `null`을 반환하는지
- `slug` 중복이 없는지

**③ 나머지는 브라우저에서 눈으로 확인**

컴포넌트 테스트는 이 규모에서 비용 대비 효과가 낮아 하지 않는다.

---

## 9. 에러 처리

| 상황 | 처리 |
|---|---|
| 없는 프로젝트 주소 (`/projects/오타`) | 404 페이지 + "목록으로" 링크 |
| 데이터 로딩 중 | **150ms를 넘을 때만** 로딩 표시. 파일 읽기는 즉시 끝나므로 로딩 문구가 1프레임 번쩍이는 것이 없는 것보다 거슬린다. API 전환 후에는 제 역할을 한다 |
| 데이터 로딩 실패 | 에러 메시지 + 다시 시도 버튼. 현재는 발생하지 않으나 API 전환 대비로 자리를 잡아둔다 |
| 구성도 이미지 실패 | `alt` 텍스트가 보이도록. 접근성에도 기여 |
| 예상 못 한 렌더링 에러 | 최상단 **Error Boundary**. 컴포넌트 하나가 터져도 전체가 흰 화면이 되지 않게 한다 |

로딩·에러 처리는 `useAsyncData` 훅으로 공통화하여 두 페이지에서 재사용한다.

---

## 10. 범위 밖 (지금 하지 않는 것)

- **기술 블로그** — 꾸준히 쓸 계획이 설 때 추가
- **백엔드 API·DB** — 데이터 계층만 교체 가능하게 열어둔다
- **배포 자동화, 도메인, HTTPS** — NAS에 올릴 때 별도로 다룬다
- **컴포넌트 테스트** — 학습 가치는 있으나 결과물 기여가 없다
- **다국어(i18n)** — 필요해지면 추가
- **방문자 분석, 조회수** — 백엔드가 생긴 뒤에 검토
- **그림자 토큰, 애니메이션 토큰** — 필요해질 때 추가

**NAS 배포 시 주의사항 (지금은 구현하지 않음):** `/projects/충전정산`으로 직접 접속하면 서버가 해당 경로의 파일을 찾지 못해 404를 낸다. 주소가 실제 파일이 아니라 React가 만든 가상 경로이기 때문이다. 정적 서버에 **"어떤 주소로 오든 `index.html`을 반환하라"** 는 설정이 필요하다.

---

## 11. 미결 사항

구현 전에 채워야 할 **내용**들이다. 설계에는 영향이 없다.

1. **프로필** — 이름 표기, 한 줄 정의, 3~4줄 소개, 첫 화면 성과 수치 3개
2. **경력** — 회사명, 기간, 직책, 회사별 핵심 성과
3. **프로젝트 선정** — 3~5개. 어느 프로젝트를 넣을지
4. **프로젝트별 공개 범위** — 회사명·고객사명·성과 수치를 실명/실수치로 쓸 수 있는지, 익명화가 필요한지
5. **코드 발췌 선정** — 프로젝트당 1~3개, 각 10~30줄
6. **아키텍처 구성도** — 프로젝트별 1장 (라이트/다크 2벌)
7. **이력서 PDF** — 파일 준비 여부

4번이 막히는 프로젝트는 "국내 EV 충전 사업자" 같은 익명 표기와 상대 수치("처리량 3배")로 대체한다.
