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

  const cachedReport = await getResultByReportKey<ReportData>(redis, reportId);

  if (cachedReport) return reportId;

  const newReportId = await saveSharedReportToRedis(redis, report);
  return newReportId;
};

export { ensureReportCachedById };
