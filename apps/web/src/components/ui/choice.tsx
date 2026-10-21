"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/** Multi-select chips (e.g. countries, priorities). Optional max selection. */
export function ChoiceChips({
  options,
  value,
  onChange,
  max,
  className,
}: {
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
  className?: string;
}) {
  function toggle(opt: string) {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else if (!max || value.length < max) onChange([...value, opt]);
  }
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => {
        const on = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(opt)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-[12px] border px-4 text-[14px] font-medium transition-colors",
              on
                ? "bg-brand-gradient border-transparent text-white shadow-glow"
                : "border-ink-200 bg-white text-ink-700 hover:border-brand-300",
            )}
          >
            {opt}
            {on ? <Check className="size-3.5" aria-hidden /> : null}
          </button>
        );
      })}
    </div>
  );
}

/** Single-select segmented control (e.g. Me / My child, Online / Office / Phone). */
export function Segmented({
  options,
  value,
  onChange,
  className,
  label,
}: {
  options: readonly string[];
  value: string;
  onChange: (next: string) => void;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "flex rounded-[16px] border border-ink-200 bg-white/80 p-1",
        className,
      )}
    >
      {options.map((opt) => {
        const on = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(opt)}
            className={cn(
              "h-11 flex-1 rounded-[12px] px-3 text-[14px] font-semibold transition-colors",
              on ? "bg-brand-gradient text-white shadow-soft" : "text-ink-700 hover:bg-brand-50",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/** Pill tabs (e.g. "1 Student & parent", filter chips that act as one choice). */
export function PillTabs({
  options,
  value,
  onChange,
  className,
}: {
  options: readonly string[];
  value: string;
  onChange: (next: string) => void;
  className?: string;
}) {
  return (
    <div role="tablist" className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => {
        const on = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(opt)}
            className={cn(
              "h-9 rounded-full border px-4 text-[13px] font-semibold transition-colors",
              on
                ? "bg-brand-gradient border-transparent text-white shadow-glow"
                : "border-ink-200 bg-white text-ink-700 hover:border-brand-300",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/** Accessible on/off switch. */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 rounded-full transition-colors",
        checked ? "bg-brand-600" : "bg-ink-200",
      )}
    >
      <span
        className={cn(
          "absolute top-1 size-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

/** Styled checkbox with label. */
export function Checkbox({
  checked,
  onChange,
  children,
  className,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 text-[14px] text-ink-700", className)}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500",
          checked ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 bg-white",
        )}
      >
        {checked ? <Check className="size-3.5" /> : null}
      </span>
      <span>{children}</span>
    </label>
  );
}
