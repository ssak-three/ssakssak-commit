import { NextRequest, NextResponse } from "next/server";
import { validateReportInput } from "@/lib/validators/report-fields";
import AppError from "@/errors/app-error";
import { addJobs } from "@/infra/messaging/report-creation-queue";
import getAccessToken from "@/lib/auth/get-access-token";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";
import { deleteReports, getReports } from "@/repositories/report";
import { requireUserId } from "@/lib/auth/require-session";

async function GET() {
  const userId = await requireUserId();

  try {
    const items = await getReports(userId);

    return NextResponse.json({ status: "ok", items }, { status: 200 });
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

async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedResult = validateReportInput(body);
    const accessToken = await getAccessToken();

    const job = await addJobs({ ...validatedResult, accessToken });

    return NextResponse.json(
      { status: "queued", jobId: job.id },
      { status: 202, headers: { Location: `/api/report-jobs/${job.id}` } },
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

async function DELETE(request: NextRequest) {
  const userId = await requireUserId();

  try {
    const body = await request.json();
    const reportIds = body.reportIds;

    const deleted = await deleteReports({ userId, reportIds: reportIds });

    return NextResponse.json({ status: "ok", deleted }, { status: 200 });
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

export { GET, POST, DELETE };
