import Image from "next/image";
import { ONBOARDING_STEPS } from "./onboarding-steps";
import { ONBOARDING_IMAGE_DIMENSIONS } from "@/constants/onboarding";

function OnboardingPreloader() {
  return (
    <div style={{ display: "none" }}>
      {ONBOARDING_STEPS.map((step) => (
        <Image
          key={step.id}
          src={step.image}
          alt={step.title}
          width={ONBOARDING_IMAGE_DIMENSIONS.WIDTH}
          height={ONBOARDING_IMAGE_DIMENSIONS.HEIGHT}
          priority
        />
      ))}
    </div>
  );
}

export default OnboardingPreloader;
