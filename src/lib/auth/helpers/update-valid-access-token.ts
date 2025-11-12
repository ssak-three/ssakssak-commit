import { JWT } from "next-auth/jwt";
import { TOKEN_ERROR_MESSAGES } from "@/constants/error-messages";
import refreshAccessToken from "@/lib/auth/helpers/refresh-access-token";

const updateValidAccessToken = async (token: JWT) => {
  try {
    if (!token.refreshToken) {
      throw new Error(TOKEN_ERROR_MESSAGES.GITHUB_REFRESH_NO_REFRESH_TOKEN);
    }
    const refreshed = await refreshAccessToken(token.refreshToken);

    token.accessToken = refreshed.accessToken;
    token.accessTokenExpires =
      refreshed.accessTokenExpires ?? token.accessTokenExpires;

    if (refreshed.refreshToken) {
      token.refreshToken = refreshed.refreshToken;
    }

    return token;
  } catch {
    token.accessToken = undefined;
    token.accessTokenExpires = undefined;
    return token;
  }
};
export default updateValidAccessToken;
