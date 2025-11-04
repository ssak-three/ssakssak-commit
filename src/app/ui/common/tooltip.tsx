"use client";

import { useState, type ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="inline-flex items-center justify-center align-middle">
        {children}
      </span>

      <div
        className={`pointer-events-none absolute top-1/2 left-full ml-2 w-max -translate-y-1/2 rounded-md bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg transition-all duration-150 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {content}
      </div>
    </span>
  );
}

function InfoTooltip({ content }: { content: React.ReactNode }) {
  return (
    <Tooltip content={content}>
      <span className="inline-flex h-4 w-4 cursor-default items-center justify-center rounded-full bg-neutral-200 text-[10px] leading-none font-semibold text-neutral-700">
        ?
      </span>
    </Tooltip>
  );
}

export { InfoTooltip };
