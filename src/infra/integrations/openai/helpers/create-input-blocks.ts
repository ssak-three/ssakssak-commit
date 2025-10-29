type InputBlock = { type: "input_text"; text: string };
interface BuildInputBlocksParams {
  intro: string;
  payload: unknown;
  repositoryOverview?: string;
}

const INPUT_TEXT_CONTENT_TYPE = "input_text";

const createInputBlocks = ({
  intro,
  payload,
  repositoryOverview,
}: BuildInputBlocksParams): InputBlock[] => {
  const inputContent: { type: "input_text"; text: string }[] = [
    {
      type: INPUT_TEXT_CONTENT_TYPE,
      text: intro,
    },
    { type: INPUT_TEXT_CONTENT_TYPE, text: JSON.stringify(payload) },
  ];

  if (repositoryOverview) {
    inputContent.push({
      type: INPUT_TEXT_CONTENT_TYPE,
      text: `리포지토리 개요(참고용): ${repositoryOverview}`,
    });
  }

  return inputContent;
};

export default createInputBlocks;
