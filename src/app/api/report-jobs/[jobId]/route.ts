import { AppError, NotFoundError } from "@/errors";
import { getRedisClient } from "@/infra/cache/redis-connection";
import { Queue } from "bullmq";
import { NextRequest, NextResponse } from "next/server";
import { JOB_QUEUE, JOB_PHASES, JOB_STATES } from "@/constants/report-job";
import { JOB_ERROR_MESSAGES } from "@/constants/error-messages";

const { PROCESSING, COMPLETED, FAILED } = JOB_STATES;
const { JOB_ID_REQUIRED, NOT_FOUND } = JOB_ERROR_MESSAGES;

async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params;

  if (!jobId) {
    return NextResponse.json(
      { status: FAILED, message: JOB_ID_REQUIRED },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const connection = getRedisClient();
    const queue = new Queue(JOB_QUEUE.REPORT_CREATION, { connection });
    const job = await queue.getJob(jobId);

    if (!job) {
      throw new NotFoundError({
        message: NOT_FOUND,
      });
    }

    const state = await job.getState();
    const progress = job.progress;

    if (state === COMPLETED) {
      const returnValue = job.returnvalue as { reportKey?: string } | null;
      if (returnValue?.reportKey) {
        return NextResponse.json(
          { status: COMPLETED, reportKey: returnValue.reportKey },
          { status: 200, headers: { "Cache-Control": "no-store" } },
        );
      }
    }

    if (state === FAILED) {
      const reason = job.failedReason || "unknown";
      return NextResponse.json({ status: FAILED, reason }, { status: 200 });
    }

    return NextResponse.json(
      {
        status: PROCESSING,
        state,
        progress: progress ?? { phase: JOB_PHASES.PENDING },
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unexpected error";
    const status: number = error instanceof AppError ? error.status : 500;

    return NextResponse.json(
      {
        status: 500,
        message: message,
      },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export { GET };
