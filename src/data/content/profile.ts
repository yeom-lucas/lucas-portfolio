// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것 (설계 §11)
import type { Profile } from '../types';

export const profile: Profile = {
  name: '이루카스',
  headline: '대용량 수집과 정산을 설계합니다',
  intro:
    'EV 충전 인프라와 차량 데이터 도메인에서 7년간 백엔드를 맡았습니다. ' +
    '수집 파이프라인과 정산 시스템을 주로 다뤘고, 장애가 나면 돈이 틀어지는 영역이라 ' +
    '재처리와 정합성 검증에 특히 공을 들였습니다.',
  highlights: [
    { value: '7년', label: '경력' },
    { value: '200만', label: '일 정산 건수' },
    { value: '-90%', label: '알림 발송 지연' },
  ],
  links: {
    github: 'https://github.com/yeom-lucas',
    email: 'control5534@gmail.com',
    resumePdf: '/resume.pdf',
  },
};
