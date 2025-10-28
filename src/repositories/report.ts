import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const saveReportToDatabase = async (data: {
  userId?: string | null;
  reportTitle: string;
  reportSummary: string;
  reportConclusion: string;
  owner: string;
  repositoryName: string;
  repositoryUrl: string;
  branch: string;
  commits: Prisma.JsonValue;
}) => {
  return prisma.report.create({
    data: {
      userId: data.userId || undefined,
      reportTitle: data.reportTitle,
      reportSummary: data.reportSummary,
      reportConclusion: data.reportConclusion,
      owner: data.owner,
      repositoryName: data.repositoryName,
      repositoryUrl: data.repositoryUrl,
      branch: data.branch,
      commits: data.commits as Prisma.InputJsonValue,
    },
  });
};

const findReportsByTitlePrefix = async (titlePrefix: string) => {
  return prisma.report.findMany({
    where: {
      reportTitle: {
        startsWith: titlePrefix,
      },
    },
  });
};

export { findReportsByTitlePrefix, saveReportToDatabase };
