// Notion 이력서에서 옮긴 내용. 수정은 이 파일에서 한다.
import type { Company } from '../types';

export const transcosmos2018: Company = {
  slug: "transcosmos-2018",
  name: "TransCosmos Korea",
  description: "컨택센터·고객 경험(CX) 솔루션을 구축하고 운영하는 IT 서비스 기업",
  roles: ["모바일 · 서버 개발자"],
  start: "2018-06",
  end: "2020-02",
  projects: [
    {
      slug: "woori-vietnam",
      title: "우리은행(베트남) PUSH, 화상상담 라이브러리 개발",
      summary: "우리은행 베트남지점 앱에서 사용할 PUSH, 화상상담 라이브러리 개발",
      start: "2019-11",
      end: "2020-02",
      team: "모바일개발자 1, 서버개발자 1",
      description:
        "우리은행 베트남지점 앱에서 사용할 PUSH, 화상상담  라이브러리 프로젝트입니다. 이미지의 사진은 샘플 앱이며, 라이브러리 적용 방법 등을 상세하게 기술하였습니다. 이미 수차례  개발했던 라이브러리지만 Android/iOS 라이브러리 개발, PC 클라이언트 개발, 관리자페이지 개발 등을 혼자서 개발하였습니다.",
      tech: [
        "Android (Java)",
        "iOS (Objective-C)",
        "C++ (MFC)",
        "Web Framework (Java)",
        "FFmpeg (H.264)",
        "OpenCV",
      ],
      tasks: [
        "Mobile Push 기능 샘플 개발",
        "관리자페이지 개발",
        "PC 상담원 클라이언트 개발 (화상상담)",
        "각종 메뉴얼 작성",
      ],
      learnings: [
        "안드로이드 64비트 아키텍처의 필수 정책으로 인한 이슈가 발생하여 기존의 화상상담 라이브러리를 수정하였습니다.",
        "기존의 GCM을 사용하는 중에 FCM으로 마이그레이션 하는 방법을 배웠습니다.",
      ],
      images: [
        "/projects/woori-vietnam/01.png",
        "/projects/woori-vietnam/02.png",
        "/projects/woori-vietnam/03.png",
      ],
    },
    {
      slug: "kjbank-message",
      title: "광주은행 통합 메시지 서비스 구축",
      summary: "광주은행에서 템플릿에 따라서 고객에게 발송하는 메시지 종류와 우선순위 등을 설정",
      start: "2019-05",
      end: "2019-10",
      team: "모바일/서버개발자 1, WEB 개발자 1, 관리 2",
      description:
        "광주은행 통합 메시지 서비스 구축으로 각각의 템플릿마다 PUSH, 알림톡, SMS의 발송 매체를 설정하고 발송이 실패 할 경우 우선순위에 따라 다음 발송 매체로 발송됩니다. 또한 템플릿을 생성하는 과정에서 사용이 불가능한 단어 등을 미리 등록하여 특정 단어를 빼거나, 템플릿의 기간등을 설정 할 수 있습니다.  이전에 개발한 PUSH의 고도화 작업도 이루어졌다.",
      tech: [
        "Android (Java)",
        "GCC/G++ (Linux)",
      ],
      tasks: [
        "기존에 개발한 PUSH (Android/iOS)의 고도화 작업",
        "PUSH Daemon 추가 개발 작업",
        "통합메시지 Daemon 개발 보조",
        "알림톡의 외부 라이브러리를 광주은행 시스템에 설치 및 테스트",
      ],
      learnings: [
        "지방 출장에 대한 단점을 알게 되었습니다. 외부에서 사내에 있는 팀원과 의사소통과 동시에 업무지시를 내리는 것이 쉽지 않다는 것을 알게 되었습니다.",
        "업무지시를 내릴 때 두세 번 오가지 않도록 명확하게 내리는 법을 알게 되었습니다.",
        "프로젝트를 전반적으로 이해하고 전체를 한 번에 볼 수 있는 요령이 생겼습니다.",
        "G++을 이용한 개발 기술이 늘었습니다.",
        "지방 출장의 경우 기간 안에 끝내지 못할 경우 체류비가 많이 들게 되어 좋은 소리를 듣지 못한다는 사실을 알게 되었습니다. (기간 안에 끝내도 좋은 소리를 듣기 힘듦)",
      ],
      images: [
        "/projects/kjbank-message/01.png",
        "/projects/kjbank-message/02.png",
      ],
    },
    {
      slug: "woori-gbs-push",
      title: "우리은행 글로벌 인터넷 모바일 뱅킹 PUSH 서버 개발",
      summary: "우리은행 GBS 모바일 뱅킹의 PUSH 서비스 개발",
      start: "2019-03",
      end: "2019-04",
      team: "안드로이드개발자(서버데몬개발 병행) 1, 관리 1",
      description:
        "기존에 우리은행에서 사용했던 PUSH 시스템의 확장으로 GBS 뱅킹앱에서 사용할 PUSH 서버개발을 진행하였습니다. 푸시 라이브러리는 기존에 GCM을 사용하였기에 FCM 으로 마이그레이션 하는 샘플 앱을 개발하였습니다. 주 업무는 WAS, WEB서버에서 기동하는 PUSH Daemon프로그램 개발이였습니다.",
      tech: [
        "Android (Java)",
        "GCC/G++ (Linux)",
        "SQLAPI",
        "Oracle Client",
      ],
      tasks: [
        "발송 타겟 리스트 조회 Daemon 개발",
        "PUSH 발송 Daemon 개발",
        "PUSH 발송 후 처리 Daemon개발",
        "Oracle 설치 및 컴파일 환경 설치",
        "GCM/FCM 마이그레이션 메뉴얼 작성",
        "Android PUSH 라이브러리 개발",
      ],
      learnings: [
        "Linux의 설치부터 Oracle 및 컴파일 환경 설치를 여러 번 하였지만 연습 중 시스템파일 하나를 잘 못 지워서 테스트 서버 OS를 다시 설치하는 일이 발생하였습니다. 연습용 서버였기 때문에 업무에 큰 차질은 없었지만, 편의상 root을 사용하는 것이 얼마나 위험한 일인지 다시 한번 알게 되었습니다.",
        "테스트용 서버와 실제 투입 후 사용하는 서버의 설정이 서로 달라 여러 가지 이슈 상황이 발생하였습니다. Linux/Unix의 경우 사전에 필요한 RPM 들을 꼼꼼히 파악하는 것이 중요하다는 것을 상기하게 되었습니다.",
      ],
      images: [
        "/projects/woori-gbs-push/01.png",
        "/projects/woori-gbs-push/02.png",
      ],
    },
    {
      slug: "kjbank-push",
      title: "광주은행 PUSH 시스템 개발",
      summary: "광주은행에서 템플릿에 따라서 고객에게 발송하는 메시지 종류와 우선순위 등을 설정",
      start: "2019-02",
      end: "2019-05",
      team: "Android 개발자 1, iOS 개발자1, Web서버 개발자, 서버 Daemon개발자 1, 관리 1",
      description:
        "광주은행 모바일 뱅킹앱에서 사용하는 PUSH 시스템을 개발하였습니다.",
      tech: [
        "Android (Java)",
      ],
      tasks: [
        "안드로이드 PUSH(FCM) 라이브러리 개발",
      ],
      learnings: [
        "지방 출장 체류비에 대한 회사의 사정으로 먼저 서버 개발하는 개발자는 선 투입, 모바일 개발자는 후 투입하였습니다. 처음으로 지방에서 하는 프로젝트로서 개발 난이도와 별개로 개발 환경이 얼마나 삶의 많은 부분을 차지하는지 알게 되었습니다.",
      ],
      images: [
        "/projects/kjbank-push/01.png",
      ],
    },
  ],
};
