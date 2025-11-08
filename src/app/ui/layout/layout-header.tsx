"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import OnboardingModal from "../onboarding/onboarding-modal";
import OnboardingContent from "../onboarding/onboarding-content";

function LayoutHeader() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="py-2 pr-12 text-[40px] font-bold">🧹싹싹커밋</div>
        <div className="text-center">
          <span className="text-gray-400">복잡한 커밋을</span>
          <span className="text-yellow-500"> 싹싹 </span>
          <span className="text-gray-400">모아서 한 눈에 이해할 수 있게</span>
          <span className="text-yellow-500"> 리포트</span>
          <span className="text-gray-400">로 만들어 드립니다</span>
        </div>

        <button
          onClick={() => setIsOnboardingOpen(true)}
          className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 hover:underline"
          aria-label="온보딩 가이드 열기"
          type="button"
        >
          <HelpCircle className="h-4 w-4" />
          처음 오셨나요? 가이드 보기 📖
        </button>
      </div>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      >
        <OnboardingContent onClose={() => setIsOnboardingOpen(false)} />
      </OnboardingModal>
    </>
  );
}

export default LayoutHeader;
