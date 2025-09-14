import { GithubCommit } from "@/types/commit";
import { structuredTextGenerator } from "@/infra/integrations/openai/openai-client";
import createInputBlocks from "@/infra/integrations/openai/helpers/create-input-blocks";
import {
  commitAnalysesSchema,
  overallAnalysisSchema,
} from "@/lib/validators/structured-analysis-result";
import {
  COMMIT_ANALYSIS_INSTRUCTIONS,
  REPORT_ANALYSIS_INSTRUCTIONS,
} from "@/infra/integrations/openai/instructions";
import { REQUEST_INPUT_INTRO_MESSAGE } from "@/constants/open-ai";
import { TOKEN_LIMITS } from "@/constants/open-ai";

interface ExtractedCommitSummaries {
  commitId: string;
  changeSummary: string;
  commitConclusion: string;
}

const { MAX_OUTPUT_TOKENS_OVERALL, MAX_OUTPUT_TOKENS_PER_BATCH } = TOKEN_LIMITS;
const { COMMIT_ANALYSIS_REQUEST, OVERALL_ANALYSIS_REQUEST } =
  REQUEST_INPUT_INTRO_MESSAGE;

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

export { requestCommitAnalysis, evaluateCommitSummaries };
