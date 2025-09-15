import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";
import { AppError } from "@/errors";
import { requireUserId } from "@/lib/auth/require-session";
import { getByReportId } from "@/repositories/report";
import { NextRequest, NextResponse } from "next/server";

async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> },
) {
  const userId = await requireUserId();
  const { reportId } = await params;

  try {
    const report = await getByReportId(userId, reportId);

    return NextResponse.json({ report }, { status: 200 });
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
