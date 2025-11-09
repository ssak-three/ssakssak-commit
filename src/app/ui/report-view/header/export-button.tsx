"use client";

import { REPORT_SHARE_ERROR_MESSAGES } from "@/constants/error-messages";
import { ReportData } from "@/types/report";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function ExportButton({ report }: { report: ReportData }) {
  const [open, setOpen] = useState(false);
  const [copyDone, setCopyDone] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { reportId } = useParams<{ reportId: string }>();

  const handleCopyLink = async () => {
    setCopyDone(false);

    try {
      if (!reportId || !report) {
        alert(REPORT_SHARE_ERROR_MESSAGES.REPORT_NOT_FOUND);
        return;
      }

      const response = await fetch(`/api/reports/${reportId}/cache`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ report }),
      });

      const { ensuredReportId } = (await response.json()) as {
        ensuredReportId: string;
      };

      const shareUrl = `${window.location.origin}/report-view/${ensuredReportId}`;
      await navigator.clipboard.writeText(shareUrl);

      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 1500);
      setOpen(false);
    } catch (error) {
      console.error(REPORT_SHARE_ERROR_MESSAGES.COPY_FAILED, error);
      alert(REPORT_SHARE_ERROR_MESSAGES.COPY_FAILED);
    }
  };

  const handlePrintPDF = () => {
    setOpen(false);
    window.print();
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left print:hidden">
      <button
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="cursor-pointer rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
      >
        📤 내보내기
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-md border bg-white shadow-md">
          <button
            onClick={handleCopyLink}
            className="w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            📎 링크 공유
          </button>
          <button
            onClick={handlePrintPDF}
            className="w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            📄 PDF 저장
          </button>
        </div>
      )}

      {copyDone && (
        <div className="absolute right-0 mt-2 rounded bg-black px-2 py-1 text-xs text-white">
          링크 복사!
        </div>
      )}
    </div>
  );
}

export default ExportButton;
