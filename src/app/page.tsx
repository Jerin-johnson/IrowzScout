"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Search,
  Target,
  RefreshCw,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "Resume Intelligence",
    description:
      "We read between the lines of your experience and turn it into a living career profile.",
  },
  {
    icon: Search,
    title: "Silent Discovery",
    description:
      "While you sleep, we scan and filter opportunities that actually match who you are becoming.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Every role comes with a clear explanation of why it fits — no more guessing.",
  },
  {
    icon: RefreshCw,
    title: "Always Watching",
    description:
      "New high-signal roles appear automatically. You only see what matters.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070c] text-white selection:bg-violet-500/30">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft radial glow */}
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/8 blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                              linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        {/* Custom text logo */}
        <Link href="/" className="group flex items-baseline gap-0.5">
          <span className="text-[22px] font-semibold tracking-tight text-white">
            Irowz
          </span>
          <span className="text-[22px] font-light tracking-tight text-violet-400 transition group-hover:text-violet-300">
            Scout
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="#how"
            className="hidden text-sm text-zinc-400 transition hover:text-white sm:block"
          >
            How it works
          </Link>
          <Link
            href="/sign-in"
            className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-28 pt-16 text-center sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Curiosity badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] text-zinc-300 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            Most people never see the roles that actually fit them
          </div>

          <h1 className="text-[2.75rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl sm:leading-[1.05]">
            The jobs you’re meant for
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              are already out there.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-zinc-400">
            IrowzScout quietly analyzes your career DNA and surfaces only the
            opportunities that match who you are — and who you’re becoming.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="group flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-100"
            >
              Discover your matches
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="#how"
              className="flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
            >
              See how it works
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Subtle social proof line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-sm text-zinc-500"
        >
          Built for people tired of applying into the void
        </motion.p>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Less searching. More signal.
          </h2>
          <p className="mt-3 text-zinc-400">
            Four quiet advantages that change how you find work.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition duration-300 hover:border-violet-500/25 hover:bg-white/[0.04]"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-[15px] font-medium">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent px-8 py-12 sm:px-14 sm:py-16">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            How curiosity turns into clarity
          </h2>

          <div className="space-y-10">
            {[
              {
                num: "01",
                title: "You upload once",
                desc: "We extract the real story from your resume — skills, trajectory, and hidden strengths.",
              },
              {
                num: "02",
                title: "We build your living profile",
                desc: "An evolving model of who you are and what you’re ready for next.",
              },
              {
                num: "03",
                title: "Matches appear with reasons",
                desc: "Only high-relevance roles. Every suggestion comes with a clear explanation.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-500/25 bg-violet-500/10 text-xs font-medium text-violet-300">
                  {item.num}
                </div>
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — curiosity focused */}
      <section className="relative z-10 mx-auto max-w-2xl px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What if the perfect role
            <br />
            is already looking for you?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-zinc-400">
            Stop sending applications into the dark. Let the right opportunities
            find their way to you.
          </p>

          <Link
            href="/sign-up"
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-100"
          >
            Start discovering
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-baseline gap-0.5 text-sm">
            <span className="font-medium text-zinc-300">Irowz</span>
            <span className="font-light text-violet-400/80">Scout</span>
          </div>
          <p className="text-sm text-zinc-600">Signal over noise.</p>
        </div>
      </footer>
    </div>
  );
}
