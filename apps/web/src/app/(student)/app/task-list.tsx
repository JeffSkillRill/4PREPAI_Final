"use client";

import { useState } from "react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

const tasks: { label: string; badge: string; tone: BadgeTone }[] = [
  { label: "Approve submission draft before mentor sends it", badge: "Mentor review", tone: "amber" },
  { label: "Mentor review of scores and target universities", badge: "Mentor review", tone: "amber" },
  { label: "CSS Profile (financial aid form) — if required", badge: "Next step", tone: "neutral" },
  { label: "Mock visa interview", badge: "Next step", tone: "neutral" },
];

export function TaskList() {
  const [done, setDone] = useState<boolean[]>(tasks.map(() => false));
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((t, i) => (
        <li key={t.label}>
          <label className="flex cursor-pointer items-center gap-3 rounded-[16px] border border-ink-100 bg-white/80 px-3.5 py-3 hover:border-brand-200">
            <input
              type="checkbox"
              checked={done[i]}
              onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
              className="size-5 shrink-0 accent-[#0f7a57]"
            />
            <span className={cn("flex-1 text-[13.5px] font-medium text-brand-900", done[i] && "text-ink-500 line-through")}>{t.label}</span>
            <Badge tone={t.tone}>{t.badge}</Badge>
          </label>
        </li>
      ))}
    </ul>
  );
}
