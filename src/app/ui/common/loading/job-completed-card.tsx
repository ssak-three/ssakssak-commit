import { CheckCircle } from "lucide-react";

function JobCompletedCard() {
  return (
    <div className="flex w-[320px] flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6">
      <CheckCircle className="h-12 w-12 text-green-500" />
      <p className="text-lg font-semibold text-green-800">
        분석이 완료되었습니다.
      </p>
      <p className="text-sm text-green-700">결과 페이지로 이동합니다...</p>
    </div>
  );
}

export default JobCompletedCard;
