import { getRedisClient } from "@/infra/cache/redis-connection";
import {
  getResultByReportKey,
  saveSharedReportToRedis,
} from "@/infra/cache/report-result-cache";
import { ReportData } from "@/types/report";

const ensureReportCachedById = async (
  reportId: string,
  report: ReportData,
): Promise<string> => {
  const redis = getRedisClient();

  const cached = await getResultByReportKey<ReportData>(redis, reportId);

  if (cached) return reportId;

  const newReportId = await saveSharedReportToRedis<ReportData>(redis, report);
  return newReportId;
};

export { ensureReportCachedById };
