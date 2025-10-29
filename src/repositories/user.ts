import prisma from "@/lib/prisma";

type UpsertUserParams = {
  githubId: bigint;
  email: string;
  name: string;
  avatarUrl?: string | null;
};

const upsertUser = async ({
  githubId,
  email,
  name,
  avatarUrl,
}: UpsertUserParams) => {
  const baseData = {
    userEmail: email,
    userName: name,
    isActive: true,
  };

  return prisma.user.upsert({
    where: {
      githubId: githubId,
    },
    update: {
      ...baseData,
      avatarUrl: avatarUrl ?? undefined,
    },
    create: {
      ...baseData,
      githubId: githubId,
      avatarUrl: avatarUrl ?? null,
    },
  });
};

const findUserIdByGithubId = async (githubId: bigint) => {
  return prisma.user.findUnique({
    where: { githubId: githubId },
    select: { userId: true },
  });
};

export { upsertUser, findUserIdByGithubId };
