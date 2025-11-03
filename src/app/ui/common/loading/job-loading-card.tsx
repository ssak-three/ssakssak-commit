function JobLoadingCard() {
  return (
    <div className="flex w-[320px] flex-col items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      <p className="text-lg font-semibold text-gray-800">
        분석 작업 불러오는 중...
      </p>
      <p className="text-sm text-gray-600">잠시만 기다려 주세요</p>
    </div>
  );
}

export default JobLoadingCard;
