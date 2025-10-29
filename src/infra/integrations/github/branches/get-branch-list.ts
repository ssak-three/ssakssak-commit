import { Octokit, RequestError } from "octokit";
import { BranchName } from "@/types/branch";
import NotFoundError from "@/errors/not-found-error";
import { GITHUB_REPOSITORY_ERROR_MESSAGES } from "@/constants/error-messages";
import { GITHUB_API } from "@/constants/github-api";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";

const { HEADERS, ENDPOINTS } = GITHUB_API;
const { X_GITHUB_API_VERSION, VERSION } = HEADERS;

const getGithubBranchList = async (
  owner: string,
  repositoryName: string,
): Promise<BranchName[]> => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const octokit = new Octokit(accessToken ? { auth: accessToken } : undefined);
  try {
    const response = await octokit.request(ENDPOINTS.BRANCH.LIST, {
      owner: owner,
      repo: repositoryName,
      headers: {
        [X_GITHUB_API_VERSION]: VERSION,
      },
    });

    const branches: BranchName[] = response.data.map(
      (branch: { name: string }) => branch.name,
    );

    return branches;
  } catch (error) {
    if (error instanceof RequestError) {
      if (error.status === 404) {
        throw new NotFoundError({
          message: GITHUB_REPOSITORY_ERROR_MESSAGES.NOT_FOUND,
        });
      }
    }
    throw error;
  }
};

export { getGithubBranchList };
