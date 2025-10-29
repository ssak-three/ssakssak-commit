import AppError from "./app-error";
import { ErrorArgs } from "@/types/error-args";

class NotFoundError extends AppError {
  constructor(args: Omit<ErrorArgs, "status">) {
    super({
      status: 404,
      ...args,
    });
  }
}

export default NotFoundError;
