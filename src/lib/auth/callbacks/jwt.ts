import type { CallbacksOptions } from "next-auth";
import type { GitHubProfile } from "@/types/github-profile";
import initializeGitHubToken from "@/lib/auth/helpers/initialize-github-token";
import updateValidAccessToken from "@/lib/auth/helpers/update-valid-access-token";
import { upsertUser } from "@/repositories/user";
import { logger } from "@/lib/logger";
import { AppError } from "@/errors";
import { AUTH_ERROR_MESSAGES } from "@/constants/error-messages";

const isAccessTokenExpired = (expiresAt?: number) => {
  if (!expiresAt) {
    return false;
  }
  const buffer = 60 * 1000;
  return Date.now() + buffer >= expiresAt;
};

const jwtCallback: NonNullable<CallbacksOptions["jwt"]> = async ({
  token,
  account,
  profile,
}) => {
  if (account && profile) {
    const githubProfile = profile as GitHubProfile;
    const resultToken = initializeGitHubToken(token, account, githubProfile);

    try {
      const user = await upsertUser({
        githubId: BigInt(githubProfile.id),
        email: githubProfile.email ?? "",
        name: githubProfile.name ?? githubProfile.login,
        avatarUrl: githubProfile.avatar_url ?? null,
      });

      resultToken.userId = user.userId;

      return resultToken;
    } catch (error) {
      logger?.error?.(
        { error, ghId: githubProfile.id },
        "jwtCallback upsertUser failed",
      );
      throw new AppError({
        status: 500,
        message: AUTH_ERROR_MESSAGES.UNKNOWN,
      });
    }
  }

  if (!isAccessTokenExpired(token.accessTokenExpires)) {
    return token;
  }

  return updateValidAccessToken(token);
};

export default jwtCallback;
