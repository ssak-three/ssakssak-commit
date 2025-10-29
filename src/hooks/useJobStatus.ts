"use client";

import { useState, useEffect, useCallback } from "react";
import { JobResponse } from "@/types/job";
import { jobStatusService } from "@/services/polling/job-status-service";
import { cookieUtils } from "@/lib/util/cookie-utils";
import { JOB_ERROR_MESSAGES } from "@/constants/error-messages";

interface UseJobStatusReturn {
  currentJob: JobResponse | null;
  error: string | null;
  isLoading: boolean;
}

const useJobStatus = (): UseJobStatusReturn => {
  const [currentJob, setCurrentJob] = useState<JobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pollJobStatus = useCallback(async (jobId: string) => {
    try {
      const data = await jobStatusService.getJobStatus(jobId);
      setCurrentJob(data);
      setError(null);

      return data.status === "completed" || data.status === "failed";
    } catch {
      setError(JOB_ERROR_MESSAGES.NETWORK_FAILED);
      return true;
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let isMounted = true;

    const startPolling = async () => {
      setIsLoading(true);
      const jobId = cookieUtils.getJobId();

      if (!jobId) {
        setError(JOB_ERROR_MESSAGES.JOB_ID_NOT_FOUND);
        setIsLoading(false);
        return;
      }

      const shouldStop = await pollJobStatus(jobId);
      if (!isMounted) return;

      setIsLoading(false);

      if (shouldStop) {
        return;
      }

      intervalId = setInterval(async () => {
        const shouldStop = await pollJobStatus(jobId);
        if (shouldStop && isMounted) {
          clearInterval(intervalId!);
        }
      }, 2000);
    };

    startPolling();

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pollJobStatus]);

  return {
    currentJob,
    error,
    isLoading,
  };
};

export { useJobStatus };
