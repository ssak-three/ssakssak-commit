import * as monaco from "monaco-editor";
import {
  getHighlightClassName,
  getHighlightColor,
} from "@/lib/util/monacoUtils";
import type { FileStatus } from "@/types/monaco";

function createHighlightDecorations({
  highlights,
  fileStatus,
  code,
  monacoInstance,
}: {
  highlights: { startLine: number; endLine: number }[];
  fileStatus: FileStatus;
  code: string;
  monacoInstance: typeof monaco;
}): monaco.editor.IModelDeltaDecoration[] {
  return highlights.map((highlight) => ({
    range: new monacoInstance.Range(
      highlight.startLine,
      1,
      highlight.endLine,
      code.split("\n")[highlight.endLine - 1]?.length + 1 || 1,
    ),
    options: {
      isWholeLine: true,
      className: getHighlightClassName(fileStatus),
      minimap: {
        color: getHighlightColor(fileStatus),
        position: monacoInstance.editor.MinimapPosition.Inline,
      },
      overviewRuler: {
        color: getHighlightColor(fileStatus),
        position: monacoInstance.editor.OverviewRulerLane.Right,
      },
    },
  }));
}

export { createHighlightDecorations };
