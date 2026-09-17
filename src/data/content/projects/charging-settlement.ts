// ⚠️ 샘플 값이다. 본인 내용으로 교체할 것
import type { Project } from '../../types';

export const chargingSettlement: Project = {
  slug: 'charging-settlement',
  title: 'EV 충전 정산 시스템',
  summary: '충전 이력을 집계해 사업자·로밍사에 정산하는 배치 시스템',
  period: '2022.04 – 2024.08',
  tech: ['Java', 'Spring Batch', 'Kafka', 'PostgreSQL'],
  thumbnail: {
    light: '/diagrams/placeholder-light.svg',
    dark: '/diagrams/placeholder-dark.svg',
    alt: '충전 이력 수집에서 정산 결과 적재까지의 흐름도',
  },
  headlineMetric: { value: '200만', label: '일 정산 건수' },
  context:
    '충전 사업자마다 정산 주기와 요율 체계가 달라 수작업 보정이 잦았고, ' +
    '한 건이라도 누락되면 매출이 틀어지는 구조였습니다.',
  role: {
    teamSize: 6,
    scope: '정산 배치와 외부 사업자 연동을 담당했습니다. 프론트와 인프라는 다른 분들이 맡았습니다.',
  },
  architecture: {
    image: {
      light: '/diagrams/placeholder-light.svg',
      dark: '/diagrams/placeholder-dark.svg',
      alt: '충전 이력 수집에서 정산 결과 적재까지의 흐름도',
    },
    description:
      '충전기에서 올라온 이력을 Kafka로 받아 적재하고, 일 단위 Spring Batch가 ' +
      '사업자별 요율을 적용해 정산 결과를 만듭니다.',
  },
  challenges: [
    {
      title: '재처리 가능한 정산 파이프라인',
      problem:
        '요율이 소급 변경되면 이미 끝난 정산을 다시 계산해야 했는데, ' +
        '기존 구조는 원본 이력을 덮어써서 되돌릴 수가 없었습니다.',
      options: [
        '정산 결과만 보정하는 별도 테이블 추가',
        '원본 이력을 불변으로 두고 정산을 언제든 재실행 가능하게 재설계',
      ],
      decision:
        '두 번째를 택했습니다. 보정 테이블은 당장은 빠르지만 보정의 보정이 쌓이면 ' +
        '결국 무엇이 맞는 값인지 아무도 모르게 됩니다.',
      outcome: '소급 정산 요청 처리 시간이 이틀에서 30분으로 줄었습니다.',
      code: {
        language: 'java',
        caption: '정산 실행 단위를 멱등하게 만든 부분',
        code: `@Bean
public Step settleStep(JobRepository repo, PlatformTransactionManager tx) {
    return new StepBuilder("settleStep", repo)
        .<ChargeLog, Settlement>chunk(1000, tx)
        .reader(chargeLogReader(null))
        .processor(settlementProcessor())
        // 같은 (사업자, 정산일)로 다시 실행하면 기존 결과를 지우고 다시 쓴다
        .writer(idempotentSettlementWriter())
        .faultTolerant()
        .retryLimit(3)
        .retry(TransientDataAccessException.class)
        .build();
}`,
      },
    },
  ],
  results: [
    { value: '200만', label: '일 정산 건수' },
    { value: '2일 → 30분', label: '소급 정산 처리 시간' },
  ],
  retrospective:
    '정산 결과를 검증하는 리포트를 처음부터 만들었다면 초기 6개월의 수작업 대조를 ' +
    '줄일 수 있었을 것 같습니다.',
};
