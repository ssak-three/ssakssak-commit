"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Phase } from "@/types/job";

interface JobProgressItemProps {
  phase: Phase;
  status: "completed" | "inProgress" | "pending";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  progressInfo?: {
    done?: number;
    total?: number;
    percent?: number;
  };
}

const statusColors = {
  completed: "bg-green-50 border-green-200 text-green-800",
  inProgress: "bg-blue-50 border-blue-200 text-blue-800",
  pending: "bg-gray-50 border-gray-200 text-gray-500",
} as const;

const statusIconColors = {
  completed: "bg-green-500 text-white",
  inProgress: "bg-blue-500 text-white",
  pending: "bg-gray-300 text-gray-600",
} as const;

const JobProgressItem: React.FC<JobProgressItemProps> = ({
  status,
  icon: Icon,
  label,
  progressInfo,
}) => {
  return (
    <div
      className={`flex items-center rounded-lg border p-3 ${statusColors[status]} transition-all duration-500`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${statusIconColors[status]}`}
      >
        {status === "completed" ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>

      <div className="ml-3 flex-1 text-left">
        <p className="font-medium">{label}</p>
        <div className="text-sm">
          {status === "completed" ? (
            "완료"
          ) : status === "inProgress" ? (
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

      {status === "inProgress" && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      )}
    </div>
  );
};

export { JobProgressItem };
