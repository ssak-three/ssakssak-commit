"use client";

import { useState } from "react";

function ExportButton() {
  const [open, setOpen] = useState(false);
  const [copyDone, setCopyDone] = useState(false);

  const handleCopyLink = async () => {
    setCopyDone(false);

    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);
      setCopyDone(true);

      setTimeout(() => setCopyDone(false), 1500);
      setOpen(false);
    } catch (error) {
      console.error("링크 복사 실패", error);
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="relative inline-block text-left">
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
          <button className="w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-gray-100">
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
