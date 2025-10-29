import { DeleteReportHistoryParams } from "@/types/report-history";
import { deleteReportHistory } from "@/repositories/report-history";

const removeReportHistory = async ({
  userId,
  reportHistoryId,
}: DeleteReportHistoryParams) => {
  await deleteReportHistory({ userId, reportHistoryId });
};

export default removeReportHistory;
