import { findReportHistoriesByUser } from "@/repositories/report-history";

const getReportHistoryList = async (userId: string) => {
  const reportHistoryList = await findReportHistoriesByUser(userId);

  return reportHistoryList;
};

export default getReportHistoryList;
