import { JobResponse } from "@/types/job";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { JOB_STATUS } from "@/constants/report-job";

const NAVIGATION_DELAY_MS = 1500;

const shouldNavigateToResult = (jobData: JobResponse): boolean => {
  return jobData.status === JOB_STATUS.COMPLETED && !!jobData.reportId;
};

const navigateToResult = (
  router: AppRouterInstance,
  reportId: string,
  delay: number = NAVIGATION_DELAY_MS,
): void => {
  setTimeout(() => {
    router.replace(`/report-view/${reportId}`);
  }, delay);
};

const navigateToHome = (router: AppRouterInstance): void => {
  router.push("/");
};

const jobNavigationService = {
  shouldNavigateToResult,
  navigateToResult,
  navigateToHome,
};

export { jobNavigationService };
