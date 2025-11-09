import IORedis from "ioredis";
import { randomBytes } from "crypto";
import { REPORT_ID_PREFIX } from "@/constants/report-key";
import { ReportData } from "@/types/report";

const REPORT_TTL_SEC = 7 * 24 * 60 * 60;
type SaveType = "create" | "shared";

const redisKeyForResult = (cachedReportId: string) =>
  `report:result:${cachedReportId}`;

const generateReportId = (saveType: SaveType, bytes = 32): string => {
  const randomKey = randomBytes(bytes).toString("base64url");

  return saveType === "shared"
    ? `${REPORT_ID_PREFIX.SHARE}${randomKey}`
    : `${REPORT_ID_PREFIX.GUEST}${randomKey}`;
};

type ResultPayload<T> = {
  status: "completed" | "failed";
  jobId: string;
  reportId: string;
  data: T;
  reason?: string;
  createdAt: string;
  expiresAt: string;
};

const saveReportToRedis = async <T>(
  redis: IORedis,
  jobId: string,
  result: T,
  ttlSecond: number = REPORT_TTL_SEC,
): Promise<string> => {
  const reportId = generateReportId("create");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlSecond * 1000);

  const payload: ResultPayload<T> = {
    status: "completed",
    jobId,
    reportId,
    data: result,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  await redis.setex(
    redisKeyForResult(reportId),
    ttlSecond,
    JSON.stringify(payload),
  );

  return reportId;
};

const saveSharedReportToRedis = async (
  redis: IORedis,
  report: ReportData,
): Promise<string> => {
  const reportId = generateReportId("shared");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + REPORT_TTL_SEC * 1000);

  const payload = {
    data: report,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  await redis.setex(
    redisKeyForResult(reportId),
    REPORT_TTL_SEC,
    JSON.stringify(payload),
  );

  return reportId;
};

const getResultByReportKey = async <T = unknown>(
  redis: IORedis,
  reportId: string,
): Promise<ResultPayload<T> | null> => {
  const cachedResult = await redis.get(redisKeyForResult(reportId));
  return cachedResult ? (JSON.parse(cachedResult) as ResultPayload<T>) : null;
};

export {
  generateReportId,
  saveReportToRedis,
  saveSharedReportToRedis,
  getResultByReportKey,
};
