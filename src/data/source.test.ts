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
