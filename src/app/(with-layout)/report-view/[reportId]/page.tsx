import { ReportData } from "@/types/report";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";
import Header from "@/app/ui/report-view/header/header";
import MainSection from "@/app/ui/report-view/main-area/main-section";
import AsideSection from "@/app/ui/report-view/aside-area/aside-section";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

async function ReportViewPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;

  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const cookieStore = await cookies();

    const response = await fetch(`${baseUrl}/api/reports/${reportId}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error(SYSTEM_ERROR_MESSAGES.SERVER);
    }

    const { report: reportData }: { report: ReportData } =
      await response.json();

    return (
      <div className="flex min-h-screen w-full flex-col scroll-smooth px-[10%] font-sans break-words break-keep whitespace-normal print:px-4">
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
  } catch (error) {
    throw error;
  }
}

export default ReportViewPage;
