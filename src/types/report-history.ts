type ReportHistoryBase = {
  reportHistoryId: string;
  reportTitle: string;
  repositoryUrl: string;
  repositoryOverview?: string;
};

type ReportHistory = ReportHistoryBase;

type CreateReportHistoryParams = Omit<ReportHistoryBase, "reportHistoryId"> & {
  userId: string;
};

type UpdateReportHistoryParams = {
  reportHistoryId: string;
} & Partial<Omit<ReportHistoryBase, "reportHistoryId">>;

type DeleteReportHistoryParams = {
  userId: string;
  reportHistoryId: string;
};

type SaveReportHistoryParams =
  | CreateReportHistoryParams
  | UpdateReportHistoryParams;

export type {
  ReportHistory,
  CreateReportHistoryParams,
  UpdateReportHistoryParams,
  SaveReportHistoryParams,
  DeleteReportHistoryParams,
};
