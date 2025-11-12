"use client";

import { useEffect, useId, useState } from "react";
import mermaid, { MermaidConfig } from "mermaid";
import { MERMAID_ERROR_MESSAGES } from "@/constants/error-messages";

const useRenderMermaid = (chart: string, config: MermaidConfig) => {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string>("");
  const id = useId();

  useEffect(() => {
    let cancelled = false;

    const renderMermaid = async () => {
      try {
        setError("");
        setSvg("");
        if (!chart) return;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          ...(config ?? {}),
        });

        await mermaid.parse(chart);

        const { svg } = await mermaid.render(`mermaid-${id}`, chart);

        if (!cancelled) {
          setSvg(svg);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (!cancelled) {
            setError(
              error.message ?? MERMAID_ERROR_MESSAGES.MERMAID_RENDER_ERROR,
            );
          }
        }
        throw error;
      }
    };

    renderMermaid();

    return () => {
      cancelled = true;
    };
  }, [chart, config, id]);

  return {
    svg,
    error,
  };
};

export default useRenderMermaid;
