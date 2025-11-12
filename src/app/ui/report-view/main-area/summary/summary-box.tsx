interface SummaryBoxProps {
  reportSummary: string;
}

function SummaryBox({ reportSummary }: SummaryBoxProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 border-b text-xl font-bold text-gray-900">
        📊 전체 분석 및 요약
      </h2>
      <p className="text-base leading-relaxed text-gray-700">{reportSummary}</p>
    </div>
  );
}

export default SummaryBox;
