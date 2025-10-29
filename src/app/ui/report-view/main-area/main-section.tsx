import SummarySection from "./summary/summary-box";
import CommitSection from "./commit/commit-section";
import { CommitDetail } from "@/types/commit";

interface MainSectionProps {
  reportSummary: string;
  commits: CommitDetail[];
}

function MainSection({ reportSummary, commits }: MainSectionProps) {
  return (
    <main className="flex min-w-0 flex-col space-y-6 lg:basis-[70%]">
      <SummarySection reportSummary={reportSummary} />
      <CommitSection commits={commits} />
    </main>
  );
}

export default MainSection;
