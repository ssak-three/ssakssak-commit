import { GITHUB_REPOSITORY_RULES } from "@/constants/validations";

const { URL_PREFIX, SUFFIX_REGEX } = GITHUB_REPOSITORY_RULES;

const parseRepositoryUrl = (
  repositoryUrl: string,
): { owner: string; repositoryName: string } => {
  const [owner, repositoryName] = repositoryUrl
    .replace(URL_PREFIX, "")
    .replace(SUFFIX_REGEX, "")
    .split("/");

  return {
    owner,
    repositoryName,
  };
};

export default parseRepositoryUrl;
