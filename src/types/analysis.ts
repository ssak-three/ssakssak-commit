import { CommitFile, DiagramType } from "./commit";

interface Analysis {
  type: "code-diff" | "diagram" | "explanation";
  title: string;
  description: string;
  files?: CommitFile[];
  caption?: string;
  diagram?: DiagramType;
  chart?: string;
}

export type { Analysis };
