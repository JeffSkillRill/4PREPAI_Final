import { cn } from "@/lib/cn";

/** Circular progress (Figma: Progress Ring, e.g. "72%"). */
export function ProgressRing({
  value,
  size = 96,
  stroke = 9,
  label,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `${pct}% complete`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#dcfceb" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#12b76a"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-extrabold text-brand-900"
        style={{ fontSize: size * 0.25 }}
      >
        {pct}%
      </span>
    </div>
  );
}

/** Horizontal bar with an optional target marker. */
export function ProgressBar({
  value,
  target,
  className,
  tone = "green",
}: {
  value: number;
  target?: number;
  className?: string;
  tone?: "green" | "amber" | "violet";
}) {
  const fill = { green: "bg-brand-400", amber: "bg-amber", violet: "bg-violet-400" }[tone];
  return (
    <div className={cn("relative h-2.5 w-full rounded-full bg-brand-100", className)}>
      <div
        className={cn("h-full rounded-full", fill)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
      {target !== undefined ? (
        <span
          aria-hidden
          className="absolute -top-1 h-[18px] w-0.5 rounded bg-brand-900"
          style={{ left: `${target}%` }}
        />
      ) : null}
    </div>
  );
}

/** Segmented step bar used by wizards ("Step 2 of 5"). */
export function StepBar({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full",
            i < current ? "bg-brand-500" : "bg-brand-200",
          )}
        />
      ))}
    </div>
  );
}
