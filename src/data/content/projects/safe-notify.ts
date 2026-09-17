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
      problem: '마케팅 대량 발송이 큐를 채우면 안전 관련 긴급 알림이 뒤에서 대기했습니다.',
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
