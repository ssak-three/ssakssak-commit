import {
  createReportHistory,
  updateReportHistory,
} from "@/repositories/report-history";
import { SaveReportHistoryParams } from "@/types/report-history";

const saveReportHistory = async (params: SaveReportHistoryParams) => {
  if ("reportHistoryId" in params) {
    return await updateReportHistory(params);
  }

  await createReportHistory(params);
};

export default saveReportHistory;
