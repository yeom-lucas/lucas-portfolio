/** "YYYY-MM" */
export type YearMonth = string;

export interface Project {
  slug: string;
  title: string;
  /** 한 줄 소개 */
  summary: string;
  start: YearMonth;
  /** null 이면 진행 중 */
  end: YearMonth | null;
  team: string;
  description: string;
  tech: string[];
  tasks: string[];
  learnings: string[];
  /** 갤러리 이미지 (public 기준 경로) */
  images: string[];
  /** 로고형 썸네일. 없으면 첫 이미지, 그것도 없으면 label 타일 */
  thumbnail?: string;
  /** 이미지가 없을 때 타일에 쓸 짧은 이름 */
  label?: string;
  /** 메인 페이지에 노출 */
  featured?: boolean;
}

export interface Company {
  slug: string;
  name: string;
  description: string;
  roles: string[];
  start: YearMonth;
  end: YearMonth | null;
  projects: Project[];
}

export interface Skill {
  name: string;
  /** /skills/*.svg. 없으면 글자 배지 */
  icon?: string;
}

export interface SkillGroup {
  category: string;
  items: Skill[];
}

export interface Education {
  school: string;
  major: string;
  start: YearMonth;
  end: YearMonth;
  status: string;
}

export interface Profile {
  name: string;
  role: string;
  /** 프로필 그림 (public 기준 경로) */
  avatar: string;
  intro: string[];
  /** 오른쪽 소개 섹션 */
  about: {
    summary: string;
    strengths: { title: string; body: string }[];
  };
  email: string;
  github: string;
  education: Education[];
}
