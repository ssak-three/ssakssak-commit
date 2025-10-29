import AppError from "./app-error";
import { ErrorArgs } from "@/types/error-args";

class UnauthorizedError extends AppError {
  constructor(args: Omit<ErrorArgs, "status">) {
    super({
      status: 401,
      ...args,
    });
  }
}

export default UnauthorizedError;
