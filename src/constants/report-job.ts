const POLLING_INTERVAL = 2000;

const JOB_QUEUE = {
  REPORT_CREATION: "reportCreation",
};

const JOB_PHASES = {
  PENDING: "pending",
  COLLECTING: "collecting",
  ANALYZING: "analyzing",
  VISUALIZING: "visualizing",
  COMPLETED: "completed",
};

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
};

export { POLLING_INTERVAL, JOB_QUEUE, JOB_PHASES, JOB_STATUS };
