"use client";

import parse from "html-react-parser";
import useRenderMermaid from "@/hooks/useRenderMermaid";
import { MermaidProps } from "@/types/mermaid";

function Mermaid({ chart, config }: MermaidProps) {
  const { svg, error } = useRenderMermaid(chart, config);

  if (error) {
    return <div className="whitespace-pre-line text-amber-800">{error}</div>;
  }

  return (
    <main className="w-full p-6">
      <article className="space-y-4">
        <div className="flex justify-center">{parse(svg)}</div>
      </article>
    </main>
  );
}

export default Mermaid;
