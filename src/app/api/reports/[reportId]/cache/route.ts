import { NextRequest, NextResponse } from "next/server";
import type { ReportData } from "@/types/report";
import { ensureReportCachedById } from "@/services/reports/cache-report";
import { AppError } from "@/errors";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> },
) {
  const { reportId } = await params;

  try {
    const body = (await request.json()) as { report?: ReportData };

    const ensuredReportId = await ensureReportCachedById(
      reportId,
      body.report as ReportData,
    );

    return NextResponse.json(
      { ok: true, ensuredReportId },
      { status: ensuredReportId ? 200 : 201 },
    );
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
