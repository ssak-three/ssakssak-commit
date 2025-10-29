import { MonacoFileViewer } from "@/app/ui/report-view/monaco-file/MonacoFileViewer";
import type { AnalysisData } from "@/types/monaco";
import { getStatusIcon } from "@/lib/util/monacoUtils";

type MonacoFileCardProps = {
  file: AnalysisData["files"][number];
};

function MonacoFileCard({ file }: MonacoFileCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <section className="p-6">
        <header className="mb-4 flex items-center gap-2">
          <span className="text-xl">{getStatusIcon(file.status)}</span>
          <h3 className="text-lg font-medium text-gray-800">{file.path}</h3>
        </header>
        <MonacoFileViewer
          filename={file.path}
          fileStatus={file.status}
          code={file.code}
          language={file.language}
          highlights={file.highlights}
        />
      </section>
    </article>
  );
}

export { MonacoFileCard };
