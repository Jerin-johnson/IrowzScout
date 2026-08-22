import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { auth } = NextAuth(authConfig);

const authRoutes = ["/sign-in", "/sign-up"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Logged-in user hitting /sign-in or /sign-up → bounce to dashboard
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  // Logged-out user hitting a protected route → bounce to sign-in
  if (!isLoggedIn && isProtectedRoute) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
