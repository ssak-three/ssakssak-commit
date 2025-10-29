import { CommitDetail } from "./commit";

interface ReportData {
  reportId?: string;
  reportTitle: string;
  reportSummary: string;
  commits: CommitDetail[];
  reportConclusion: string;
  repositoryUrl: string;
  branch: string;
}

export type { ReportData };
