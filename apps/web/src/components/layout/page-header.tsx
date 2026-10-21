import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Dashboard page title with subtitle and right-side actions. */
export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="min-w-0">
        <h1 className="text-[28px] font-extrabold tracking-[-0.8px] text-brand-900 sm:text-[34px]">
          {title}
        </h1>
        {subtitle ? <p className="mt-1 text-[14px] text-ink-500 sm:text-[15px]">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}

/** Container for public pages: 80px side padding on desktop, 16px on phones. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-20", className)}>{children}</div>;
}

/** Centered section heading used on marketing pages. */
export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
}: {
  overline?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-10", align === "center" ? "text-center" : "text-left")}>
      {overline ? (
        <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-brand-600">{overline}</p>
      ) : null}
      <h2 className="mt-2 text-[30px] font-bold leading-tight tracking-[-0.8px] text-brand-900 sm:text-[40px]">
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-3 text-[15px] leading-7 text-ink-500", align === "center" && "mx-auto max-w-[620px]")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
