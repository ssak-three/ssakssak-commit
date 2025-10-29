import { ReportHistory } from "@/types/report-history";
import ReportHistoryItem from "@/app/ui/layout/sections/report-history/item";

function ReportHistoryList({
  reportHistories,
  onSelect,
  rows = 5,
  onDelete,
}: {
  reportHistories: ReportHistory[];
  onSelect: (item: ReportHistory) => void;
  rows?: number;
  onDelete: (id: string) => void;
}) {
  return (
    <ul
      className="divide-y divide-neutral-200 overflow-y-auto rounded-md bg-white"
      style={{ height: `${rows * 40 + 10}px` }}
    >
      {reportHistories.map((history) => (
        <ReportHistoryItem
          key={history.reportHistoryId}
          item={history}
          onSelect={onSelect}
          onDelete={() => onDelete(history.reportHistoryId)}
        />
      ))}
    </ul>
  );
}

export default ReportHistoryList;
