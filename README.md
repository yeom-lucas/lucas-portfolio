# 염승준 · 백엔드 엔지니어 포트폴리오

**🔗 https://yeom-lucas.github.io/lucas-portfolio/**

10년 넘게 모바일, 서버, 장비 연동을 거쳐 지금은 백엔드를 중심으로 개발하고 있습니다.
경력과 프로젝트 27개를 한곳에 정리한 개인 포트폴리오 사이트입니다.

## 화면 구성

| 경로 | 내용 |
|---|---|
| `/` | 왼쪽 고정 소개 패널(인사말·경력 숫자·메뉴·연락처) + 오른쪽 소개·경력·대표 프로젝트·기술 스택·학력 |
| `/career/:slug` | 회사별 상세. 프로젝트마다 설명, 담당 업무, 배운 점, 사용 기술, 스크린샷 갤러리 |
| `/projects` | 전체 프로젝트를 최신순으로 정리한 목록 |

넓은 화면(1200px 이상)에서는 왼쪽 패널이 고정되고 오른쪽만 스크롤되며, 좁은 화면에서는 위아래로 쌓입니다.

## 기술 스택

- React 19 · TypeScript · Vite 8
- React Router 7
- CSS Modules (별도 UI 라이브러리 없음)
- Vitest (데이터 무결성 테스트) · oxlint
- GitHub Actions + GitHub Pages 배포

## 시작하기

```bash
npm install
npm run dev        # 개발 서버
npm test           # 데이터 테스트
npm run lint       # 린트
npm run build      # 프로덕션 빌드 (dist/)
```

## 폴더 구조

```
src/
├── data/            # 화면에 보이는 모든 내용
│   ├── profile.ts   # 이름, 소개 문구, 연락처, 학력
│   ├── skills.ts    # 기술 스택
│   ├── companies/   # 회사별 경력과 프로젝트
│   └── index.ts     # 기간 계산 등 공용 함수
├── sections/        # 메인 페이지 섹션 (Hero, About, Career, Projects, Skills, Education)
├── pages/           # 라우트 단위 페이지
├── components/      # 공용 컴포넌트 (갤러리, 메뉴, 숫자 애니메이션 등)
└── styles/          # 디자인 토큰, 전역 스타일
public/
├── projects/        # 프로젝트 썸네일·스크린샷
├── skills/          # 기술 아이콘
└── profile.jpg      # 프로필 그림
```

## 내용 수정하기

내용은 모두 `src/data` 아래 파일에 있어서, 화면 코드를 건드리지 않고 고칠 수 있습니다.

- **소개 문구·연락처**: `src/data/profile.ts`
- **경력·프로젝트**: `src/data/companies/*.ts`
  - 메인에 보일 프로젝트는 `featured: true`
  - 이미지는 `public/projects/<slug>/`에 넣고 `images`에 경로 추가
  - 진행 중인 프로젝트·재직 중인 회사는 `end: null`
- **기술 스택**: `src/data/skills.ts` (아이콘은 `public/skills/`)

경력 기간, 프로젝트 수는 데이터에서 자동으로 계산됩니다.
`npm test`가 slug 중복, 날짜 형식, 이미지 파일 존재 여부를 검사합니다.

## 배포

`main` 브랜치에 푸시하면 GitHub Actions(`.github/workflows/deploy.yml`)가
테스트 → 빌드 → GitHub Pages 배포를 자동으로 진행합니다.

- 빌드 시 `BASE_PATH=/lucas-portfolio/`를 넘겨 하위 경로에 맞춥니다. 로컬과 다른 서버에서는 기본값 `/`가 쓰입니다.
- 상세 페이지에서 새로고침해도 열리도록 `404.html`을 함께 만듭니다.
- 다른 서버(예: Nginx)에 올릴 때는 `dist/`를 그대로 올리고, 없는 경로를 `index.html`로 돌려주도록 설정합니다.

  ```nginx
  location / {
    try_files $uri /index.html;
  }
  ```
