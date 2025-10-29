"use client";

import { usePathname } from "next/navigation";
import { ClipboardCheckIcon } from "lucide-react";
import NavLink from "@/app/ui/layout/sections/nav/nav-link";
import ReportHistoryPanel from "@/app/ui/layout/sections/report-history/panel";
import { useReportHistory } from "@/hooks/useVerifiedContext";

function NavLinks() {
  const currentPath = usePathname();
  const showHistoryList = currentPath === "/";
  const { clearSelection } = useReportHistory();
  const isDev = process.env.NODE_ENV === "development";

  return (
    <>
      <NavLink
        href={"/"}
        label={"리포트 생성"}
        onClick={() => clearSelection()}
      >
        <ClipboardCheckIcon className="w-6" />
      </NavLink>

      {isDev && showHistoryList && <ReportHistoryPanel />}

      <NavLink href={"/reports"} label={"리포트 결과 보관함"}>
        <ClipboardCheckIcon className="w-6" />
      </NavLink>
    </>
  );
}

export default NavLinks;
