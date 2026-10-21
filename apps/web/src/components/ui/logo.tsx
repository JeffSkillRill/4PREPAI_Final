import Link from "next/link";
import { cn } from "@/lib/cn";

/** 4Prep logo: gradient "4" tile + "Prep" wordmark. */
export function Logo({
  size = "md",
  href = "/",
  inverted = false,
  className,
}: {
  size?: "sm" | "md" | "lg";
  href?: string;
  inverted?: boolean;
  className?: string;
}) {
  const tile = { sm: "size-[34px] text-[19px] rounded-[10px]", md: "size-9 text-[21px] rounded-[11px]", lg: "size-[52px] text-[30px] rounded-[16px]" }[size];
  const word = { sm: "text-[21px]", md: "text-[22px]", lg: "text-[32px]" }[size];
  return (
    <Link
      href={href}
      aria-label="4Prep home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "bg-logo-gradient flex items-center justify-center font-extrabold text-white",
          tile,
        )}
      >
        4
      </span>
      <span
        className={cn(
          "font-extrabold tracking-[-0.5px]",
          word,
          inverted ? "text-white" : "text-brand-800",
        )}
      >
        Prep
      </span>
    </Link>
  );
}
