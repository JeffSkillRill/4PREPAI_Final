import { cn } from "@/lib/cn";

type Blob = {
  color: "mint" | "lime" | "sky" | "green";
  className: string;
};

const colors: Record<Blob["color"], string> = {
  mint: "rgba(134, 239, 192, 0.55)",
  green: "rgba(74, 222, 154, 0.45)",
  lime: "rgba(200, 241, 105, 0.45)",
  sky: "rgba(125, 211, 252, 0.4)",
};

/**
 * Soft colour blobs behind glass surfaces (Figma "Blob" ellipses).
 * Purely decorative: hidden from assistive tech and never intercepts clicks.
 */
export function Blobs({
  blobs = [
    { color: "mint", className: "-top-24 right-[-6%] size-[520px]" },
    { color: "lime", className: "top-[40%] right-[-10%] size-[420px]" },
    { color: "sky", className: "top-[30%] -left-40 size-[420px]" },
  ],
  className,
}: {
  blobs?: Blob[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className={cn("absolute rounded-full blur-[90px]", b.className)}
          style={{ background: colors[b.color] }}
        />
      ))}
    </div>
  );
}
