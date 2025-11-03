"use client";

import { ComponentType, SVGProps } from "react";
import { CheckCircle } from "lucide-react";
import { Phase } from "@/types/job";
import { JOB_PHASES, JOB_STATUS } from "@/constants/report-job";

interface JobProgressItemProps {
  phase: Phase;
  status:
    | typeof JOB_STATUS.COMPLETED
    | typeof JOB_STATUS.IN_PROGRESS
    | typeof JOB_PHASES.PENDING;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  progressInfo?: {
    done?: number;
    total?: number;
    percent?: number;
  };
}

const statusColors = {
  [JOB_STATUS.COMPLETED]: "bg-green-50 border-green-200 text-green-800",
  [JOB_STATUS.IN_PROGRESS]: "bg-blue-50 border-blue-200 text-blue-800",
  [JOB_PHASES.PENDING]: "bg-gray-50 border-gray-200 text-gray-500",
} as const;

const statusIconColors = {
  [JOB_STATUS.COMPLETED]: "bg-green-500 text-white",
  [JOB_STATUS.IN_PROGRESS]: "bg-blue-500 text-white",
  [JOB_PHASES.PENDING]: "bg-gray-300 text-gray-600",
} as const;

function JobProgressItem({
  status,
  icon: Icon,
  label,
  progressInfo,
}: JobProgressItemProps) {
  return (
    <div
      className={`flex items-center rounded-lg border p-3 ${statusColors[status]} transition-colors duration-500`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${statusIconColors[status]}`}
      >
        {status === JOB_STATUS.COMPLETED ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>

      <div className="ml-3 flex-1 text-left">
        <p className="font-medium">{label}</p>
        <div className="text-sm">
          {status === JOB_STATUS.COMPLETED ? (
            "완료"
          ) : status === JOB_STATUS.IN_PROGRESS ? (
            <div className="flex items-center gap-2">
              <span>진행 중</span>
              {progressInfo?.percent && (
                <span className="text-xs">
                  ({progressInfo.done}/{progressInfo.total} -{" "}
                  {progressInfo.percent}%)
                </span>
              )}
            </div>
          ) : (
            "대기 중"
          )}
        </div>
      </div>

      {status === JOB_STATUS.IN_PROGRESS && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      )}
    </div>
  );
}

export default JobProgressItem;
