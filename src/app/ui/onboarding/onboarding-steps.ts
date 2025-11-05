import { OnboardingStep } from "@/types/onboarding";

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "싹싹커밋 사용 방법",
    description: "📌 4단계로 커밋 분석 가능!",
    image: "/homepage.png",
    note: "URL 입력 → 브랜치 선택 → 제목/개요 작성(선택) → 리포트 생성",
  },
  {
    id: 2,
    title: "1. 리포지토리 URL 입력",
    description: "1. 분석하고 싶은 GitHub 저장소 URL을 입력해주세요.",
    image: "/repository_url.png",
    note: "⚠️ 필수 항목입니다.",
  },
  {
    id: 3,
    title: "2. 브랜치 조회 및 선택",
    description: "2. 브랜치 조회 버튼을 클릭하고, 분석할 브랜치를 선택하세요.",
    image: "/select_branch.png",
    note: "⚠️ 필수 항목입니다.",
  },
  {
    id: 4,
    title: "3. 리포트 제목 및 개요 입력",
    description: "3. 리포트 제목과 저장소에 대한 설명을 입력하세요.",
    image: "/report_title.png",
    note: "선택사항이지만, 입력하면 더 명확한 리포트를 생성할 수 있습니다.",
  },
  {
    id: 5,
    title: "4. 리포트 생성",
    description: "4. 모든 정보를 입력했다면 리포트 생성 버튼을 클릭하세요!",
    image: "/create_report.png",
    note: "✅ 필수 항목: URL 입력, 브랜치 선택.",
  },
  {
    id: 6,
    title: "5. 결과 페이지",
    description:
      "5. 로딩이 완료된 후, AI가 커밋을 분석하여 결과 리포트를 보여줍니다.",
    image: "/report_page.png",
    note: "📊 분석된 리포트에서 커밋 기록과 요약 내용을 확인할 수 있습니다.",
  },
];

export { ONBOARDING_STEPS };
