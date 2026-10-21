import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "glass" | "dark" | "outline" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,opacity] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Figma: Button/Primary — green gradient with a soft green glow
  primary:
    "bg-brand-gradient text-white border border-white/35 shadow-glow hover:brightness-105",
  // Figma: Button/Glass
  glass:
    "bg-white text-brand-800 border-[1.2px] border-white/95 shadow-soft hover:bg-brand-50",
  // Figma: Button/Dark
  dark: "bg-brand-900 text-white hover:bg-brand-800",
  outline:
    "bg-white text-brand-800 border border-ink-200 hover:border-brand-300 hover:bg-brand-50",
  ghost: "text-brand-800 hover:bg-brand-50",
  soft: "bg-brand-100 text-brand-700 hover:bg-brand-200",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[15px]",
  lg: "h-[53px] px-7 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={buttonClass({ variant, size, className })}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...props} />
  );
}
