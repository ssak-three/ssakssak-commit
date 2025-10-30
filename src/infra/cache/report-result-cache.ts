import type IORedis from "ioredis";
import { randomBytes } from "crypto";
import { REPORT_ID_PREFIX } from "@/constants/report-key";

const REPORT_TTL_SEC = 48 * 60 * 60;

const redisKeyForResult = (cachedReportId: string) =>
  `report:result:${cachedReportId}`;

function generateReportId(bytes = 32): string {
  const randomKey = randomBytes(bytes).toString("base64url");
  return `${REPORT_ID_PREFIX.GUEST}${randomKey}`;
}

type ResultPayload<T> = {
  status: "completed" | "failed";
  jobId: string;
  reportId: string;
  data: T;
  reason?: string;
  createdAt: string;
  expiresAt: string;
};

async function saveCompletedResult<T>(
  redis: IORedis,
  jobId: string,
  result: T,
  ttlSecond: number = REPORT_TTL_SEC,
): Promise<string> {
  const reportId = generateReportId();
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
}

async function getResultByReportKey<T = unknown>(
  redis: IORedis,
  reportId: string,
): Promise<ResultPayload<T> | null> {
  const cachedResult = await redis.get(redisKeyForResult(reportId));
  return cachedResult ? (JSON.parse(cachedResult) as ResultPayload<T>) : null;
}

export { generateReportId, saveCompletedResult, getResultByReportKey };
