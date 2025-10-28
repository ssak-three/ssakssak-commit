import { z } from "zod";
import { analysisResultSchema } from "@/lib/validators/structured-analysis-result";
import {
  findReportsByTitlePrefix,
  saveReportToDatabase,
} from "@/repositories/report";
import { logger } from "@/lib/logger";
import { BadGatewayError } from "@/errors";

type AnalysisResult = z.infer<typeof analysisResultSchema>;

async function saveAnalysisReport(data: AnalysisResult) {
  try {
    const conflictingReports = await findReportsByTitlePrefix(data.reportTitle);

    let finalReportTitle = data.reportTitle;
    if (conflictingReports.length > 0) {
      const baseTitle = data.reportTitle.replace(/\s?\(\d+\)$/, "").trim();
      const newIndex = conflictingReports.length;
      finalReportTitle = `${baseTitle} (${newIndex})`;
    }

    const report = await saveReportToDatabase({
      userId: data.userId || undefined,
      reportTitle: finalReportTitle,
      reportSummary: data.reportSummary,
      reportConclusion: data.reportConclusion,
      owner: data.owner,
      repositoryName: data.repositoryName,
      repositoryUrl: data.repositoryUrl,
      branch: data.branch,
      commits: data.commits,
    });

    logger.info({ reportId: report.reportId }, "Report saved successfully");
    return report;
  } catch (error) {
    logger.error({ error, data }, "Failed to save report");

    throw new BadGatewayError({
      message: "Failed to save report to database",
    });
  }
}

export { saveAnalysisReport };
