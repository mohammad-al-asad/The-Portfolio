import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      id?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const SERVER_URL = process.env.SERVER_URL;
        const res = await fetch(`${SERVER_URL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
          }),
        });
        const { email, password } = await res.json();

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        if (
          credentials.email === email &&
          password &&
          (await bcrypt.compare(credentials.password, password))
        ) {
          return {
            id: "1",
            name: "M.A. Asad",
            email: credentials.email,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Only allow specific emails for Google provider
      if (account?.provider === "google") {
        const allowedEmails = (process.env.ALLOWED_EMAILS || "").split(",");
        if (user.email && allowedEmails.includes(user.email)) {
          return true;
        }
        return false;
      }
      return true;
    },
  },
};
