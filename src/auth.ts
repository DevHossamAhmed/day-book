import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_USER_SERVICE}v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: creds.email,
              password: creds.password,
            }),
          }
        );
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Invalid email or password");
          }
          throw new Error("Authentication failed");
        }
        const data = await res.json();
        return {
          id: String(data.id),
          email: data.email,
          name: data.fullname,
          org_id: data.org_id,
          accessToken: data.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          org_id: (user as any).org_id,
        };
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = token.user;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};
