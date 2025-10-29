import { GithubCommit } from "@/types/commit";
import { TOKEN_LIMITS, REQUEST_INPUT_INTRO_MESSAGE } from "@/constants/open-ai";
import chunkCommitsByTokens from "@/services/commit-analysis/helpers/chunk-commits-by-tokens";
import {
  commitAnalysesSchema,
  overallAnalysisSchema,
} from "@/lib/validators/structured-analysis-result";
import { logger } from "@/lib/logger";
import {
  COMMIT_ANALYSIS_INSTRUCTIONS,
  REPORT_ANALYSIS_INSTRUCTIONS,
} from "@/infra/integrations/openai/instructions";
import { structuredTextGenerator } from "@/infra/integrations/openai/openai-client";
import createInputBlocks from "@/infra/integrations/openai/helpers/create-input-blocks";
import sortMergedResultsByCommitDate from "./helpers/sort-merged-results";
import extractCommitSummaries from "./helpers/extract-commit-summaries";

interface ExtractedCommitSummaries {
  commitId: string;
  changeSummary: string;
  commitConclusion: string;
}

const { MAX_OUTPUT_TOKENS_OVERALL, MAX_OUTPUT_TOKENS_PER_BATCH } = TOKEN_LIMITS;
const { COMMIT_ANALYSIS_REQUEST, OVERALL_ANALYSIS_REQUEST } =
  REQUEST_INPUT_INTRO_MESSAGE;

const getAnalysisResults = async (
  commits: GithubCommit[],
  repositoryOverview: string | undefined,
) => {
  const commitBatches = chunkCommitsByTokens(
    commits,
    TOKEN_LIMITS.MAX_TOKENS_PER_BATCH,
  );
  const resultPerBatch = await analyzeCommitBatches(
    commitBatches,
    repositoryOverview,
  );

  const mergedResults = resultPerBatch.flatMap((result) => result.commits);
  logger.info(
    { mergedCount: mergedResults.length },
    `배치 결과 병합 완료: 총 ${mergedResults.length}개 커밋`,
  );

  const sortedMergedResults = sortMergedResultsByCommitDate(mergedResults);
  logger.info(
    {
      firstCommit: sortedMergedResults.commits[0]?.commitDate,
      lastCommit: sortedMergedResults.commits.at(-1)?.commitDate,
    },
    "커밋들을 시간순으로 정렬 완료",
  );

  const extractedCommitSummaries = extractCommitSummaries(sortedMergedResults);
  const overallResult = await evaluateCommitSummaries(extractedCommitSummaries);

  logger.info(
    {
      title: overallResult.reportTitle,
    },
    "리포트 생성 완료",
  );

  return { ...overallResult, ...sortedMergedResults };
};

const analyzeCommitBatches = async (
  commitBatches: GithubCommit[][],
  repositoryOverview?: string,
) => {
  return Promise.all(
    commitBatches.map(async (batch, index) => {
      logger.info(
        { batchIndex: index, commitCount: batch.length },
        `배치 ${index + 1}/${commitBatches.length} 분석 시작`,
      );

      const result = await requestCommitAnalysis(batch, repositoryOverview);

      logger.info(
        { batchIndex: index, commitCount: batch.length },
        `배치 ${index + 1}/${commitBatches.length} 분석 완료`,
      );

      return result;
    }),
  );
};

const requestCommitAnalysis = async (
  batch: GithubCommit[],
  repositoryOverview?: string,
) => {
  const inputContent = createInputBlocks({
    intro: COMMIT_ANALYSIS_REQUEST,
    payload: batch,
    repositoryOverview: repositoryOverview,
  });

  return await structuredTextGenerator({
    maxOutputTokens: MAX_OUTPUT_TOKENS_PER_BATCH,
    instructions: COMMIT_ANALYSIS_INSTRUCTIONS,
    inputBlocks: inputContent,
    zodSchema: commitAnalysesSchema,
    resultTag: "commitAnalyses_result",
  });
};

const evaluateCommitSummaries = async (
  extractedCommitSummaries: ExtractedCommitSummaries[],
  repositoryOverview?: string,
) => {
  const inputContent = createInputBlocks({
    intro: OVERALL_ANALYSIS_REQUEST,
    payload: extractedCommitSummaries,
    repositoryOverview: repositoryOverview,
  });

  return await structuredTextGenerator({
    maxOutputTokens: MAX_OUTPUT_TOKENS_OVERALL,
    instructions: REPORT_ANALYSIS_INSTRUCTIONS,
    inputBlocks: inputContent,
    zodSchema: overallAnalysisSchema,
    resultTag: "overallAnalysis_result",
  });
};

export default getAnalysisResults;
