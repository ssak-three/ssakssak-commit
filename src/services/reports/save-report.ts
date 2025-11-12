import { z } from "zod";
import { analysisResultSchema } from "@/lib/validators/structured-analysis-result";
import parseRepositoryUrl from "@/lib/parse-repository-url";
import { findReportsByTitlePrefix, saveReport } from "@/repositories/report";
import { logger } from "@/lib/logger";
import { BadGatewayError } from "@/errors";
import { DATA_ERROR_MESSAGES } from "@/constants/error-messages";

type AnalysisResult = z.infer<typeof analysisResultSchema>;

const REPORT_TITLE_NUMBER_SUFFIX_PATTERN = /\s?\(\d+\)$/;

const saveReportToDatabase = async (userId: string, data: AnalysisResult) => {
  try {
    const { owner, repositoryName } = parseRepositoryUrl(data.repositoryUrl);
    const existingReportsWithSameTitle = await findReportsByTitlePrefix(
      userId,
      data.reportTitle,
    );

    let finalReportTitle = data.reportTitle;
    if (existingReportsWithSameTitle.length > 0) {
      const baseTitle = data.reportTitle
        .replace(REPORT_TITLE_NUMBER_SUFFIX_PATTERN, "")
        .trim();
      const newIndex = existingReportsWithSameTitle.length;
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
};

export { saveReportToDatabase };
