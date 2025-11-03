const POLLING_INTERVAL = 2000;

const JOB_QUEUE = {
  REPORT_CREATION: "reportCreation",
  ANALYSIS_BATCH: "analysisBatch",
} as const;

const JOB = {
  CREATE_REPORT: "createReportJob",
  ANALYSIS_BATCH: "analysisBatchJob",
} as const;

const JOB_PHASES = {
  PENDING: "pending",
  COLLECTING: "collecting",
  ANALYZING: "analyzing",
  VISUALIZING: "visualizing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

const JOB_STATUS = {
  WAITING: "waiting",
  DELAYED: "delayed",
  PAUSED: "paused",
  ACTIVE: "active",
  WAITING_CHILDREN: "waiting-children",
  PROCESSING: "processing",
  IN_PROGRESS: "inProgress",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export { POLLING_INTERVAL, JOB_QUEUE, JOB_PHASES, JOB_STATUS, JOB };
