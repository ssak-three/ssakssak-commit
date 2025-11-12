import { z } from "zod";
import { VALIDATION_ERROR_MESSAGES } from "@/constants/error-messages";

const generateErrorMessage = (error: z.ZodError) => {
  const issue = error.issues[0];
  let message = issue.message;

  if (issue.code === "unrecognized_keys") {
    message = `${VALIDATION_ERROR_MESSAGES.UNRECOGNIZED_KEYS} : ${issue.keys}`;
  }

  return message;
};

export default generateErrorMessage;
