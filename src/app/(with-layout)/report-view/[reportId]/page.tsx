import { ReportData } from "@/types/report";

import Header from "@/app/ui/report-view/header/header";
import MainSection from "@/app/ui/report-view/main-area/main-section";
import AsideSection from "@/app/ui/report-view/aside-area/aside-section";
import { getResultByReportKey } from "@/infra/messaging/result-store";
import { getRedisClient } from "@/infra/cache/redis-connection";
import { notFound } from "next/navigation";

async function ReportViewPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const redis = getRedisClient();
  const result = await getResultByReportKey<ReportData>(redis, reportId);

  if (!result) {
    notFound();
  }

  const reportData = result.data;

  return (
    <div className="flex min-h-screen w-full flex-col scroll-smooth px-[10%] font-sans break-words break-keep whitespace-normal">
      <div className="mt-8 mb-8 flex w-full flex-col">
        <Header
          reportTitle={reportData.reportTitle}
          repositoryUrl={reportData.repositoryUrl}
          branch={reportData.branch}
        />
        <div className="flex flex-grow flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
          <MainSection
            reportSummary={reportData.reportSummary}
            commits={reportData.commits}
          />
          <AsideSection commits={reportData.commits} />
        </div>
      </div>
    </div>
  );
}

export default ReportViewPage;
