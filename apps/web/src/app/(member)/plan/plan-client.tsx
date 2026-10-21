"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { roadmap } from "@/lib/mock/plan";
import { cn } from "@/lib/cn";

/** Toggleable "save university" heart. */
export function SaveHeart({ name }: { name: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      onClick={() => setSaved((v) => !v)}
      className="flex size-9 items-center justify-center rounded-full text-brand-600 hover:bg-brand-50"
    >
      <Heart className={cn("size-[18px]", saved && "fill-brand-500")} />
    </button>
  );
}

/** Roadmap checklist; ticking is local until PATCH /plan/tasks/{id} exists. */
export function RoadmapList() {
  const [done, setDone] = useState(roadmap.map((r) => r.done));
  return (
    <ul className="flex flex-col gap-2.5">
      {roadmap.map((r, i) => (
        <li key={r.when}>
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-[16px] border px-4 py-3.5 transition-colors",
              done[i] ? "border-brand-200 bg-brand-50" : "border-ink-100 bg-white hover:border-brand-200",
            )}
          >
            <input
              type="checkbox"
              checked={done[i]}
              onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
              className="mt-1 size-4 accent-[#0f7a57]"
            />
            <span>
              <span className="block text-[12px] font-bold text-brand-600">{r.when}</span>
              <span className={cn("block text-[14px] text-brand-900", done[i] && "text-ink-500 line-through")}>{r.task}</span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
