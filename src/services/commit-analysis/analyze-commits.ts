import { logger } from "@/lib/logger";
import chunkCommitsByTokens from "./helpers/chunk-commits-by-tokens";
import sortMergedResultsByCommitDate from "./helpers/sort-merged-results";
import extractCommitSummaries from "./helpers/extract-commit-summaries";
import { evaluateCommitSummaries } from "./helpers/request-analysis";
import analyzeCommitBatchesQueued from "./helpers/analyze-commit-batches-queued";
import { ReportProgress } from "@/types/job-progress";
import { GithubCommit } from "@/types/commit";
import { TOKEN_LIMITS } from "@/constants/open-ai";

type GetAnalysisResultsParams = {
  commits: GithubCommit[];
  repositoryOverview: string | undefined;
  parentJobId: string;
  onProgress: ReportProgress;
};

const getAnalysisResults = async ({
  commits,
  repositoryOverview,
  parentJobId,
  onProgress,
}: GetAnalysisResultsParams) => {
  const commitBatches = chunkCommitsByTokens(
    commits,
    TOKEN_LIMITS.MAX_TOKENS_PER_BATCH,
  );

  const batchAnalysisResults = await analyzeCommitBatchesQueued({
    parentJobId,
    commitBatches,
    repositoryOverview,
    onProgress,
  });

  const flattenedAnalysisResults = batchAnalysisResults.flatMap(
    (result) => result.commits,
  );
  logger.info(
    { mergedCount: flattenedAnalysisResults.length },
    `배치 결과 병합 완료: 총 ${flattenedAnalysisResults.length}개 커밋`,
  );

  const sortedAnalysisResults = sortMergedResultsByCommitDate(
    flattenedAnalysisResults,
  );
  logger.info(
    {
      firstCommit: sortedAnalysisResults.commits[0]?.commitDate,
      lastCommit: sortedAnalysisResults.commits.at(-1)?.commitDate,
    },
    "커밋들을 시간순으로 정렬 완료",
  );

  const extractedCommitSummaries = extractCommitSummaries(
    sortedAnalysisResults,
  );
  const overallResult = await evaluateCommitSummaries(extractedCommitSummaries);

  logger.info(
    {
      title: overallResult.reportTitle,
    },
    "리포트 생성 완료",
  );

  return { ...overallResult, ...sortedAnalysisResults };
};

export default getAnalysisResults;
