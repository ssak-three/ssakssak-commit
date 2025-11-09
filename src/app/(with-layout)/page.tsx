import ReportForm from "@/app/ui/main/report-form";
import LayoutHeader from "@/app/ui/layout/layout-header";
import OnboardingTriggerButton from "../ui/onboarding/onboarding-trigger-button";

function HomePage() {
  return (
    <div>
      <LayoutHeader />

      <ReportForm />

      <OnboardingTriggerButton />
    </div>
  );
}

export default HomePage;
