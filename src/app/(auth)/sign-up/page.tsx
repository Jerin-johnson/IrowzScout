"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/actions/auth.actions";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="text-center pb-8">
        <h2 className="text-2xl font-medium tracking-tight text-zinc-100">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Your organized job search starts here.
        </p>
      </div>

      <div className="space-y-6">
        <GoogleAuthButton mode="signup" />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wider">
            <span className="bg-[#09090b] px-4 text-zinc-500">or</span>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-lg bg-red-950/50 p-3 text-sm text-red-400 text-center border border-red-900/50">
              {state.error}
            </div>
          )}

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-colors"
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-colors"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-colors"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200 disabled:opacity-50 mt-4"
          >
            {isPending ? "Setting things up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 pt-4">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
