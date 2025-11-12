import { getStatusTagStyle } from "@/lib/util/monacoUtils";
import type { FileStatus } from "@/types/monaco";

interface MonacoFileHeaderProps {
  filename: string;
  fileStatus: FileStatus;
}

const MonacoFileHeader = ({ filename, fileStatus }: MonacoFileHeaderProps) => {
  return (
    <div className="flex items-center gap-2 border-b bg-gray-100 px-3 py-2 text-sm font-medium">
      <span className="font-medium text-gray-700">{filename}</span>
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusTagStyle(fileStatus)}`}
      >
        {fileStatus}
      </span>
    </div>
  );
};

export { MonacoFileHeader };
