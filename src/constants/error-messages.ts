const VALIDATION_ERROR_MESSAGES = {
  UNRECOGNIZED_KEYS: "허용되지 않은 파라미터가 포함되어 있습니다.",
  REPORT_INPUT: {
    TITLE_MAX_LENGTH: "리포트 제목은 최대 20자까지 가능합니다.",
    TITLE_EMPTY: "공백만 입력할 수 없습니다.",
    REPOSITORY_OVERVIEW_MAX_LENGTH:
      "리포지토리 개요는 최대 1000자까지 가능합니다.",
    REPOSITORY_OVERVIEW_EMPTY: "공백만 입력할 수 없습니다.",
    REPOSITORY_URL_REQUIRED: "repositoryUrl은 필수 항목입니다.",
    REPOSITORY_URL_INVALID_TYPE: "repositoryUrl은 문자열이어야 합니다.",
    REPOSITORY_URL_INVALID_FORMAT: "올바른 URL 형태가 아닙니다.",
    REPOSITORY_URL_INVALID_GITHUB:
      "유효한 Github 레포지토리 URL 형식이 아닙니다. 예: https://github.com/owner/repo",
    BRANCH_REQUIRED: "branch는 필수 항목입니다.",
    BRANCH_INVALID_TYPE: "branch는 문자열이어야 합니다.",
  },
};

const GITHUB_REPOSITORY_ERROR_MESSAGES = {
  INVALID_URL:
    "유효한 GitHub 리포지토리 URL을 입력해주세요. \n(예: https://github.com/owner/repository(.git), owner: 리포지토리 소유자, repository: 리포지토리 이름)",
  NOT_FOUND:
    "존재하지 않거나 접근할 수 없는 리포지토리입니다.\n비회원일 경우, 해당 리포지토리가 private 리포지토리인지 확인해 주세요.",
};

const SYSTEM_ERROR_MESSAGES = {
  SERVER: "서버 오류가 발생했습니다.",
  NETWORK: "네트워크 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  UNKNOWN: "알 수 없는 오류가 발생했습니다.",
};

const MERMAID_ERROR_MESSAGES = {
  MERMAID_RENDER_ERROR: "다이어그램을 렌더링하는 중 오류가 발생했습니다.",
};

const TOKEN_ERROR_MESSAGES = {
  GITHUB_REFRESH_FAILED: "GitHub 토큰 갱신 요청 실패했습니다.",
  GITHUB_REFRESH_INVALID: "GitHub 토큰 갱신 응답이 올바르지 않습니다.",
  GITHUB_REFRESH_NO_REFRESH_TOKEN:
    "리프레시 토큰이 존재하지 않아 갱신할 수 없습니다.",
};

const AUTH_ERROR_MESSAGES = {
  INVALID_PROVIDER: "지원하지 않는 OAuth 공급자입니다.",
  INVALID_REDIRECT_URL: "허용되지 않은 redirect URL입니다.",
  INTERNAL_ERROR: "내부 오류로 인해 요청이 실패했습니다.",
  UNKNOWN: "로그인 처리 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
  SESSION_EXPIRED:
    "세션이 만료되었거나 올바르지 않습니다. 로그인 후 이용해 주세요.",
};

const OPENAI_ERROR_MESSAGES = {
  ZOD_VALIDATION_FAILED: "모델 출력이 스키마와 일치하지 않습니다.",
  RESPONSE_CREATION_FAILED: "OpenAI 응답 생성에 실패했습니다.",
  MODEL_REFUSAL: "모델이 요청을 거절했습니다. 요청 내용을 점검하세요.",
  OUTPUT_TEXT_NOT_FOUND:
    "모델 응답에서 output_text를 찾지 못했습니다. prompt/형식 지시 또는 zod 포맷 설정을 점검하세요.",
  INCOMPLETE_DUE_TO_MAX_TOKENS:
    "모델 응답이 출력 토큰 한도(max_output_tokens)로 잘렸습니다. max_output_tokens 값을 늘리거나 배치 크기를 줄여주세요.",
};

const PROVIDER_ERROR_MESSAGES = {
  CONTEXT_OUTSIDE_PROVIDER:
    "이 훅은 해당 Provider 내부에서만 사용할 수 있습니다.",
};

const DATA_ERROR_MESSAGES = {
  CREATE: "생성을 실패했습니다. 잠시 후 다시 시도해 주세요.",
  READ: "데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.",
  UPDATE: "업데이트를 실패했습니다. 잠시 후 다시 시도해 주세요.",
  DELETE: "삭제를 실패했습니다. 잠시 후 다시 시도해 주세요.",
};

const JOB_ERROR_MESSAGES = {
  JOB_ID_REQUIRED: "jobId 값이 필요합니다.",
  NOT_FOUND: "해당 작업을 찾을 수 없습니다",
  JOB_ID_NOT_FOUND:
    "분석 작업을 불러올 수 없어요.\n홈으로 돌아가 새로 시작해 주세요.",
  NETWORK_FAILED: "일시적인 오류가 발생했어요.\n잠시 후 다시 시도해 주세요.",
};

export {
  VALIDATION_ERROR_MESSAGES,
  GITHUB_REPOSITORY_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
  MERMAID_ERROR_MESSAGES,
  OPENAI_ERROR_MESSAGES,
  TOKEN_ERROR_MESSAGES,
  AUTH_ERROR_MESSAGES,
  PROVIDER_ERROR_MESSAGES,
  DATA_ERROR_MESSAGES,
  JOB_ERROR_MESSAGES,
};
