import { Analysis } from "@/types/analysis";
import { MonacoFileViewer } from "@/app/ui/report-view/monaco-file/MonacoFileViewer";

interface AnalysisSummaryProps {
  data: Analysis[];
}

function CodeDiff({ data }: AnalysisSummaryProps) {
  return (
    <div className="space-y-8">
      {data.map((item) => (
        <div key={item.title}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            변경 사항: {item.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-700">
            {item.description}
          </p>

          {item.files?.map((file) => (
            <div key={`${file.path}-${file.status}`} className="mb-6">
              <MonacoFileViewer
                filename={file.path}
                fileStatus={file.status}
                code={file.code}
                language={file.language}
                highlights={file.highlights}
              />
              <div className="mt-4 flex items-center space-x-2 pt-2">
                <span className="text-sm text-gray-500">➡️</span>
                <p className="rounded-md bg-purple-50 p-2 text-sm font-medium text-purple-800">
                  {file.codeDiffSummary}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CodeDiff;
