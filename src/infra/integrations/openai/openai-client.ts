import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { ZodError, ZodSchema } from "zod";
import { BadGatewayError, UnprocessableEntityError } from "@/errors";
import {
  checkIsIncompleteByMaxTokens,
  checkRefusal,
  checkHasOutputText,
} from "./helpers/response-check";
import { OPENAI_ERROR_MESSAGES } from "@/constants/error-messages";

const { ZOD_VALIDATION_FAILED, RESPONSE_CREATION_FAILED } =
  OPENAI_ERROR_MESSAGES;
const client = new OpenAI();

interface StructuredTextGenerationParams<T> {
  maxOutputTokens: number;
  instructions: string;
  inputBlocks: { type: "input_text"; text: string }[];
  zodSchema: ZodSchema<T>;
  resultTag: string;
}

const structuredTextGenerator = async <T>({
  maxOutputTokens,
  instructions,
  inputBlocks,
  zodSchema,
  resultTag,
}: StructuredTextGenerationParams<T>): Promise<T> => {
  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      max_output_tokens: maxOutputTokens,
      instructions: instructions,
      input: [
        {
          role: "user",
          content: inputBlocks,
        },
      ],
      text: {
        format: zodTextFormat(zodSchema, resultTag),
      },
    });

    checkIsIncompleteByMaxTokens(response);
    checkRefusal(response);
    checkHasOutputText(response);

    return zodSchema.parse(JSON.parse(response.output_text));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new UnprocessableEntityError({
        message: ZOD_VALIDATION_FAILED,
      });
    }

    throw new BadGatewayError({
      message: `${RESPONSE_CREATION_FAILED} ${error}`,
    });
  }
};

export { structuredTextGenerator };
