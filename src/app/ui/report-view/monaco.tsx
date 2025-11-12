"use client";

import mockAnalysisData from "@mocks/data/monaco.json";
import type { AnalysisData } from "@/types/monaco";
import { MonacoFileCard } from "@/app/ui/report-view/monaco-file/MonacoFileCard";

const analysisData = mockAnalysisData as AnalysisData;

function Monaco() {
  const totalFiles = analysisData.files.length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {totalFiles === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-500">No files available</p>
        </div>
      ) : (
        <div className="space-y-8">
          {analysisData.files.map((file) => (
            <MonacoFileCard key={file.path} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Monaco;
