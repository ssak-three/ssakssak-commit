import { z } from "zod";
import { commitAnalysesSchema } from "@/lib/validators/structured-analysis-result";

type CommitAnalysesSchema = z.infer<typeof commitAnalysesSchema>;

const extractCommitSummaries = (sortedList: CommitAnalysesSchema) => {
  const extractedSummaries = sortedList.commits.map((data) => ({
    commitId: data.commitId,
    changeSummary: data.changeSummary,
    commitConclusion: data.commitConclusion,
  }));

  return extractedSummaries;
};

export default extractCommitSummaries;
