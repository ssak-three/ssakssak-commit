import { GithubCommit } from "@/types/commit";
import { TOKEN_LIMITS } from "@/constants/open-ai";
import { logger } from "@/lib/logger";

const chunkCommitsByTokens = (
  commits: GithubCommit[],
  maxTokensPerBatch: number,
): GithubCommit[][] => {
  const batches: GithubCommit[][] = [];
  let currentBatch: GithubCommit[] = [];
  let currentBatchTokenCount = 0;

  for (const commit of commits) {
    const commitText = JSON.stringify(commit);
    const commitTokenCount = estimateTokenCount(commitText);

    if (commitTokenCount > maxTokensPerBatch) {
      if (currentBatch.length > 0) {
        batches.push(currentBatch);
        currentBatch = [];
        currentBatchTokenCount = 0;
      }
      batches.push([commit]);
      continue;
    }

    if (currentBatchTokenCount + commitTokenCount <= maxTokensPerBatch) {
      currentBatch.push(commit);
      currentBatchTokenCount += commitTokenCount;
    } else {
      batches.push(currentBatch);
      currentBatch = [commit];
      currentBatchTokenCount = commitTokenCount;
    }
  }

  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  logger.info(
    {
      batchCount: batches.length,
      commitCount: commits.length,
    },
    `커밋 ${commits.length}개를 ${batches.length}개의 배치로 분할 완료`,
  );

  return batches;
};

export default chunkCommitsByTokens;

function estimateTokenCount(text: string): number {
  const roughTokenCount = text.length / TOKEN_LIMITS.AVERAGE_CHARS_PER_TOKEN;
  const estimatedTokenCount = Math.ceil(roughTokenCount);

  return estimatedTokenCount;
}
