import { NextResponse } from "next/server";
import getReportHistoryList from "@/services/report-history/get-report-history-list";
import { AppError } from "@/errors";
import { requireUserId } from "@/lib/auth/require-session";

async function GET() {
  try {
    const userId = await requireUserId();
    const result = await getReportHistoryList(userId);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected Error";
    const status = error instanceof AppError ? error.status : 500;

    return NextResponse.json({ error: { message, status } }, { status });
  }
}

export { GET };
