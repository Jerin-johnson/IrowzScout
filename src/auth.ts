import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth/password";
import { userRepository } from "@/infrastructure/repositories/user.repository";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await userRepository.findByEmail(
          credentials.email as string,
          true,
        );
        if (!user || !user.passwordHash) return null;
        if (!user.isActive) return null;
        const valid = await verifyPassword(
          credentials.password as string,
          user.passwordHash,
        );
        if (!valid) return null;
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
          resumeCompleted: user.resumeCompleted,
        };
      },
    }),
  ],
  callbacks: {
    // ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const dbUser = await userRepository.findOrCreateGoogleUser({
          email: user.email!,
          name: user.name!,
          avatarUrl: user.image ?? undefined,
        });
        user.id = dbUser._id.toString();
        user.resumeCompleted = dbUser.resumeCompleted;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.resumeCompleted = user.resumeCompleted ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.resumeCompleted = token.resumeCompleted as boolean;
      }
      return session;
    },
  },
});
