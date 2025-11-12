import { z } from "zod";
import BadRequestError from "@/errors/bad-request-error";
import { GITHUB_REPOSITORY_ERROR_MESSAGES } from "@/constants/error-messages";
import { GITHUB_REPOSITORY_RULES } from "@/constants/validations";
import generateErrorMessage from "./generate-error-message";

const { INVALID_URL } = GITHUB_REPOSITORY_ERROR_MESSAGES;

const { REPOSITORY_REGEX } = GITHUB_REPOSITORY_RULES;

const repositoryUrlSchema = z.strictObject({
  repositoryUrl: z.string().regex(REPOSITORY_REGEX, { message: INVALID_URL }),
});

const validateRepositoryUrl = (searchParams: URLSearchParams): string => {
  try {
    const validatedRepositoryUrl = repositoryUrlSchema.parse(
      Object.fromEntries(searchParams),
    ).repositoryUrl;
    return validatedRepositoryUrl;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message: string = generateErrorMessage(error);

      throw new BadRequestError({
        message: message,
      });
    }
    throw error;
  }
};

export { validateRepositoryUrl };
