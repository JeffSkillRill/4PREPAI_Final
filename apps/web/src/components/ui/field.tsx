import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const control =
  "h-14 w-full rounded-[16px] border border-ink-200 bg-white px-5 text-[15px] text-brand-900 placeholder:text-ink-300 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

/** Label + control + optional hint, stacked. */
export function Field({
  label,
  hint,
  aside,
  htmlFor,
  className,
  children,
}: {
  label: ReactNode;
  hint?: ReactNode;
  aside?: ReactNode;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-[13px] font-semibold text-ink-700">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {hint ? <p className="text-[12px] text-ink-500">{hint}</p> : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(control, "h-auto min-h-24 py-4 leading-6", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "appearance-none pr-12", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-ink-500"
      />
    </div>
  );
}

/** Section label in caps, e.g. "WHO IS THIS PLAN FOR?" */
export function Overline({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("text-[12px] font-semibold uppercase tracking-[1px] text-ink-500", className)}>
      {children}
    </p>
  );
}
