const JOB_QUEUE = {
  REPORT_CREATION: "reportCreation",
  ANALYSIS_BATCH: "analysisBatch",
};

const JOB_PHASES = {
  PENDING: "pending",
  COLLECTING: "collecting",
  ANALYZING: "analyzing",
  VISUALIZING: "visualizing",
  COMPLETED: "completed",
  FAILED: "failed",
};

const JOB_STATES = {
  WAITING: "waiting",
  DELAYED: "delayed",
  PAUSED: "paused",
  ACTIVE: "active",
  WAITING_CHILDREN: "waiting-children",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
};

export { JOB_QUEUE, JOB_PHASES, JOB_STATES };
