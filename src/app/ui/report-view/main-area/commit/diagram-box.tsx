import { Analysis } from "@/types/analysis";
import Mermaid from "@/app/ui/report-view/mermaid";
import { MermaidConfig } from "mermaid";

interface AnalysisSummaryProps {
  data: Analysis;
}

function DiagramBox({ data }: AnalysisSummaryProps) {
  const defaultMermaidConfig: MermaidConfig = {
    startOnLoad: false,
    securityLevel: "strict",
    theme: "default",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {data.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          {data.description}
        </p>

        {data.type === "diagram" && data.chart && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <Mermaid chart={data.chart} config={defaultMermaidConfig} />
            {data.caption && (
              <p className="mt-4 text-center text-sm text-gray-500 italic">
                {data.caption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiagramBox;
