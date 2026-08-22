import { auth, signOut } from "@/auth";
import Link from "next/link";

import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("Session in DashboardLayout:", session);
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex selection:bg-zinc-800">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-zinc-800/60 bg-zinc-950/60 backdrop-blur-xl flex flex-col justify-between hidden md:flex">
        <div>
          {/* Brand Header */}
          <div className="h-16 flex items-center px-6 border-b border-zinc-800/60">
            <span className="font-semibold tracking-tight text-zinc-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Irowzscout
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-zinc-800/50 text-zinc-100 transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/matches"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
            >
              AI Job Matches
            </Link>
            <Link
              href="/dashboard/resume"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
            >
              Resume Profile
            </Link>
          </nav>
        </div>

        {/* User Footer Profile & Sign Out */}
        <div className="p-4 border-t border-zinc-800/60">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-300">
              {session.user.name?.[0] || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-zinc-200 truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {session.user.email}
              </p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/sign-in" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/30 transition-colors border border-red-900/20"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-zinc-800/60 bg-zinc-950/20 backdrop-blur-md px-6 flex items-center justify-between md:hidden">
          <span className="font-semibold text-sm">Job Jarvis</span>
        </header>
        <div className="p-8 max-w-6xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
