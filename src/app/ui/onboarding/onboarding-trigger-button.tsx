"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import OnboardingModal from "./onboarding-modal";
import OnboardingContent from "./onboarding-content";

function OnboardingTriggerButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 shadow-lg transition-all hover:scale-110 hover:bg-gray-700"
      >
        <HelpCircle className="h-6 w-6 text-white" />
      </button>

      <OnboardingModal isOpen={isOpen} onClose={handleClose}>
        <OnboardingContent onClose={handleClose} />
      </OnboardingModal>
    </>
  );
}

export default OnboardingTriggerButton;
