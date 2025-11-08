const GITHUB_REPOSITORY_RULES = {
  URL_PREFIX: "https://github.com/",
  SUFFIX_REGEX: /\.git\/?$/,
  REPOSITORY_REGEX:
    /^(https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\.git)?\/?$|git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-])$/,
};

const REPORT_INPUT_LIMIT = {
  TITLE_MAX_LENGTH: 20,
  OVERVIEW_MAX_LENGTH: 1000,
};

export { GITHUB_REPOSITORY_RULES, REPORT_INPUT_LIMIT };
