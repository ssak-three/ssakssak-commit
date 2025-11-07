import { OnboardingStep } from "@/types/onboarding";

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "1. 로그인 기능",
    description: "[Sign in] 버튼을 클릭하여, 로그인을 진행하세요.",
    image: "/onboarding/signIn.png",
    note: "✅ 로그인 시, 분석 한도가 증가하며 생성한 리포트를 저장할 수 있습니다.",
  },
  {
    id: 2,
    title: "2. 리포트 보관함",
    description:
      "로그인 후, 생성한 리포트를 보관함에서 저장·관리할 수 있습니다.",
    image: "/onboarding/storage_report.png",
    note: "⚠️ 로그인한 사용자만 이용 가능한 기능입니다.",
  },
  {
    id: 3,
    title: "3. 싹싹커밋 사용 방법",
    description: "📌 4단계로 손쉽게 커밋 분석 리포트를 생성할 수 있습니다.",
    image: "/onboarding/homepage.png",
    note: "리포지토리 URL 입력 → 브랜치 선택 → (선택) 제목/개요 작성 → 리포트 생성",
  },
  {
    id: 4,
    title: "4. 분석 결과",
    description:
      "분석 결과 페이지에서는 브랜치 전체에 대한 요약과 커밋 단위의 분석 결과를 순서대로 제공합니다.",
    image: "/onboarding/report_analysis.png",
    note: "📊 생성한 리포트를 통해 AI가 분석한 결과를 한눈에 확인할 수 있습니다.",
  },
  {
    id: 5,
    title: "5. 커밋 리스트",
    description:
      "우측 커밋 리스트에서 원하는 커밋 박스를 클릭하면 해당 커밋의 분석 내용으로 이동합니다.",
    image: "/onboarding/commitBox.png",
    note: "👆 클릭 시, 선택한 커밋의 분석 결과로 이동합니다.",
  },
  {
    id: 6,
    title: "6. 커밋 분석_커밋 정보",
    description:
      "커밋 메시지, 작성자, 커밋 날짜 등의 기본 정보를 확인할 수 있습니다. ",
    image: "/onboarding/commit_info.png",
    note: "🔗 커밋 해시를 클릭하면, GitHub의 원본 커밋 상세 페이지로 이동할 수 있습니다.",
  },
  {
    id: 7,
    title: "7. 커밋 분석_요약 & 분석",
    description:
      "AI가 해당 커밋의 핵심 내용을 요약하고 분석한 결과를 제공합니다.",
    image: "/onboarding/commit_sum.png",
    note: "💡 커밋의 목적과 주요 변경점을 간략히 이해할 수 있습니다.",
  },
  {
    id: 8,
    title: "8. 커밋 분석_코드 변경점",
    description:
      "AI가 해당 커밋 내에서 중요하다고 판단한 코드 변경 부분을 시각적으로 표시합니다.",
    image: "/onboarding/commit_codeDiff.png",
    note: "📊 added(추가), modified(수정), removed(삭제) 3가지 상태로 구분되어 표시됩니다.",
  },
  {
    id: 9,
    title: "9. 커밋 분석_다이어그램",
    description:
      "AI가 커밋 내용을 기반으로 코드 구조를 다이어그램 형태로 시각화합니다.",
    image: "/onboarding/commit_mermaid.png",
    note: "🧩 복잡한 코드 변경 흐름을 시각적으로 한눈에 파악할 수 있습니다.",
  },
];

export { ONBOARDING_STEPS };
