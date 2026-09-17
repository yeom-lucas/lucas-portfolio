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
