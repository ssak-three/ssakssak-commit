"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { OnboardingModalProps } from "@/types/onboarding";

function OnboardingModal({ isOpen, onClose, children }: OnboardingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default OnboardingModal;
