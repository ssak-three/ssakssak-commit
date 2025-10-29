import { Analysis } from "@/types/analysis";
import Mermaid from "@/app/ui/report-view/mermaid";
import { MermaidConfig } from "mermaid";

interface AnalysisSummaryProps {
  data: Analysis[];
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
      {data.map((item, index) => (
        <div key={index}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {item.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-700">
            {item.description}
          </p>

          {item.type === "diagram" && item.chart && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <Mermaid chart={item.chart} config={defaultMermaidConfig} />
              {item.caption && (
                <p className="mt-4 text-center text-sm text-gray-500 italic">
                  {item.caption}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DiagramBox;
