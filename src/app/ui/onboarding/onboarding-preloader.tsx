import Image from "next/image";
import { ONBOARDING_STEPS } from "./onboarding-steps";

function OnboardingPreloader() {
  return (
    <div style={{ display: "none" }}>
      {ONBOARDING_STEPS.map((step) => (
        <Image
          key={step.id}
          src={step.image}
          alt={step.title}
          width={4200}
          height={2385}
          priority
        />
      ))}
    </div>
  );
}

export default OnboardingPreloader;
