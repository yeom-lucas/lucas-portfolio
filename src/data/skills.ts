// Notion 스킬 목록 + 직접 커밋한 저장소들(build.gradle, pom.xml, package.json)에서 쓰는 기술
import type { SkillGroup } from './types';

const icon = (name: string) => `/skills/${name}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    category: '백엔드',
    items: [
      { name: 'Java', icon: icon('java') },
      { name: 'Spring Boot', icon: icon('spring') },
      { name: 'Spring Security', icon: icon('springsecurity') },
      { name: 'JPA / Hibernate', icon: icon('hibernate') },
      { name: 'QueryDSL' },
      { name: 'MyBatis' },
      { name: 'Spring RestDocs' },
      { name: 'Swagger', icon: icon('swagger') },
      { name: 'Thymeleaf', icon: icon('thymeleaf') },
      { name: 'Node.js', icon: icon('nodejs') },
      { name: 'Gradle', icon: icon('gradle') },
      { name: 'Maven', icon: icon('maven') },
    ],
  },
  {
    category: '데이터 · 메시징',
    items: [
      { name: 'MySQL', icon: icon('mysql') },
      { name: 'MariaDB', icon: icon('mariadb') },
      { name: 'PostgreSQL', icon: icon('postgresql') },
      { name: 'MongoDB', icon: icon('mongodb') },
      { name: 'Redis', icon: icon('redis') },
      { name: 'MS-SQL', icon: icon('mssql') },
      { name: 'Oracle', icon: icon('oracle') },
      { name: 'MQTT', icon: icon('mqtt') },
      { name: 'Firebase (FCM)', icon: icon('firebase') },
    ],
  },
  {
    category: '인프라 · 배포',
    items: [
      { name: 'Docker', icon: icon('docker') },
      { name: 'Jenkins', icon: icon('jenkins') },
      { name: 'Nginx', icon: icon('nginx') },
      { name: 'AWS', icon: icon('aws') },
      { name: 'Linux', icon: icon('linux') },
      { name: 'Ubuntu', icon: icon('ubuntu') },
      { name: 'Grafana', icon: icon('grafana') },
      { name: 'Git', icon: icon('git') },
    ],
  },
  {
    category: '프론트엔드 · 모바일',
    items: [
      { name: 'JavaScript', icon: icon('javascript') },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'Angular', icon: icon('angular') },
      { name: 'jQuery', icon: icon('jquery') },
      { name: 'Android', icon: icon('android') },
      { name: 'WebRTC', icon: icon('webrtc') },
    ],
  },
  {
    category: '장비 연동',
    items: [
      { name: 'Modbus TCP/RTU' },
      { name: 'CANbus (PCAN)' },
      { name: 'Raspberry Pi', icon: icon('raspberrypi') },
      { name: 'C / C++', icon: icon('cplusplus') },
    ],
  },
];
