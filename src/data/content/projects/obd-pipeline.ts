// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { Project } from '../../types';

export const obdPipeline: Project = {
  slug: 'obd-pipeline',
  title: 'OBD 차량 데이터 수집 파이프라인',
  summary: '차량 단말에서 올라오는 주행 데이터를 실시간으로 받아 적재하는 파이프라인',
  period: '2021.06 – 2022.03',
  tech: ['Java', 'Spring Boot', 'MQTT', 'MongoDB'],
  thumbnail: {
    light: '/diagrams/placeholder-light.svg',
    dark: '/diagrams/placeholder-dark.svg',
    alt: '차량 단말에서 MQTT를 거쳐 저장소로 가는 수집 흐름도',
  },
  headlineMetric: { value: '1.2만 대', label: '동시 연결 단말' },
  context:
    '단말이 늘면서 기존 HTTP 폴링 방식이 한계에 부딪혔습니다. ' +
    '전송 주기를 늦추면 데이터가 성겨지고, 유지하면 서버가 버티지 못했습니다.',
  role: {
    teamSize: 4,
    scope: '수신 서버와 적재 계층을 담당했습니다. 단말 펌웨어는 다른 팀이 맡았습니다.',
  },
  architecture: {
    image: {
      light: '/diagrams/placeholder-light.svg',
      dark: '/diagrams/placeholder-dark.svg',
      alt: '차량 단말에서 MQTT를 거쳐 저장소로 가는 수집 흐름도',
    },
    description:
      '단말이 MQTT로 주행 데이터를 보내면 수신 서버가 파싱해 저장소에 적재합니다. ' +
      '단말별 마지막 상태는 별도로 캐시해 조회 부하를 분리했습니다.',
  },
  challenges: [
    {
      title: '폴링에서 상시 연결로 전환',
      problem:
        '단말 1만 대가 30초마다 HTTP 요청을 보내면서 수신 서버가 커넥션을 감당하지 못했습니다.',
      options: ['수신 서버 수평 확장', 'MQTT 기반 상시 연결로 전환'],
      decision:
        'MQTT를 택했습니다. 수평 확장은 비용만 늘 뿐 요청 자체가 줄지 않아, ' +
        '단말이 2만 대가 되면 같은 문제가 반복될 구조였습니다.',
      outcome: '수신 서버 대수를 절반으로 줄이면서 전송 주기를 30초에서 10초로 당겼습니다.',
    },
  ],
  results: [
    { value: '1.2만 대', label: '동시 연결 단말' },
    { value: '30초 → 10초', label: '데이터 수집 주기' },
  ],
};
