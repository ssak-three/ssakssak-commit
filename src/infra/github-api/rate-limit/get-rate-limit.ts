import { Octokit, RequestError } from "octokit";
import { RateLimitInfo } from "@/types/rate-limit";
import { GITHUB_API } from "@/constants/github-api";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";
import NotFoundError from "@/errors/not-found-error";
import { GITHUB_REPOSITORY_ERROR_MESSAGES } from "@/constants/error-messages";
import { logger } from "@/lib/logger";

const { HEADERS } = GITHUB_API;
const { X_GITHUB_API_VERSION, VERSION } = HEADERS;

const getRateLimitInfo = async (): Promise<RateLimitInfo> => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const octokit = new Octokit(accessToken ? { auth: accessToken } : undefined);

  try {
    const response = await octokit.request("GET /rate_limit", {
      headers: {
        [X_GITHUB_API_VERSION]: VERSION,
      },
    });

    const coreLimit = response.data.resources.core;

    return {
      remaining: coreLimit.remaining,
      reset: coreLimit.reset,
      limit: coreLimit.limit,
    };
  } catch (error) {
    logger.error(
      {
        error,
        userId: session?.user?.userId,
        hasToken: !!accessToken,
        endpoint: "GET /rate_limit",
      },
      "Rate limit 조회 실패",
    );

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

export { getRateLimitInfo };
