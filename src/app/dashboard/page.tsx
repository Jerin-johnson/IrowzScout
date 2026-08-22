import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "there";
  const resumeCompleted = session?.user?.resumeCompleted;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Welcome back, {firstName}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Your automated career agent is synchronized and active.
          </p>
        </div>
        <button className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200">
          Run Agent Sync
        </button>
      </div>

      {/* Conditional Resume Warning Banner */}
      {!resumeCompleted && (
        <div className="rounded-2xl border border-amber-900/30 bg-amber-950/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-amber-200">
              Action Required: Complete Your Resume Profile
            </h3>
            <p className="text-xs text-amber-400/80 mt-1">
              Jarvis needs your parsed resume structure to accurately calculate
              skill match scores.
            </p>
          </div>
          <a
            href="/dashboard/resume"
            className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition-colors whitespace-nowrap"
          >
            Upload Resume
          </a>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Total Matches Found
          </p>
          <p className="text-3xl font-semibold text-zinc-100 mt-2">0</p>
        </div>
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            High Match (&gt;85%)
          </p>
          <p className="text-3xl font-semibold text-zinc-100 mt-2">0</p>
        </div>
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Active Applications
          </p>
          <p className="text-3xl font-semibold text-zinc-100 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
