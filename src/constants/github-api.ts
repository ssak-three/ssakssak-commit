const GITHUB_API = {
  HEADERS: {
    X_GITHUB_API_VERSION: "X-Github-Api-Version",
    VERSION: "2022-11-28",
  },
  ENDPOINTS: {
    BRANCH: {
      LIST: "GET /repos/{owner}/{repo}/branches",
    },
    COMMITS: {
      LIST: "GET /repos/{owner}/{repo}/commits",
      DETAIL: "GET /repos/{owner}/{repo}/commits/{sha}",
    },
  },
  DEFAULTS: {
    PER_PAGE: 100,
    DEFAULT_BRANCH: "main",
    DEFAULT_OWNER: "defaultOwner",
    DEFAULT_REPO: "defaultRepo",
  },
  OAUTH: {
    Authorization_Server_URL: "https://github.com/login/oauth/access_token",
  },
};

export { GITHUB_API };
