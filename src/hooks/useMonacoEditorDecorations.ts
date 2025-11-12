import { useRef, useEffect } from "react";
import type * as monaco from "monaco-editor";
import { createHighlightDecorations } from "@/lib/util/monacoDecorations";
import type { MonacoFileBaseProps } from "@/types/monaco";

function useMonacoEditorDecorations({
  code,
  highlights,
  fileStatus,
}: MonacoFileBaseProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef =
    useRef<monaco.editor.IEditorDecorationsCollection | null>(null);

  const handleEditorMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco,
  ) => {
    editorRef.current = editor;

    const decorations = createHighlightDecorations({
      highlights,
      fileStatus,
      code,
      monacoInstance,
    });

    decorationsRef.current = editor.createDecorationsCollection(decorations);
  };

  useEffect(() => {
    return () => {
      decorationsRef.current?.clear();
    };
  }, []);

  return { handleEditorMount };
}

export { useMonacoEditorDecorations };
