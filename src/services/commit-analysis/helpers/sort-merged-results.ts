import { z } from "zod";
import {
  commitAnalysesSchema,
  analyzedCommitSchema,
} from "@/lib/validators/structured-analysis-result";

type CommitAnalysesSchema = z.infer<typeof commitAnalysesSchema>;
type AnalyzedCommitSchema = z.infer<typeof analyzedCommitSchema>;

const sortMergedResultsByCommitDate = (
  merged: AnalyzedCommitSchema[],
): CommitAnalysesSchema => {
  const sortedList = [...merged].sort((commitA, commitB) => {
    const commitTimeA = new Date(commitA.commitDate).getTime();
    const commitTimeB = new Date(commitB.commitDate).getTime();
    if (commitTimeA !== commitTimeB) {
      return commitTimeA - commitTimeB;
    }
    return commitA.commitId.localeCompare(commitB.commitId);
  });

  return { commits: sortedList };
};

export default sortMergedResultsByCommitDate;
