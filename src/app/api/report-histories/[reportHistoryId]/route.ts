import { NextRequest, NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth/require-session";
import { deleteReportHistory } from "@/repositories/report-history";
import { AppError } from "@/errors";

async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reportHistoryId: string }> },
) {
  try {
    const userId = await requireUserId();
    const { reportHistoryId } = await params;

    await deleteReportHistory({
      userId,
      reportHistoryId,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected Error";
    const status = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      { error: { message, status } },
      { status: status },
    );
  }
}

export { DELETE };
