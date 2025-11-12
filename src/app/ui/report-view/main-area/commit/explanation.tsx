import { Analysis } from "@/types/analysis";

interface AnalysisSummaryProps {
  data: Analysis;
}

function Explanation({ data }: AnalysisSummaryProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          요약 & 분석: {data.title}
        </h3>
        <p className="text-base leading-relaxed text-gray-700">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export default Explanation;
