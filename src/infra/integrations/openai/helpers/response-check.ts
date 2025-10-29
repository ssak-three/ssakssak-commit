import { BadGatewayError, UnprocessableEntityError } from "@/errors";
import { OPENAI_ERROR_MESSAGES } from "@/constants/error-messages";
import OpenAI from "openai";

const { INCOMPLETE_DUE_TO_MAX_TOKENS, MODEL_REFUSAL, OUTPUT_TEXT_NOT_FOUND } =
  OPENAI_ERROR_MESSAGES;

const checkIsIncompleteByMaxTokens = (response: OpenAI.Responses.Response) => {
  if (
    response.status === "incomplete" &&
    response.incomplete_details?.reason === "max_output_tokens"
  ) {
    throw new BadGatewayError({
      message: INCOMPLETE_DUE_TO_MAX_TOKENS,
    });
  }
};

const checkRefusal = (response: OpenAI.Responses.Response) => {
  if ("refusal" in response) {
    const refusal = response.refusal;
    if (typeof refusal === "string" && refusal.trim().length > 0) {
      throw new UnprocessableEntityError({
        message: MODEL_REFUSAL,
      });
    }
  }
};

const checkHasOutputText = (response: OpenAI.Responses.Response) => {
  if (
    !(typeof response.output_text === "string" && response.output_text.trim())
  ) {
    throw new BadGatewayError({
      message: OUTPUT_TEXT_NOT_FOUND,
    });
  }
};

export { checkIsIncompleteByMaxTokens, checkRefusal, checkHasOutputText };
