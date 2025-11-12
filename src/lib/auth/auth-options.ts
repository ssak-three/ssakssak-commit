import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import signInCallback from "@/lib/auth/callbacks/sign-in";
import jwtCallback from "@/lib/auth/callbacks/jwt";
import sessionCallback from "@/lib/auth/callbacks/session";

const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "repo read:user user:email read:org",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    signIn: signInCallback,
    jwt: jwtCallback,
    session: sessionCallback,
  },
};

export default authOptions;
