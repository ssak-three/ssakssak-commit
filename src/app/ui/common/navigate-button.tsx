"use client";

import { Button } from "@/app/ui/common/button";
import { useRouter } from "next/navigation";

type NavigateButtonProps = {
  to: string;
  children: React.ReactNode;
};

function NavigateButton({ to, children }: NavigateButtonProps) {
  const router = useRouter();
  return <Button onClick={() => router.push(to)}>{children}</Button>;
}

export default NavigateButton;
