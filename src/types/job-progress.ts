import { JOB_PHASES } from "@/constants/report-job";

type ProgressPhase = (typeof JOB_PHASES)[keyof typeof JOB_PHASES];

type ProgressPayload = {
  phase: ProgressPhase;
  meta?: Record<string, unknown>;
};

type ReportProgress = (progress: ProgressPayload) => Promise<void> | void;

export type { ProgressPhase, ReportProgress };
