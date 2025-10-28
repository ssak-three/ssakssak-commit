import { DefaultSession, DefaultJWT } from "next-auth";
import { ReportHistory } from "@/app/types/report-history";

declare module "next-auth" {
  interface Session {
    user: {
      userName?: string | null;
      userId?: string | null;
      githubId?: string | null;
    } & DefaultSession["user"];
    reportHistory?: ReportHistory[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string | null;
    githubId?: string;
    userName: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    reportHistory?: ReportHistory[];
  }
}
