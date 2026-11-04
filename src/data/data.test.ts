import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { allProjects, companies, formatDuration, monthsBetween, skillGroups } from '.';

const publicPath = (src: string) => join(__dirname, '../../public', src);

describe('프로젝트 데이터', () => {
  it('slug 가 겹치지 않는다 (상세 페이지 앵커로 쓰인다)', () => {
    const slugs = allProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('필수 내용이 비어 있지 않다', () => {
    for (const p of allProjects) {
      expect(p.title, p.slug).not.toBe('');
      expect(p.summary, p.slug).not.toBe('');
      expect(p.description, p.slug).not.toBe('');
    }
  });

  it('기간이 YYYY-MM 형식이고 시작이 끝보다 앞선다', () => {
    for (const p of allProjects) {
      expect(p.start, p.slug).toMatch(/^\d{4}-\d{2}$/);
      if (p.end) expect(p.end >= p.start, p.slug).toBe(true);
    }
  });

  it('참조하는 이미지 파일이 모두 있다', () => {
    for (const p of allProjects) {
      for (const src of [...p.images, ...(p.thumbnail ? [p.thumbnail] : [])]) {
        expect(existsSync(publicPath(src)), src).toBe(true);
      }
    }
  });

  it('메인에 노출할 프로젝트가 있다', () => {
    expect(allProjects.filter((p) => p.featured).length).toBeGreaterThan(0);
  });
});

describe('경력·기술 데이터', () => {
  it('회사 slug 가 겹치지 않는다', () => {
    const slugs = companies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('기술 아이콘 파일이 모두 있다', () => {
    for (const s of skillGroups.flatMap((g) => g.items)) {
      if (s.icon) expect(existsSync(publicPath(s.icon)), s.icon).toBe(true);
    }
  });
});

describe('기간 계산', () => {
  it('Notion 이력서 표기와 같게 계산한다', () => {
    expect(formatDuration(monthsBetween('2015-02', '2018-06'))).toBe('3년 4개월');
    expect(formatDuration(monthsBetween('2021-04', '2023-02'))).toBe('1년 10개월');
  });

  it('같은 달이면 1개월로 본다', () => {
    expect(monthsBetween('2024-04', '2024-04')).toBe(1);
  });
});
