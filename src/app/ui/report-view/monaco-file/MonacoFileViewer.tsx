"use client";

import MonacoEditor from "@monaco-editor/react";
import type { MonacoFileViewerProps } from "@/types/monaco";
import { useMonacoEditorDecorations } from "@/hooks/useMonacoEditorDecorations";
import { MonacoFileHeader } from "@/app/ui/report-view/monaco-file/MonacoFileHeader";
import { MonacoAutoHeight } from "@/app/ui/report-view/monaco-file/MonacoAutoHeight";

function MonacoFileViewer({
  filename,
  fileStatus,
  code,
  language,
  highlights,
  readOnly = true,
}: MonacoFileViewerProps) {
  const { handleEditorMount } = useMonacoEditorDecorations({
    code,
    highlights,
    fileStatus,
  });

  return (
    <div className="overflow-hidden rounded border border-gray-200">
      <MonacoFileHeader filename={filename} fileStatus={fileStatus} />

      <MonacoAutoHeight code={code}>
        {(height) => (
          <MonacoEditor
            height={height}
            language={language}
            value={code}
            options={{
              readOnly,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              fontSize: 13,
              lineNumbers: "on",
              glyphMargin: true,
              folding: true,
              renderWhitespace: "boundary",
            }}
            onMount={handleEditorMount}
            theme="vs-light"
          />
        )}
      </MonacoAutoHeight>
    </div>
  );
}

export { MonacoFileViewer };
