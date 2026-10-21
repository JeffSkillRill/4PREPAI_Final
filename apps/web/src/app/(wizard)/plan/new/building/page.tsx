"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * "Building your plan…" loading state. In production this page waits for
 * the plan.build job (WebSocket event or polling); here it simulates ~2.5 s.
 */
export default function BuildingPlanPage() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.replace("/plan"), 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-5 text-center">
      <span className="relative size-[76px]">
        <span className="absolute inset-0 rounded-full border-[8px] border-brand-100" />
        <span className="absolute inset-0 animate-spin rounded-full border-[8px] border-transparent border-r-brand-500 border-t-brand-500" />
      </span>
      <h1 className="text-[28px] font-extrabold tracking-[-0.8px] text-brand-900">Building your plan…</h1>
      <p className="text-[15px] text-ink-500">Checking 2,000+ universities against your budget and scores</p>
    </div>
  );
}
