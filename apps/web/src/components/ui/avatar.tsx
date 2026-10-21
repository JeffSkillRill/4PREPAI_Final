import { cn } from "@/lib/cn";

const palettes = [
  "from-[#4ade9a] to-[#0f7a57]",
  "from-[#7dd3fc] to-[#0369a1]",
  "from-[#fdba74] to-[#c2410c]",
  "from-[#c8f169] to-[#4d7c0f]",
  "from-[#f9a8d4] to-[#be185d]",
  "from-[#c4b5fd] to-[#6d28d9]",
  "from-[#fca5a5] to-[#b91c1c]",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

/** Initials avatar; colour is stable per name. */
export function Avatar({
  name,
  size = 40,
  className,
  ring = false,
}: {
  name: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  const idx = [...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % palettes.length;
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white",
        palettes[idx],
        ring && "border-2 border-white",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials(name)}
    </span>
  );
}

/** Square-ish tile with university initials (e.g. "UT", "KA"). */
export function UniLogo({ code, size = 44, className }: { code: string; size?: number; className?: string }) {
  const idx = [...code].reduce((a, ch) => a + ch.charCodeAt(0), 0) % palettes.length;
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br font-bold text-white",
        palettes[idx],
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {code}
    </span>
  );
}
