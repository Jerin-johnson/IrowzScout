import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      resumeCompleted: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    resumeCompleted?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    resumeCompleted: boolean;
  }
}
