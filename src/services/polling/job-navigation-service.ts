import { JobResponse } from "@/types/job";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

class JobNavigationService {
  shouldNavigateToResult(jobData: JobResponse): boolean {
    return jobData.status === "completed" && !!jobData.reportKey;
  }

  navigateToResult(
    router: AppRouterInstance,
    reportKey: string,
    delay: number = 1500,
  ): void {
    setTimeout(() => {
      router.replace(`/report-view/${reportKey}`);
    }, delay);
  }

  navigateToHome(router: AppRouterInstance): void {
    router.push("/");
  }
}

export const jobNavigationService = new JobNavigationService();
