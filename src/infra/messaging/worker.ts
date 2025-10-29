import { Worker, Job } from "bullmq";
import { getRedisSubscriber } from "../cache/redis-connection";
import { logger } from "@/lib/logger";
import { saveCompletedResult } from "./result-store";
import { ReportProgress } from "@/types/job-progress";

type ReportCreationJobData = {
  reportTitle: string;
  repositoryUrl: string;
  branch: string;
  repositoryOverview: string;
  accessToken?: string;
};

const connection = getRedisSubscriber();

const worker = new Worker<ReportCreationJobData, unknown>(
  "reportCreation",
  async (job: Job<ReportCreationJobData, unknown>) => {
    logger.info(`[job ${job.id}] START -> name : ${job.name}`);

    const reportProgress: ReportProgress = async (phase) => {
      await job.updateProgress(phase);
    };

    try {
      const { createReport } = await import("@/services/reports/create-report");
      const result = await createReport({
        ...job.data,
        onProgress: reportProgress,
      });

      const reportKey = await saveCompletedResult(
        connection,
        job.id as string,
        result,
      );
      logger.info(`[job ${job.id}] DONE`);
      await reportProgress({ phase: "completed" });

      return { reportKey };
    } catch (error) {
      logger.error(`[job ${job.id}] FAILED : ${error}`);
      throw error;
    }
  },
  { connection, concurrency: 3 },
);

worker.on("ready", () => {
  logger.info("Worker connected to Redis and ready!");
});

worker.on("completed", async (job) => {
  logger.info(`${job.id} has completed!`);
});

worker.on("error", (error) => {
  logger.error({ error }, "error occured!");
});

worker.on("failed", (job, error) => {
  logger.error({ jobId: job?.id, error }, "job failed");
});

export default worker;
