import { z } from "zod";
import BadRequestError from "@/errors/bad-request-error";
import generateErrorMessage from "./generate-error-message";
import { VALIDATION_ERROR_MESSAGES } from "@/constants/error-messages";
import { GITHUB_REPOSITORY_RULES } from "@/constants/validations";

const reportInputSchema = z.strictObject({
  userId: z
    .string({
      required_error: VALIDATION_ERROR_MESSAGES.REPORT_INPUT.USER_ID_REQUIRED,
    })
    .uuid()
    .optional()
    .nullable(),

  reportTitle: z
    .string()
    .max(20, VALIDATION_ERROR_MESSAGES.REPORT_INPUT.TITLE_MAX_LENGTH)
    .refine((val) => !val || val.trim().length > 0, {
      message: VALIDATION_ERROR_MESSAGES.REPORT_INPUT.TITLE_EMPTY,
    })
    .optional()
    .default(""),

  repositoryOverview: z
    .string()
    .max(
      1000,
      VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_OVERVIEW_MAX_LENGTH,
    )
    .refine((val) => !val || val.trim().length > 0, {
      message: VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_OVERVIEW_EMPTY,
    })
    .optional()
    .default(""),

  repositoryUrl: z
    .string({
      required_error:
        VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_URL_REQUIRED,
      invalid_type_error:
        VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_URL_INVALID_TYPE,
    })
    .trim()
    .url(VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_URL_INVALID_FORMAT)
    .refine((url) => GITHUB_REPOSITORY_RULES.REPOSITORY_REGEX.test(url), {
      message:
        VALIDATION_ERROR_MESSAGES.REPORT_INPUT.REPOSITORY_URL_INVALID_GITHUB,
    }),

  branch: z.string({
    required_error: VALIDATION_ERROR_MESSAGES.REPORT_INPUT.BRANCH_REQUIRED,
    invalid_type_error:
      VALIDATION_ERROR_MESSAGES.REPORT_INPUT.BRANCH_INVALID_TYPE,
  }),

  reportHistoryId: z.string().optional().nullable(),
});

type ValidatedReportInput = z.infer<typeof reportInputSchema>;

const validateReportInput = (input: unknown): ValidatedReportInput => {
  try {
    const validatedInput = reportInputSchema.parse(input);
    return validatedInput;
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

export { validateReportInput };
export type { ValidatedReportInput };
