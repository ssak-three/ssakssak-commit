interface RateLimitInfo {
  remaining: number;
  reset: number;
  limit: number;
}

interface RateLimitCheckResult {
  canProceed: boolean;
  remaining: number;
  remainingTime: string | null;
  message?: string;
}

export type { RateLimitInfo, RateLimitCheckResult };
