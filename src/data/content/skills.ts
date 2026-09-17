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
