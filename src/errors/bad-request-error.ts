import AppError from "./app-error";
import { ErrorArgs } from "@/types/error-args";

class BadRequestError extends AppError {
  constructor(args: Omit<ErrorArgs, "status">) {
    super({
      status: 400,
      ...args,
    });
  }
}

export default BadRequestError;
