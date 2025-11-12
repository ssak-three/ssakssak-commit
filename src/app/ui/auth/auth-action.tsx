"use client";

import { Button } from "@/app/ui/common/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import NavigateButton from "@/app/ui/common/navigate-button";

type AuthActionsProps = {
  callbackUrl?: string;
  label?: string;
  showSecondary?: boolean;
};

function AuthActions({
  callbackUrl = "/",
  label = "GitHub로 시작하기",
  showSecondary = true,
}: AuthActionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Button
        className="hover:gray-80 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm hover:text-white"
        onClick={() => signIn("github", { callbackUrl })}
      >
        <Image src="/github-mark.svg" width={20} height={20} alt="Github" />
        <span className="whitespace-nowrap">{label}</span>
      </Button>

      {showSecondary && (
        <NavigateButton to="/">리포트 생성 페이지로 이동</NavigateButton>
      )}
    </div>
  );
}

export default AuthActions;
