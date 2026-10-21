import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/** 4Prep logo: the "4P" ring mark + "4Prep" wordmark. */
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
  const mark = { sm: 34, md: 38, lg: 52 }[size];
  const word = { sm: "text-[20px]", md: "text-[22px]", lg: "text-[32px]" }[size];
  return (
    <Link
      href={href}
      aria-label="4Prep home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/brand/logo-color.png"
        alt=""
        width={mark}
        height={mark}
        priority
        className="shrink-0"
      />
      <span
        className={cn(
          "font-extrabold tracking-[-0.5px]",
          word,
          inverted ? "text-white" : "text-brand-800",
        )}
      >
        4Prep
      </span>
    </Link>
  );
}
