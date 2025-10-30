import { z } from "zod";
import { analysisResultSchema } from "@/lib/validators/structured-analysis-result";
import parseRepositoryUrl from "@/lib/parse-repository-url";
import { findReportsByTitlePrefix, saveReport } from "@/repositories/report";
import { logger } from "@/lib/logger";
import { BadGatewayError } from "@/errors";
import { DATA_ERROR_MESSAGES } from "@/constants/error-messages";

type AnalysisResult = z.infer<typeof analysisResultSchema>;

async function saveReportToDatabase(userId: string, data: AnalysisResult) {
  try {
    const { owner, repositoryName } = parseRepositoryUrl(data.repositoryUrl);
    const conflictingReports = await findReportsByTitlePrefix(data.reportTitle);

    let finalReportTitle = data.reportTitle;
    if (conflictingReports.length > 0) {
      const baseTitle = data.reportTitle.replace(/\s?\(\d+\)$/, "").trim();
      const newIndex = conflictingReports.length;
      finalReportTitle = `${baseTitle} (${newIndex})`;
    }

    const report = await saveReport({
      userId,
      owner,
      repositoryName,
      reportTitle: finalReportTitle,
      reportSummary: data.reportSummary,
      reportConclusion: data.reportConclusion,
      repositoryUrl: data.repositoryUrl,
      branch: data.branch,
      commits: data.commits,
    });

    logger.info({ reportId: report.reportId }, "Report saved successfully");

    return report.reportId;
  } catch (error) {
    logger.error({ error }, "Failed to save report");

    throw new BadGatewayError({
      message: DATA_ERROR_MESSAGES.SAVE_REPORT_FAILED,
    });
  }
}

export { saveReportToDatabase };
