import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type DeleteManyArgs = {
  userId: string;
  reportIds: string[];
};

const reportCommonFields = Prisma.validator<Prisma.ReportSelect>()({
  reportId: true,
  reportTitle: true,
  repositoryName: true,
  owner: true,
  branch: true,
  repositoryUrl: true,
});

async function getReportById(userId: string, reportId: string) {
  const report = await prisma.report.findUnique({
    where: { reportId, userId, isActive: true },
    select: {
      ...reportCommonFields,
      reportSummary: true,
      reportConclusion: true,
      commits: true,
    },
  });

  return report;
}

async function getReports(userId: string) {
  return prisma.report.findMany({
    where: { userId, isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      ...reportCommonFields,
      createdAt: true,
    },
  });
}

async function deleteReports({ userId, reportIds }: DeleteManyArgs) {
  const result = await prisma.report.updateMany({
    where: { userId, isActive: true, reportId: { in: reportIds } },
    data: { isActive: false },
  });

  return result;
}

const findReportsByTitlePrefix = (userId: string, titlePrefix: string) => {
  return prisma.report.findMany({
    where: {
      userId,
      isActive: true,
      reportTitle: {
        startsWith: titlePrefix,
      },
    },
  });
};

const saveReport = (data: {
  userId: string;
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
      userId: data.userId,
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

export {
  getReportById,
  getReports,
  deleteReports,
  findReportsByTitlePrefix,
  saveReport,
};
