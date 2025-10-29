"use client";

import { useState } from "react";
import { ReportHistory } from "@/types/report-history";
import { Modal } from "@/app/ui/common/Modal";
import { Trash2 } from "lucide-react";

function ReportHistoryItem({
  item,
  onSelect,
  onDelete,
}: {
  item: ReportHistory;
  onSelect: (it: ReportHistory) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li className="group">
      <div
        role="button"
        onClick={() => onSelect(item)}
        title={item.reportTitle}
        className="flex h-11 w-full items-center justify-between px-3 text-sm text-slate-700 hover:bg-purple-50"
      >
        <span className="truncate">{item.reportTitle}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="rounded p-1 text-neutral-400 opacity-0 transition group-hover:opacity-100 hover:bg-neutral-100 hover:text-red-500"
        >
          <Trash2 className="w-4" />
        </button>
      </div>
      <Modal
        open={open}
        title={`"${item.reportTitle}" 기록을(를)\n삭제하시겠습니까?`}
        description="이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          onDelete();
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </li>
  );
}

export default ReportHistoryItem;
