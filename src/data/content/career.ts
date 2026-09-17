// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { CareerEntry } from '../types';

export const career: CareerEntry[] = [
  {
    company: '현재 회사',
    period: '2021.03 – 현재',
    title: '백엔드 엔지니어',
    achievements: [
      'EV 충전 정산 시스템 설계와 운영. 일 200만 건 규모의 배치 정산을 담당',
      '차량 OBD 데이터 수집 파이프라인 구축. MQTT 수신부터 적재까지',
      '사내 공통 알림 플랫폼을 맡아 발송 지연을 90% 단축',
    ],
  },
  {
    company: '이전 회사',
    period: '2019.01 – 2021.02',
    title: '백엔드 개발자',
    achievements: [
      '렌터카 예약·정산 API 개발 및 유지보수',
      '레거시 모놀리식 서비스의 정산 모듈 분리',
    ],
  },
];
