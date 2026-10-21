import { cn } from "@/lib/cn";

/*
 * Small dependency-free charts for the staff overview.
 * Single measure → one brand hue; the latest period gets the strong step.
 * Values sit in text ink (never the series colour); each mark has a
 * native tooltip, and the numbers are printed so no value is colour-only.
 */

export function MonthlyBars({
  data,
  label,
}: {
  data: { month: string; value: number }[];
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <figure>
      <div role="img" aria-label={label} className="flex h-[200px] items-end gap-2 border-b border-ink-100 pb-0 sm:gap-3">
        {data.map((d, i) => {
          const last = i === data.length - 1;
          return (
            <div key={d.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5" title={`${d.month}: ${d.value} registrations`}>
              <span className="text-[11.5px] font-semibold text-ink-500 group-hover:text-brand-900">{d.value}</span>
              <span
                className={cn(
                  "w-full max-w-[34px] rounded-t-[4px] transition-colors",
                  last ? "bg-brand-600" : "bg-brand-300 group-hover:bg-brand-400",
                )}
                style={{ height: `${(d.value / max) * 150}px` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2 sm:gap-3">
        {data.map((d) => (
          <span key={d.month} className="flex-1 text-center text-[12px] text-ink-500">{d.month}</span>
        ))}
      </div>
    </figure>
  );
}

export function FunnelBars({ data, label }: { data: { stage: string; value: number }[]; label: string }) {
  const first = data[0]?.value ?? 1;
  return (
    <ol aria-label={label} className="flex flex-col gap-3.5">
      {data.map((d, i) => {
        const prev = i > 0 ? data[i - 1].value : null;
        return (
          <li key={d.stage} title={`${d.stage}: ${d.value.toLocaleString("en-US")}`}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2 text-[13px]">
              <span className="font-medium text-ink-700">{d.stage}</span>
              <span className="font-bold text-brand-900">
                {d.value.toLocaleString("en-US")}
                {prev ? <span className="ml-1.5 text-[11.5px] font-medium text-ink-500">{Math.round((d.value / prev) * 100)}% of previous</span> : null}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-brand-100">
              <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.max(2, (d.value / first) * 100)}%` }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
