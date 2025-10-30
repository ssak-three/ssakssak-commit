"use client";

interface JobErrorCardProps {
  error: string;
  onReturnHome: () => void;
}

function JobErrorCard({ error, onReturnHome }: JobErrorCardProps) {
  return (
    <div className="flex w-[320px] flex-col items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
        <span className="text-xl font-bold">!</span>
      </div>
      <p className="text-lg font-semibold text-red-800">오류가 발생했습니다</p>
      <p className="text-center text-sm text-red-700">{error}</p>
      <button
        onClick={onReturnHome}
        className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default JobErrorCard;
