interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  image: string;
  note?: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface OnboardingContentProps {
  onClose: () => void;
}

export type { OnboardingStep, OnboardingModalProps, OnboardingContentProps };
