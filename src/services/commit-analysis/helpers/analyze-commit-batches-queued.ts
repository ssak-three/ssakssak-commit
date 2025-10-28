import { JOB_QUEUE } from "@/constants/report-job";
import { AppError } from "@/errors";
import { analysisBatchQueue, defaultOptions } from "@/infra/messaging/queue";
import createQueueEvents from "@/infra/messaging/queue-events";
import { GithubCommit } from "@/types/commit";
import { ReportProgress } from "@/types/job-progress";
import { JOB } from "@/constants/report-job";

const analyzeCommitBatchesQueued = async ({
  parentJobId,
  commitBatches,
  repositoryOverview,
  onProgress,
}: {
  parentJobId: string;
  commitBatches: GithubCommit[][];
  repositoryOverview: string | undefined;
  onProgress: ReportProgress;
}) => {
  const jobs = await analysisBatchQueue.addBulk(
    commitBatches.map((batch, index) => ({
      name: JOB.ANALYSIS_BATCH,
      data: {
        parentJobId,
        batchIndex: index,
        totalBatches: commitBatches.length,
        commits: batch,
        repositoryOverview,
      },
      opts: {
        ...defaultOptions,
        jobId: `${parentJobId}:${index}`,
      },
    })),
  );

  const queueEvents = createQueueEvents(JOB_QUEUE.ANALYSIS_BATCH);

  try {
    let done = 0;
    const total = jobs.length;

    await onProgress({
      phase: "analyzing",
      meta: { done, total, percent: 0 },
    });

    const results = await Promise.all(
      jobs.map(async (child) => {
        const childId = child.id as string;
        if (!childId) {
          throw new AppError({
            status: 500,
            message: `Child job has no id`,
          });
        }
        const returnValue = await child.waitUntilFinished(queueEvents);

        done += 1;
        const percent = Math.round((done / total) * 100);
        await onProgress({
          phase: "analyzing",
          meta: { done, total, percent },
        });

        return returnValue;
      }),
    );

    return results;
  } finally {
    await queueEvents.close();
  }
};

export default analyzeCommitBatchesQueued;
