type JobStatus = "processing" | "completed" | "failed";
type Phase = "collecting" | "analyzing" | "visualizing";

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
  reportKey?: string;
  reason?: string;
  state?: string;
  progress?: JobProgress;
  children?: {
    processed: number;
    failed: number;
    unprocessed: number;
    ignored: number;
  };
  derivedPercent?: number;
}

export type { JobStatus, Phase, JobProgress, JobResponse };
