import type { ReactNode } from "react";

type FileStatus =
  | "added"
  | "modified"
  | "deleted"
  | "removed"
  | "renamed"
  | "copied";

interface Highlight {
  startLine: number;
  endLine: number;
}

interface FileData {
  commitId: string;
  path: string;
  code: string;
  language: string;
  highlights: Highlight[];
  status: FileStatus;
}

interface AnalysisData {
  files: FileData[];
}

interface MonacoFileBaseProps {
  code: string;
  highlights: Highlight[];
  fileStatus: FileStatus;
}

interface MonacoFileViewerProps extends MonacoFileBaseProps {
  filename: string;
  language: string;
  readOnly?: boolean;
}

interface MonacoAutoHeightProps {
  code: string;
  lineHeight?: number;
  padding?: number;
  minHeight?: number;
  maxHeight?: number;
  children: (height: number) => ReactNode;
}

export type {
  FileStatus,
  Highlight,
  FileData,
  AnalysisData,
  MonacoFileViewerProps,
  MonacoFileBaseProps,
  MonacoAutoHeightProps,
};
