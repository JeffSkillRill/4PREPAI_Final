import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "glass" | "tint" | "dark" | "solid";

const tones: Record<Tone, string> = {
  glass: "glass",
  tint: "glass-tint",
  dark: "glass-dark text-white",
  solid: "bg-white border border-ink-100 shadow-soft",
};

/** Liquid-glass card (Figma: Frosted / Tinted / Dark glass). */
export function Card({
  tone = "glass",
  className,
  ...props
}: { tone?: Tone } & ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-[28px] p-5 sm:p-6", tones[tone], className)}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  action,
  subtitle,
  className,
}: {
  title: ReactNode;
  action?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-3", className)}>
      <div className="min-w-0">
        <h2 className="text-[18px] font-bold text-brand-900 sm:text-[20px]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-[13px] text-ink-500">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** A light inner row used inside cards (key → value, task, list item). */
export function Row({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-[14px] bg-white/75 px-3.5 py-3",
        className,
      )}
      {...props}
    />
  );
}
