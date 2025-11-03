import { JOB_STATUS, JOB_PHASES } from "@/constants/report-job";

type JobStatus =
  | typeof JOB_STATUS.PROCESSING
  | typeof JOB_STATUS.COMPLETED
  | typeof JOB_STATUS.FAILED;

type Phase =
  | typeof JOB_PHASES.COLLECTING
  | typeof JOB_PHASES.ANALYZING
  | typeof JOB_PHASES.VISUALIZING;

interface JobProgress {
  phase: Phase;
  meta?: {
    done?: number;
    total?: number;
    percent?: number;
  };
}

interface JobResponse {
  status: JobStatus;
  reportId?: string;
  reason?: string;
  state?: string;
  progress?: JobProgress;
  children?: {
    processed: number;
    failed: number;
    unprocessed: number;
    ignored: number;
  };
}

export type { JobStatus, Phase, JobProgress, JobResponse };
