import ReportForm from "@/app/ui/main/report-form";
import LayoutHeader from "@/app/ui/layout/layout-header";
import OnboardingTriggerButton from "../ui/onboarding/onboarding-trigger-button";
import OnboardingPreloader from "../ui/onboarding/onboarding-preloader";

function HomePage() {
  return (
    <div>
      <OnboardingPreloader />

      <LayoutHeader />

      <ReportForm />

      <OnboardingTriggerButton />
    </div>
  );
}

export default HomePage;
