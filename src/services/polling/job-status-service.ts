import { JobResponse } from "@/types/job";

class JobStatusService {
  async getJobStatus(jobId: string): Promise<JobResponse> {
    const response = await fetch(`/api/report-jobs/${jobId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const jobStatusService = new JobStatusService();
