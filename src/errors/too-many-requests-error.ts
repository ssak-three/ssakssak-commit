import AppError from "./app-error";
import { ErrorArgs } from "@/app/types/error-args";

class TooManyRequestsError extends AppError {
  constructor(args: Omit<ErrorArgs, "status">) {
    super({
      status: 429,
      ...args,
    });
  }
}

export default TooManyRequestsError;
