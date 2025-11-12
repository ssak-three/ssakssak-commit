import type { CallbacksOptions } from "next-auth";
import type { GitHubProfile } from "@/types/github-profile";
import { upsertUser } from "@/repositories/user";

const signInCallback: NonNullable<CallbacksOptions["signIn"]> = async ({
  account,
  profile,
}) => {
  if (account?.provider !== "github") {
    return "/auth/error?code=INVALID_PROVIDER";
  }

  try {
    const githubProfile = profile as GitHubProfile;
    const email =
      githubProfile.email ?? `${githubProfile.login}@users.noreply.github.com`;

    await upsertUser({
      githubId: BigInt(githubProfile.id),
      email,
      name: githubProfile.name ?? githubProfile.login,
      avatarUrl: githubProfile.avatar_url ?? null,
    });

    return true;
  } catch {
    return "/auth/error?code=INTERNAL_ERROR";
  }
};

export default signInCallback;
