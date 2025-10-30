import { JobResponse } from "@/types/job";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { JOB_STATUS } from "@/constants/report-job";

const NAVIGATION_DELAY_MS = 1500;

function shouldNavigateToResult(jobData: JobResponse): boolean {
  return jobData.status === JOB_STATUS.COMPLETED && !!jobData.reportKey;
}

function navigateToResult(
  router: AppRouterInstance,
  reportKey: string,
  delay: number = NAVIGATION_DELAY_MS,
): void {
  setTimeout(() => {
    router.replace(`/report-view/${reportKey}`);
  }, delay);
}

function navigateToHome(router: AppRouterInstance): void {
  router.push("/");
}

const jobNavigationService = {
  shouldNavigateToResult,
  navigateToResult,
  navigateToHome,
};

export { jobNavigationService };
