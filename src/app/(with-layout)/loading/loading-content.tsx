"use client";

import { useEffect, ComponentType, SVGProps } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Code, BarChart3 } from "lucide-react";
import { useJobStatus } from "@/hooks/useJobStatus";
import { jobNavigationService } from "@/services/polling/job-navigation-service";
import JobProgressItem from "@/app/ui/common/loading/job-progress-item";
import JobCompletedCard from "@/app/ui/common/loading/job-completed-card";
import JobErrorCard from "@/app/ui/common/loading/job-error-card";
import JobLoadingCard from "@/app/ui/common/loading/job-loading-card";
import { Phase } from "@/types/job";
import { JOB_PHASES, JOB_STATUS } from "@/constants/report-job";

const PHASES = [
  JOB_PHASES.COLLECTING,
  JOB_PHASES.ANALYZING,
  JOB_PHASES.VISUALIZING,
] as Phase[];

const phaseLabels: Record<Phase, string> = {
  collecting: "커밋 데이터 수집",
  analyzing: "커밋 분석",
  visualizing: "시각화",
};

const phaseIcons: Record<Phase, ComponentType<SVGProps<SVGSVGElement>>> = {
  collecting: GitBranch,
  analyzing: Code,
  visualizing: BarChart3,
};

const LoadingContent = () => {
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
  ):
    | typeof JOB_PHASES.PENDING
    | typeof JOB_STATUS.IN_PROGRESS
    | typeof JOB_STATUS.COMPLETED => {
    if (!currentJob?.progress) return JOB_PHASES.PENDING;

    const currentPhase = currentJob.progress.phase;
    const currentIndex = PHASES.indexOf(currentPhase);
    const phaseIndex = PHASES.indexOf(phase);

    if (phaseIndex < currentIndex) return JOB_STATUS.COMPLETED;
    if (phaseIndex === currentIndex) return JOB_STATUS.IN_PROGRESS;
    return JOB_PHASES.PENDING;
  };

  if (error) {
    return <JobErrorCard error={error} onReturnHome={handleReturnHome} />;
  }

  if (isLoading || !currentJob) {
    return <JobLoadingCard />;
  }

  if (currentJob.status === JOB_STATUS.COMPLETED) {
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
            getPhaseStatus(phase) === JOB_STATUS.IN_PROGRESS
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
