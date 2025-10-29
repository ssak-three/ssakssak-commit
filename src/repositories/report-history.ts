import prisma from "@/lib/prisma";
import {
  CreateReportHistoryParams,
  UpdateReportHistoryParams,
  DeleteReportHistoryParams,
} from "@/types/report-history";

const findReportHistoriesByUser = async (userId: string) => {
  return await prisma.reportHistory.findMany({
    where: {
      userId: userId,
      isActive: true,
    },
    select: {
      reportHistoryId: true,
      reportTitle: true,
      repositoryOverview: true,
      repositoryUrl: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

const createReportHistory = async ({
  userId,
  reportTitle,
  repositoryOverview,
  repositoryUrl,
}: CreateReportHistoryParams) => {
  return await prisma.reportHistory.create({
    data: {
      userId: userId,
      reportTitle: reportTitle,
      repositoryOverview: repositoryOverview,
      repositoryUrl: repositoryUrl,
    },
  });
};

const updateReportHistory = async ({
  reportHistoryId,
  reportTitle,
  repositoryOverview,
  repositoryUrl,
}: UpdateReportHistoryParams) => {
  return await prisma.reportHistory.update({
    where: {
      reportHistoryId: reportHistoryId,
    },
    data: {
      reportTitle: reportTitle,
      repositoryOverview: repositoryOverview,
      repositoryUrl: repositoryUrl,
    },
  });
};

const deleteReportHistory = async ({
  userId,
  reportHistoryId,
}: DeleteReportHistoryParams) => {
  return await prisma.reportHistory.update({
    where: {
      userId: userId,
      reportHistoryId: reportHistoryId,
    },
    data: {
      isActive: false,
    },
  });
};

export {
  findReportHistoriesByUser,
  createReportHistory,
  updateReportHistory,
  deleteReportHistory,
};
