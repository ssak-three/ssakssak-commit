import createQueue from "./create-queue";

const defaultOptions = {
  attempts: 3,
  backoff: { type: "exponential", delay: 5000 },
  removeOnComplete: { age: 3600, count: 1000 },
  removeOnFail: { age: 24 * 3600 },
};

const { queue: reportCreationQueue, addJob: addReportCreationJob } =
  createQueue({
    queueName: "reportCreation",
    jobName: "createReportJob",
    options: { ...defaultOptions, attempts: 1 },
  });

const { queue: analysisBatchQueue, addJob: addAnalysisBatchJob } = createQueue({
  queueName: "analysisBatch",
  jobName: "analysisBatchJob",
  options: defaultOptions,
});

export {
  reportCreationQueue,
  addReportCreationJob,
  analysisBatchQueue,
  addAnalysisBatchJob,
};
