import { TOKEN_ERROR_MESSAGES } from "@/constants/error-messages";
import { GITHUB_API } from "@/constants/github-api";

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const response = await fetch(GITHUB_API.OAUTH.Authorization_Server_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(TOKEN_ERROR_MESSAGES.GITHUB_REFRESH_FAILED);
    }

    const refreshedTokens = await response.json();

    if (!refreshedTokens.access_token) {
      throw new Error(TOKEN_ERROR_MESSAGES.GITHUB_REFRESH_INVALID);
    }

    return {
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in ?? 0) * 1000,
      refreshToken: refreshedTokens.refresh_token,
    };
  } catch {
    throw new Error(TOKEN_ERROR_MESSAGES.GITHUB_REFRESH_FAILED);
  }
};

export default refreshAccessToken;
