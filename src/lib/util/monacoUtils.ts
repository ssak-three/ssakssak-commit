import type { FileStatus } from "@/types/monaco";

const STATUS_STYLES = {
  added: "bg-green-100 text-green-800",
  modified: "bg-yellow-100 text-yellow-800",
  deleted: "bg-red-100 text-red-800",
  removed: "bg-red-100 text-red-800",
  renamed: "bg-blue-100 text-blue-800",
  copied: "bg-purple-100 text-purple-800",
} as const;

const STATUS_COLORS = {
  added: "#22c55e",
  modified: "#facc15",
  deleted: "#ef4444",
  removed: "#ef4444",
  renamed: "#3b82f6",
  copied: "#a855f7",
} as const;

const STATUS_HIGHLIGHTS = {
  added: "bg-green-100",
  modified: "bg-yellow-100",
  deleted: "bg-red-100",
  removed: "bg-red-100",
  renamed: "bg-blue-100",
  copied: "bg-purple-100",
} as const;

const STATUS_ICONS = {
  added: "🆕",
  modified: "✏️",
  deleted: "❌",
  removed: "🗑️",
  renamed: "✍️",
  copied: "📋",
} as const;

const getStatusTagStyle = (status: FileStatus): string => {
  return STATUS_STYLES[status] || "bg-gray-100 text-gray-800";
};

const getHighlightClassName = (status: FileStatus): string => {
  return STATUS_HIGHLIGHTS[status] || "";
};

const getHighlightColor = (status: FileStatus): string => {
  return STATUS_COLORS[status] || "#9ca3af";
};

const getStatusIcon = (status: FileStatus): string => {
  return STATUS_ICONS[status] || "📄";
};

export {
  getStatusTagStyle,
  getHighlightClassName,
  getHighlightColor,
  getStatusIcon,
};
