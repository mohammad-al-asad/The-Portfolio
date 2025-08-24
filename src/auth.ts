// src/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

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
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // In production, replace this with database call
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
        
        if (
          credentials.email === ADMIN_EMAIL &&
          ADMIN_PASSWORD_HASH &&
          (await bcrypt.compare(credentials.password, ADMIN_PASSWORD_HASH))
        ) {
          return {
            id: "1",
            name: "Admin User",
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
    async signIn({ user, account, profile }) {
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