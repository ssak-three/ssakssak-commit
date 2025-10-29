import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";
import { CommitFile } from "@/types/commit";
import { GithubCommit } from "@/types/commit";
import { GITHUB_API } from "@/constants/github-api";
import { EXCLUDED_FILES_LIST } from "@/constants/file-filters";
import { shouldExcludeFile } from "@/lib/file-filter";

type CommitDetailResponse =
  Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"]["response"]["data"];

const getGithubCommitDetails = async (
  owner: string,
  repositoryName: string,
  shaList: string[],
  accessToken?: string,
): Promise<GithubCommit[]> => {
  const octokit = new Octokit(accessToken ? { auth: accessToken } : undefined);

  const commitDetails = await Promise.all(
    shaList.map(async (sha): Promise<GithubCommit | null> => {
      const { data: commitDetail }: { data: CommitDetailResponse } =
        await octokit.request(GITHUB_API.ENDPOINTS.COMMITS.DETAIL, {
          owner,
          repo: repositoryName,
          sha,
        });

      const filteredFiles = commitDetail.files?.filter(
        (file) => !shouldExcludeFile(file.filename, EXCLUDED_FILES_LIST),
      );

      if (!filteredFiles || filteredFiles.length === 0) {
        return null;
      }

      const files = filteredFiles.map(
        (file): CommitFile => ({
          filename: file.filename,
          status: file.status as CommitFile["status"],
          path: file.filename,
          codeDiffSummary: file.patch ?? "",
          code: "",
          language: "",
          highlights: [],
        }),
      );

      return {
        commitId: sha,
        author: commitDetail.commit.author?.name || "Unknown",
        commitDate: commitDetail.commit.author?.date || "",
        commitMessage: commitDetail.commit.message,
        files,
      };
    }),
  );

  return commitDetails.filter(
    (commit): commit is GithubCommit => commit !== null,
  );
};

export { getGithubCommitDetails };
