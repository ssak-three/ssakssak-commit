type ProgressPhase =
  | "pending"
  | "collecting"
  | "analyzing"
  | "visualizing"
  | "completed"
  | "failed";

type ProgreessPayload = {
  phase: ProgressPhase;
  meta?: Record<string, unknown>;
};

type ReportProgress = (progress: ProgreessPayload) => Promise<void> | void;

export type { ProgressPhase, ReportProgress };
