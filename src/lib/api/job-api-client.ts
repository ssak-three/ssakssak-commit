import { JobResponse } from "@/types/job";
import { JOB_ERROR_MESSAGES } from "@/constants/error-messages";

async function getJobStatus(jobId: string): Promise<JobResponse> {
  const response = await fetch(`/api/report-jobs/${jobId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(JOB_ERROR_MESSAGES.FETCH_FAILED);
  }

  return response.json();
}

const jobApiClient = {
  getJobStatus,
};

export default jobApiClient;
