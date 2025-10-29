import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userName?: string | null;
      userId?: string | null;
      githubId?: string | null;
    } & DefaultSession["user"];
    accessToken: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string | null;
    githubId?: string;
    userName: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
