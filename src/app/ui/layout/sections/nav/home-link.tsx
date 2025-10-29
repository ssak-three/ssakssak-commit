"use client";

import { useReportHistory } from "@/hooks/useVerifiedContext";
import Link from "next/link";

function HomeLink() {
  const { clearSelection } = useReportHistory();

  return (
    <Link
      href="/"
      onClick={() => clearSelection()}
      className="group mb-13 flex items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-100"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white">
        <span className="text-xs text-neutral-500">SC</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm leading-none font-medium text-slate-800">
          싹싹커밋
        </span>
        <span className="text-xs text-neutral-500 group-hover:text-neutral-600">
          commit helper
        </span>
      </div>
    </Link>
  );
}

export default HomeLink;
