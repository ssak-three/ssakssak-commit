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
});

async function getByReportId(userId: string, reportId: string) {
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

export { getByReportId, getReports, deleteReports };
