import { pmgrow } from './companies/pmgrow';
import { soluvis } from './companies/soluvis';
import { transcosmos2018 } from './companies/transcosmos-2018';
import { transcosmos2021 } from './companies/transcosmos-2021';
import type { Company, Project, YearMonth } from './types';

export { profile } from './profile';
export { skillGroups } from './skills';
export type * from './types';

/** 최신 경력이 위로 */
export const companies: Company[] = [pmgrow, transcosmos2021, transcosmos2018, soluvis];

export interface ProjectWithCompany extends Project {
  company: Company;
}

/** 전체 프로젝트, 시작일 최신순 */
export const allProjects: ProjectWithCompany[] = companies
  .flatMap((company) => company.projects.map((p) => ({ ...p, company })))
  .sort((a, b) => b.start.localeCompare(a.start));

export const featuredProjects = allProjects.filter((p) => p.featured);

export function findCompany(slug: string | undefined): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

// ── 기간 계산 ──

function toMonths(ym: YearMonth): number {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

function currentYearMonth(): YearMonth {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/** 달 차이 (최소 1개월). Notion 이력서의 재직 기간 표기와 맞춘다 */
export function monthsBetween(start: YearMonth, end: YearMonth | null): number {
  return Math.max(1, toMonths(end ?? currentYearMonth()) - toMonths(start));
}

export function formatDuration(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m}개월`;
  return m === 0 ? `${y}년` : `${y}년 ${m}개월`;
}

export function formatYearMonth(ym: YearMonth): string {
  return ym.replace('-', '.');
}

export function formatPeriod(start: YearMonth, end: YearMonth | null): string {
  if (end === start) return formatYearMonth(start);
  return `${formatYearMonth(start)} ~ ${end ? formatYearMonth(end) : '진행 중'}`;
}

export function totalCareerMonths(): number {
  return companies.reduce((sum, c) => sum + monthsBetween(c.start, c.end), 0);
}

/** 썸네일 우선순위: 로고 → 첫 스크린샷 → 없음(라벨 타일) */
export function thumbnailOf(project: Project): string | undefined {
  return project.thumbnail ?? project.images[0];
}
