import {
  REPORT_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";
import { AppError, NotFoundError } from "@/errors";
import { requireUserId } from "@/lib/auth/require-session";
import { getReportById } from "@/repositories/report";
import { NextRequest, NextResponse } from "next/server";
import type { ReportData } from "@/types/report";
import { getResultByReportKey } from "@/infra/cache/report-result-cache";
import { getRedisClient } from "@/infra/cache/redis-connection";
import { REPORT_ID_PREFIX } from "@/constants/report-key";

async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> },
) {
  const { reportId } = await params;

  try {
    const isGuestReportId = reportId.startsWith(REPORT_ID_PREFIX.GUEST);
    const isSharedReportId = reportId.startsWith(REPORT_ID_PREFIX.SHARE);

    if (isGuestReportId || isSharedReportId) {
      const redis = getRedisClient();

      const cachedResult = await getResultByReportKey<ReportData>(
        redis,
        reportId,
      );

      if (!cachedResult) {
        throw new NotFoundError({
          message: REPORT_ERROR_MESSAGES.NOT_FOUND,
        });
      }

      return NextResponse.json({ report: cachedResult.data }, { status: 200 });
    }
    const userId = await requireUserId();

    const dbReport = await getReportById(userId, reportId);

    if (!dbReport) {
      throw new NotFoundError({
        message: REPORT_ERROR_MESSAGES.NOT_FOUND,
      });
    }

    return NextResponse.json({ report: dbReport }, { status: 200 });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : SYSTEM_ERROR_MESSAGES.UNEXPECTED;
    const status: number = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      {
        error: { message, status },
      },
      { status },
    );
  }
}

export { GET };
