import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";

/**
 * Two-column sign-up layout (Figma: Register, SAT enrolment — Guest).
 * Left: dark green brand panel with blobs. Right: the form.
 */
export function AuthSplit({
  left,
  children,
  loginHint = "Already have an account?",
  loginLabel = "Log in",
}: {
  left: ReactNode;
  children: ReactNode;
  loginHint?: string;
  loginLabel?: string;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[640px_1fr]">
      <aside className="relative isolate hidden overflow-hidden bg-brand-900 p-16 text-white lg:flex lg:flex-col">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-20 top-[-10%] size-[520px] rounded-full bg-brand-500/60 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] size-[460px] rounded-full bg-brand-400/50 blur-[100px]" />
          <div className="absolute right-[-15%] top-[20%] size-[360px] rounded-full bg-lime/25 blur-[100px]" />
        </div>
        <Logo inverted />
        <div className="flex flex-1 flex-col justify-center">{left}</div>
      </aside>
      <main className="flex flex-col bg-surface px-5 py-8 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between">
          <span className="lg:hidden">
            <Logo size="sm" />
          </span>
          <p className="ml-auto text-[14px] text-ink-500">
            {loginHint}{" "}
            <Link href="/plan" className="font-semibold text-brand-600 hover:underline">
              {loginLabel}
            </Link>
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col justify-center py-10">{children}</div>
        <p className="text-[12px] text-ink-500">© 2026 4Prep Academy</p>
      </main>
    </div>
  );
}
