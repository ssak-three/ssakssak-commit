import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import { GitHubProfile } from "@/types/github-profile";

const initializeGitHubToken = (
  token: JWT,
  account: Account,
  profile: GitHubProfile,
) => {
  token.accessToken = account.access_token as string | undefined;
  token.refreshToken = account.refresh_token as string | undefined;

  if (account.expires_at) {
    token.accessTokenExpires = account.expires_at * 1000;
  }

  token.userName = profile?.login;
  token.githubId = String(profile.id);

  return token;
};

export default initializeGitHubToken;
