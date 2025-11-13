"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ONBOARDING_STEPS } from "./onboarding-steps";
import { OnboardingContentProps } from "@/types/onboarding";

function OnboardingContent({ onClose }: OnboardingContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = ONBOARDING_STEPS.length;
  const step = ONBOARDING_STEPS[currentStep];

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 px-8 py-8">
        <div className="relative w-full overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={step.image}
            alt={step.title}
            width={4200}
            height={2385}
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="w-full text-center">
          <p className="text-base whitespace-pre-line text-gray-700">
            {step.description}
          </p>
          {step.note && (
            <p className="mt-3 text-sm text-gray-500">{step.note}</p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
            이전
          </button>

          <span className="text-sm text-gray-500">
            {currentStep + 1} / {totalSteps}
          </span>

          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            {currentStep === totalSteps - 1 ? "완료" : "다음"}
            {currentStep < totalSteps - 1 && (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingContent;
