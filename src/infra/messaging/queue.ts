import createQueue from "./create-queue";
import { JOB_QUEUE, JOB } from "@/constants/report-job";

const defaultOptions = {
  attempts: 3,
  backoff: { type: "exponential", delay: 5000 },
  removeOnComplete: { age: 3600, count: 1000 },
  removeOnFail: { age: 24 * 3600 },
};

const { queue: reportCreationQueue, addJob: addReportCreationJob } =
  createQueue({
    queueName: JOB_QUEUE.REPORT_CREATION,
    jobName: JOB.CREATE_REPORT,
    options: { ...defaultOptions, attempts: 1 },
  });

const { queue: analysisBatchQueue, addJob: addAnalysisBatchJob } = createQueue({
  queueName: JOB_QUEUE.ANALYSIS_BATCH,
  jobName: JOB.ANALYSIS_BATCH,
  options: defaultOptions,
});

export {
  defaultOptions,
  reportCreationQueue,
  addReportCreationJob,
  analysisBatchQueue,
  addAnalysisBatchJob,
};
