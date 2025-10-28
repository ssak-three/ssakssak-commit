import { JOB_QUEUE } from "@/constants/report-job";
import { WORKER_CONCURRENCY } from "@/constants/worker-config";
import { getRedisSubscriber } from "@/infra/cache/redis-connection";
import { logger } from "@/lib/logger";
import { GithubCommit } from "@/types/commit";
import { Job, Worker } from "bullmq";

const connection = getRedisSubscriber();

type AnalysisBatchJobData = {
  parentJobId: string;
  batchIndex: number;
  totalBatches: number;
  commits: GithubCommit[];
  repositoryOverview?: string;
};

const analysisBatchWorker = new Worker(
  JOB_QUEUE.ANALYSIS_BATCH,
  async (job: Job<AnalysisBatchJobData, unknown>) => {
    const { parentJobId, batchIndex, commits, repositoryOverview } = job.data;
    const commitCount = commits?.length ?? 0;
    const startedAt = Date.now();

    const totalBatches = job.data?.["totalBatches"] ?? "?";
    const nth = (batchIndex ?? 0) + 1;
    logger.info(
      `[배치 ${nth}/${totalBatches}] 시작 | 부모 JobId=${parentJobId} | 자식 JobId=${job.id}`,
    );

    const { requestCommitAnalysis } = await import(
      "@/services/commit-analysis/helpers/request-analysis"
    );
    const result = await requestCommitAnalysis(commits, repositoryOverview);
    const elapsed = Date.now() - startedAt;
    logger.info(
      `[배치 ${nth}/${totalBatches}] 완료 | 커밋=${commitCount}, 소요=${elapsed}ms | 부모 JobId=${parentJobId} | 자식 JobId=${job.id}`,
    );

    return result;
  },
  { connection, concurrency: WORKER_CONCURRENCY.ANALYSIS_BATCH },
);

analysisBatchWorker.on("ready", () => {
  logger.info("[analysisBatch] Worker connected to Redis and ready!");
});

analysisBatchWorker.on("error", (error) => {
  logger.error({ error }, "[analysisBatch] error occured!");
});

analysisBatchWorker.on("failed", (job, error) => {
  if (!job) {
    logger.error(
      `[analysisBatch] failed 이벤트에서 job 없음: ${error?.message}`,
    );
    return;
  }

  const { batchIndex, totalBatches, parentJobId } = job.data;
  logger.error(
    `[배치 ${batchIndex + 1}/${totalBatches}] 실패: ${error?.message ?? "unknown"} (부모 JobId==${parentJobId}, 자식 JobId=${job.id})`,
  );
});

export default analysisBatchWorker;
