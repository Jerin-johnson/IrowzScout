// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSynchronizer } from "@/components/auth/auth-synchronizer";
import SessionProviderWrapper from "@/components/session-provider-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Jarvis",
  description: "Your intelligent job search assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Set a deep zinc background and light text globally */}
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-50 selection:bg-zinc-800">
        <SessionProviderWrapper>
          <AuthSynchronizer />
          <main className="flex-1 flex flex-col items-center justify-center p-4">
            {children}
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
