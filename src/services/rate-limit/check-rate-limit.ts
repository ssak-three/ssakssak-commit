import { RateLimitCheckResult } from "@/types/rate-limit";
import { GITHUB_RATE_LIMIT_CONFIG } from "@/constants/rate-limit";
import { RATE_LIMIT_MESSAGES } from "@/constants/error-messages";
import { formatRemainingTime } from "@/lib/util/time-formatter";
import { getRateLimitInfo } from "@/infra/github-api/rate-limit/get-rate-limit";
import TooManyRequestsError from "@/errors/too-many-requests-error";

const checkRateLimit = async (): Promise<
  Omit<RateLimitCheckResult, "message" | "canProceed">
> => {
  try {
    const rateLimitInfo = await getRateLimitInfo();
    const remainingTime = formatRemainingTime(rateLimitInfo.reset);

    const canProceed =
      rateLimitInfo.remaining > GITHUB_RATE_LIMIT_CONFIG.MINIMUM_REQUESTS;

    if (!canProceed && remainingTime !== null) {
      const message = RATE_LIMIT_MESSAGES.INSUFFICIENT_REQUESTS.replace(
        "{remainingTime}",
        remainingTime,
      );

      throw new TooManyRequestsError({ message });
    }

    return {
      remaining: rateLimitInfo.remaining,
      remainingTime,
    };
  } catch (error) {
    throw error;
  }
};

export { checkRateLimit };
