"use client";

import type { MonacoAutoHeightProps } from "@/types/monaco";

function MonacoAutoHeight({
  code,
  lineHeight = 20,
  padding = 40,
  minHeight = 120,
  maxHeight = 600,
  children,
}: MonacoAutoHeightProps) {
  const lineCount = code.split("\n").length;

  const dynamicHeight = Math.min(
    Math.max(lineCount * lineHeight + padding, minHeight),
    maxHeight,
  );

  return <>{children(dynamicHeight)}</>;
}

export { MonacoAutoHeight };
