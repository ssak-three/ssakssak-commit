import { Worker, Job } from "bullmq";
import { getRedisSubscriber } from "@/infra/cache/redis-connection";
import { logger } from "@/lib/logger";
import { saveCompletedResult } from "@/infra/messaging/result-store";
import { ReportProgress } from "@/types/job-progress";
import { JOB_PHASES, JOB_QUEUE } from "@/constants/report-job";
import { AppError } from "@/errors";
import { WORKER_CONCURRENCY } from "@/constants/worker-config";
import { JOB_ERROR_MESSAGES } from "@/constants/error-messages";

type ReportCreationJobData = {
  reportTitle: string;
  repositoryUrl: string;
  branch: string;
  repositoryOverview: string;
  accessToken?: string;
};

const connection = getRedisSubscriber();

const reportCreationWorker = new Worker<ReportCreationJobData, unknown>(
  JOB_QUEUE.REPORT_CREATION,
  async (job: Job<ReportCreationJobData, unknown>) => {
    logger.info(`[report-creation-job ${job.id}] START -> name : ${job.name}`);

    const reportProgress: ReportProgress = async (phase) => {
      await job.updateProgress(phase);
    };

    try {
      const { createReport } = await import("@/services/reports/create-report");
      if (!job.id) {
        throw new AppError({
          status: 500,
          message: JOB_ERROR_MESSAGES.JOB_ID_REQUIRED,
        });
      }
      const result = await createReport({
        ...job.data,
        parentJobId: job.id,
        onProgress: reportProgress,
      });

      const reportKey = await saveCompletedResult(
        connection,
        job.id as string,
        result,
      );
      logger.info(`[job ${job.id}] DONE`);
      await reportProgress({ phase: JOB_PHASES.COMPLETED });

      return { reportKey };
    } catch (error) {
      logger.error(`[job ${job.id}] FAILED : ${error}`);
      throw error;
    }
  },
  { connection, concurrency: WORKER_CONCURRENCY.REPORT_CREATION },
);

reportCreationWorker.on("ready", () => {
  logger.info("Worker connected to Redis and ready!");
});

reportCreationWorker.on("completed", async (job) => {
  logger.info(`${job.id} has completed!`);
});

reportCreationWorker.on("error", (error) => {
  logger.error({ error }, "error occured!");
});

reportCreationWorker.on("failed", (job, error) => {
  logger.error({ jobId: job?.id, error }, "job failed");
});

export default reportCreationWorker;
