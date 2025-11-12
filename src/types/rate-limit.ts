interface RateLimitInfo {
  remaining: number;
  reset: number;
  limit: number;
}

interface RateLimitCheckResult {
  canProceed: boolean;
  remaining: number;
  remainingTime: string;
  message?: string;
}

export type { RateLimitInfo, RateLimitCheckResult };
