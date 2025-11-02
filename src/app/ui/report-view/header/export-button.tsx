"use client";

import { useState } from "react";

function ExportButton() {
  const [open, setOpen] = useState(false);

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
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            📎 링크 공유
          </button>
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            📄 PDF 저장
          </button>
        </div>
      )}

      <div className="absolute right-0 mt-2 rounded bg-black px-2 py-1 text-xs text-white">
        링크 복사!
      </div>
    </div>
  );
}

export default ExportButton;
