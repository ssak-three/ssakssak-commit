import { z } from "zod";
import { analysisResultSchema } from "@/lib/validators/structured-analysis-result";
import parseRepositoryUrl from "@/lib/parse-repository-url";
import {
  findReportsByTitlePrefix,
  saveReportToDatabase,
} from "@/repositories/report";
import { logger } from "@/lib/logger";
import { BadGatewayError } from "@/errors";
import { DATA_ERROR_MESSAGES } from "@/constants/error-messages";

type AnalysisResult = z.infer<typeof analysisResultSchema>;

async function saveAnalysisReport(userId: string, data: AnalysisResult) {
  try {
    const { owner, repositoryName } = parseRepositoryUrl(data.repositoryUrl);
    const conflictingReports = await findReportsByTitlePrefix(data.reportTitle);

    let finalReportTitle = data.reportTitle;
    if (conflictingReports.length > 0) {
      const baseTitle = data.reportTitle.replace(/\s?\(\d+\)$/, "").trim();
      const newIndex = conflictingReports.length;
      finalReportTitle = `${baseTitle} (${newIndex})`;
    }

    const report = await saveReportToDatabase({
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

    return {
      reportId: report.reportId,
      reportTitle: report.reportTitle,
    };
  } catch (error) {
    logger.error({ error, data }, "Failed to save report");

    throw new BadGatewayError({
      message: DATA_ERROR_MESSAGES.SAVE_REPORT_FAILED,
    });
  }
}

export { saveAnalysisReport };
