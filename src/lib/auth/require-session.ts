import { getServerSession } from "next-auth";
import authOptions from "./auth-options";
import { UnauthorizedError } from "@/errors";
import { AUTH_ERROR_MESSAGES } from "@/constants/error-messages";

const requireUserId = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  if (!userId) {
    throw new UnauthorizedError({
      message: AUTH_ERROR_MESSAGES.SESSION_EXPIRED,
    });
  }

  return userId;
};

export { requireUserId };
