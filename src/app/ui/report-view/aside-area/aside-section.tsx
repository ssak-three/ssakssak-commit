import CommitList from "@/app/ui/report-view/aside-area/commit-list";
import { CommitDetail } from "@/types/commit";

interface AsideSectionProps {
  commits: CommitDetail[];
}

function AsideSection({ commits }: AsideSectionProps) {
  return (
    <aside className="flex min-w-0 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:basis-[30%] lg:overflow-y-auto">
      <section aria-labelledby="commit-list-title">
        <CommitList commits={commits} />
      </section>
    </aside>
  );
}

export default AsideSection;
