import type IORedis from "ioredis";
import { randomBytes } from "crypto";

const REPORT_TTL_SEC = 48 * 60 * 60;

const keyForResult = (cachedReportId: string) =>
  `report:result:${cachedReportId}`;

function generateReportKey(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

type ResultPayload<T> = {
  status: "completed" | "failed";
  jobId: string;
  reportKey: string;
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
  const reportKey = generateReportKey();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlSecond * 1000);

  const payload: ResultPayload<T> = {
    status: "completed",
    jobId,
    reportKey,
    data: result,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  await redis.setex(
    keyForResult(reportKey),
    ttlSecond,
    JSON.stringify(payload),
  );

  return reportKey;
}

async function getResultByReportKey<T = unknown>(
  redis: IORedis,
  reportKey: string,
): Promise<ResultPayload<T> | null> {
  const cachedResult = await redis.get(keyForResult(reportKey));
  return cachedResult ? (JSON.parse(cachedResult) as ResultPayload<T>) : null;
}

export { generateReportKey, saveCompletedResult, getResultByReportKey };
