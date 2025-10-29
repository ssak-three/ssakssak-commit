import { Analysis } from "./analysis";
import { Highlight } from "./monaco";

type FileStatus = "added" | "modified" | "deleted";

type DiagramType = "sequence" | "class" | "flowchart";

interface CommitFile {
  codeDiffSummary: string;
  code: string;
  language: string;
  filename: string;
  status: FileStatus;
  path: string;
  highlights: Highlight[];
}

interface CommitDetail {
  commitId: string;
  commitDate: string;
  commitMessage: string;
  author: string;
  commitLink: string;
  changeSummary: string;
  analyses: Analysis[];
  commitConclusion: string;
}

interface GithubCommit {
  commitId: string;
  author: string;
  commitDate: string;
  commitMessage: string;
  files: CommitFile[];
}

export type { CommitFile, CommitDetail, GithubCommit, DiagramType };
