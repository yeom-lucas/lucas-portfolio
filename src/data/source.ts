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
