import { useFormStatus } from "react-dom";
import { Button } from "@/app/ui/common/button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="h-12 w-full rounded-lg bg-neutral-900 text-base font-semibold text-white shadow-sm hover:bg-neutral-600 focus:ring-2 focus:ring-neutral-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "리포트 생성 요청 중..." : "리포트 생성"}
    </Button>
  );
}

export default SubmitButton;
