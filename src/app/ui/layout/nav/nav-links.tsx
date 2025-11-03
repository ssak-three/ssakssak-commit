"use client";

import { ClipboardCheckIcon } from "lucide-react";
import NavLink from "@/app/ui/layout/nav/nav-link";

function NavLinks() {
  return (
    <>
      <NavLink href={"/"} label={"리포트 생성"}>
        <ClipboardCheckIcon className="w-6" />
      </NavLink>

      <NavLink href={"/reports"} label={"리포트 결과 보관함"}>
        <ClipboardCheckIcon className="w-6" />
      </NavLink>
    </>
  );
}

export default NavLinks;
