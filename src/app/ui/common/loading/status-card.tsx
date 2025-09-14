"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

const JobCompletedCard: React.FC = () => {
  return (
    <div className="flex w-[320px] flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6">
      <CheckCircle className="h-12 w-12 text-green-500" />
      <p className="text-lg font-semibold text-green-800">
        분석이 완료되었습니다.
      </p>
      <p className="text-sm text-green-700">결과 페이지로 이동합니다...</p>
    </div>
  );
};

interface JobErrorCardProps {
  error: string;
  onReturnHome: () => void;
}

const JobErrorCard: React.FC<JobErrorCardProps> = ({ error, onReturnHome }) => {
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
};

const JobLoadingCard: React.FC = () => {
  return (
    <div className="flex w-[320px] flex-col items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      <p className="text-lg font-semibold text-gray-800">초기화 중...</p>
    </div>
  );
};

export { JobCompletedCard, JobErrorCard, JobLoadingCard };
