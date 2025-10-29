import type { CallbacksOptions } from "next-auth";
import type { GitHubProfile } from "@/types/github-profile";
import initializeGitHubToken from "@/lib/auth/helpers/initialize-github-token";
import updateValidAccessToken from "@/lib/auth/helpers/update-valid-access-token";
import { findUserIdByGithubId } from "@/repositories/user";

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
    const resultToken = initializeGitHubToken(
      token,
      account,
      profile as GitHubProfile,
    );

    const githubProfile = profile as GitHubProfile;
    const user = await findUserIdByGithubId(BigInt(githubProfile.id));

    if (user) {
      resultToken.userId = user.userId;
    }

    return resultToken;
  }

  if (!isAccessTokenExpired(token.accessTokenExpires)) {
    return token;
  }

  return updateValidAccessToken(token);
};

export default jwtCallback;
