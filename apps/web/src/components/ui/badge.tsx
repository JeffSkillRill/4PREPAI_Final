import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Status badge. Tones carry meaning:
 * green = success / done, amber = due soon / needs attention,
 * sky = information / optional, coral = missing / overdue, neutral = not started.
 */
export type BadgeTone =
  | "green"
  | "amber"
  | "sky"
  | "coral"
  | "neutral"
  | "lime"
  | "dark"
  | "violet";

const tones: Record<BadgeTone, string> = {
  green: "bg-brand-100 text-brand-700",
  amber: "bg-amber-soft text-amber-ink",
  sky: "bg-sky-soft text-sky-ink",
  coral: "bg-coral-soft text-coral-ink",
  neutral: "bg-ink-100 text-ink-700",
  lime: "bg-lime text-brand-900",
  dark: "bg-brand-900 text-white",
  violet: "bg-violet-100 text-violet-700",
};

export function Badge({
  tone = "green",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold leading-none tracking-[0.2px] whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small "eyebrow" pill above a heading (e.g. "4Prep Academy · Tashkent"). */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-100 px-2.5 py-1 text-[12px] font-semibold text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
