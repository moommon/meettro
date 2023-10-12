export const questions = [
  {
    number: "Q1",
    question: "업무에서 가장 우선시해야 하는 것은 무엇이라고 생각하나요?",
    choices: [
      {
        text: "업무의 품질과 완성도",
        value: "",
      },
      { text: "업무를 빠르게 처리하고 데드라인을 준수하기", value: "" },
    ],
  },
  {
    number: "Q2",
    question: "팀 작업을 진행할 때, 어떤 유형의 업무 스타일인가요?",
    choices: [
      { text: "계획적이고 체계적인 업무 스타일", value: "A" },
      {
        text: "융통성 있고 적응력 있는 업무 스타일",
        value: "B",
      },
    ],
  },
  {
    number: "Q3",
    question: "업무를 진행할 때, 어떤 작업 환경이 더 효율적인가요?",
    choices: [
      { text: "조용하고 고립된 개인실에서 일하는 것", value: "C" },
      {
        text: "활발하고 사람들과 협업하는 개방적인 오피스 환경에서 일하는 것",
        value: "D",
      },
    ],
  },
  {
    number: "Q4",
    question: "업무를 진행할 때, 어떤 방식이 더 효과적이라고 생각하나요?",
    choices: [
      {
        text: "업무를 체계적으로 계획하고 하나씩 처리하는 것",
        value: "E",
      },
      {
        text: "여러 가지 일을 동시에 처리하고 다양한 관점에서 접근하는 것",
        value: "F",
      },
    ],
  },
  {
    number: "Q5",
    question: "업무에서 발생하는 문제에 대한 대처 방식은 어떤 것을 선호하나요?",
    choices: [
      { text: "문제를 공유하고 팀으로 해결하기", value: "" },
      {
        text: "개인적으로 문제를 해결하려고 노력하기",
        value: "",
      },
    ],
  },
  {
    number: "Q6",
    question: "팀 작업에서 가장 어려운 부분은 무엇이라고 생각하나요?",
    choices: [
      { text: "창의적인 아이디어를 생성하고 문제를 해결하는 역할", value: "" },
      { text: "업무를 체계적으로 관리하고 일정을 조정하는 역할", value: "" },
    ],
  },
  {
    number: "Q7",
    question: "팀원 간의 의사소통 시 중요하게 생각하는 가치관은 무엇인가요?",
    choices: [
      {
        text: "정기적인 회의와 개방적인 피드백을 받는 것",
        value: "",
      },
      { text: "필요할 때마다 빠르게 의견을 나누는 것", value: "" },
    ],
  },
  {
    number: "Q8",
    question:
      "팀 작업이 끝난 후, 성공적으로 완료된 것에 대한 축하 방법은 무엇이라고 생각하나요?",
    choices: [
      {
        text: "작은 파티나 간단한 간식 모임",
        value: "G",
      },
      {
        text: "각자가 원하는 보상이나 선물",
        value: "H",
      },
    ],
  },
];
export const results = [
  {
    title: "정직하게 나의 할 일을 하는",
    tool: "삽",
    character: "/images/삽.png",
    results: ["정직하게 나의 할 일을 하는 삽!"],
  },
  {
    title: "무엇보다 행동이 먼저!",
    tool: "손",
    character: "/images/삽.png",
    results: ["무엇보다 행동이 먼저인 손!"],
  },
  {
    title: "언제나 꼼꼼하게 끈기 가득한",
    tool: "모종삽",
    character: "/images/모종삽.png",
    results: ["언제나 꼼꼼하게 끈기 가득한 모종삽!"],
  },
  {
    title: "무슨 일이든 즐기면서 할 줄 아는",
    tool: "장난감삽",
    character: "/images/장난감삽.png",
    results: ["무슨 일이든 즐기면서 할 줄 아는 장난감삽!"],
  },
  {
    title: "효율적으로 많은 일을 해결하는",
    tool: "포크레인",
    character: "/images/삽.png",
    results: ["효율적으로 많은 일을 해결하는 포크레인!"],
  },
  {
    title: "남다른 아이디어로 한방을 노리는",
    tool: "다이너마이트",
    character: "/images/삽.png",
    results: ["남다른 아이디어로 한방을 노리는 다이너마이트!"],
  },
];
export const testtypes = {
  ADEG: 0, //삽
  ACEG: 0,
  ACEH: 0,
  BDEG: 1, //손
  BDEH: 1,
  BCFG: 2, //모종삽
  ACFG: 2,
  ACFH: 2,
  BDFH: 3, //장난감삽
  BDFG: 3,
  ADFH: 4, //포크레인
  BCEH: 4,
  BCFH: 4,
  BCEG: 5, //다이너마이트
  ADFG: 5,
  ADEH: 5,
};
