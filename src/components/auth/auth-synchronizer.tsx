"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function AuthSynchronizer() {
  const { data: session, status } = useSession();
  const { setUser, setLoading, clear } = useAuthStore();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name as string,
        avatarUrl: session.user.image as string | undefined,
        resumeCompleted: session.user.resumeCompleted as boolean,
      });
    } else if (status === "unauthenticated") {
      clear();
    }
  }, [session, status, setUser, setLoading, clear]);

  // This component renders nothing visually.
  return null;
}
