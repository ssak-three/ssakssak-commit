import { ReportData } from "@/types/report";
import ExportButton from "./export-button";

function Header({ report }: { report: ReportData }) {
  const { reportTitle, repositoryUrl, branch } = report;

  return (
    <div className="mb-2 w-full px-2">
      <header className="flex h-[100px] flex-col justify-between">
        <div className="flex items-center justify-between">
          <h1 className="text-left text-4xl font-extrabold tracking-tight text-gray-900">
            🧪 {reportTitle}
          </h1>
          <ExportButton report={report} />
        </div>
        <div className="flex flex-wrap items-center space-x-4 text-sm">
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-500 transition-colors duration-200 hover:text-blue-700"
          >
            {repositoryUrl}
          </a>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            🌳 {branch}
          </span>
        </div>
      </header>
    </div>
  );
}

export default Header;
