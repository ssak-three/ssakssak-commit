"use client";

import { useState } from "react";

function AuthSwitch() {
  const [hasAccount, setHasAccount] = useState(false);

  const copy = hasAccount
    ? {
        title: "Login",
        desc: "Welcome back!\n프로젝트의 커밋 흐름과 변화를 계속 추적해 보세요.",
        label: "GitHub로 로그인하기",
      }
    : {
        title: "Get Started",
        desc: "쉽게 시작하고\n프로젝트를 더 똑똑하게 추적해 보세요.",
        label: "GitHub로 시작하기",
      };

  return (
    <>
      <h1 className="p-6 text-center text-4xl font-semibold">{copy.title}</h1>
      <p className="whitespace-pre-wrap">{copy.desc}</p>
      <button
        className="mt-3 text-sm text-neutral-500 underline"
        onClick={() => setHasAccount((prev) => !prev)}
      >
        {hasAccount ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}
      </button>
    </>
  );
}

export default AuthSwitch;
