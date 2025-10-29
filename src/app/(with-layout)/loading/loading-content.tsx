"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Code, BarChart3 } from "lucide-react";
import { useJobStatus } from "@/hooks/useJobStatus";
import { jobNavigationService } from "@/services/polling/job-navigation-service";
import { JobProgressItem } from "@/app/ui/common/loading/job-progress-item";
import {
  JobCompletedCard,
  JobErrorCard,
  JobLoadingCard,
} from "@/app/ui/common/loading/status-card";
import { Phase } from "@/types/job";

const PHASES = ["collecting", "analyzing", "visualizing"] as const;

const phaseLabels: Record<Phase, string> = {
  collecting: "커밋 데이터 수집",
  analyzing: "커밋 분석",
  visualizing: "시각화",
};

const phaseIcons: Record<
  Phase,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  collecting: GitBranch,
  analyzing: Code,
  visualizing: BarChart3,
};

const LoadingContent: React.FC = () => {
  const router = useRouter();
  const { currentJob, error, isLoading } = useJobStatus();

  useEffect(() => {
    if (currentJob && jobNavigationService.shouldNavigateToResult(currentJob)) {
      jobNavigationService.navigateToResult(router, currentJob.reportKey!);
    }
  }, [currentJob, router]);

  const handleReturnHome = () => {
    jobNavigationService.navigateToHome(router);
  };

  const getPhaseStatus = (
    phase: Phase,
  ): "completed" | "inProgress" | "pending" => {
    if (!currentJob?.progress) return "pending";

    const currentPhase = currentJob.progress.phase;
    const currentIndex = PHASES.indexOf(currentPhase);
    const phaseIndex = PHASES.indexOf(phase);

    if (phaseIndex < currentIndex) return "completed";
    if (phaseIndex === currentIndex) return "inProgress";
    return "pending";
  };

  if (error) {
    return <JobErrorCard error={error} onReturnHome={handleReturnHome} />;
  }

  if (isLoading || !currentJob) {
    return <JobLoadingCard />;
  }

  if (currentJob.status === "completed") {
    return <JobCompletedCard />;
  }

  return (
    <div className="flex w-[320px] flex-col gap-3">
      {PHASES.map((phase) => (
        <JobProgressItem
          key={phase}
          phase={phase}
          status={getPhaseStatus(phase)}
          icon={phaseIcons[phase]}
          label={phaseLabels[phase]}
          progressInfo={
            getPhaseStatus(phase) === "inProgress"
              ? (currentJob.progress?.meta ??
                (currentJob.derivedPercent !== undefined
                  ? { percent: currentJob.derivedPercent }
                  : undefined))
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default LoadingContent;
