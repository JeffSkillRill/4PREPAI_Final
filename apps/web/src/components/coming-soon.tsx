import { Hourglass } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

/**
 * Placeholder for screens planned for Phase 2/3 (see the Technical
 * Specification, section 17). Keeps menu links working in the prototype.
 */
export function ComingSoon({
  title,
  phase = "Phase 2",
  backHref,
  backLabel = "Back",
  note,
}: {
  title: string;
  phase?: string;
  backHref: string;
  backLabel?: string;
  note?: string;
}) {
  return (
    <div className="glass mx-auto my-10 flex max-w-[560px] flex-col items-center gap-3 rounded-[28px] p-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-[16px] bg-brand-100 text-brand-600">
        <Hourglass className="size-6" aria-hidden />
      </span>
      <h1 className="text-[24px] font-extrabold text-brand-900">{title}</h1>
      <p className="text-[14px] leading-6 text-ink-500">
        {note ?? `This screen is planned for ${phase}. The navigation already points here so the menu matches the design.`}
      </p>
      <ButtonLink href={backHref} variant="glass" className="mt-2">
        {backLabel}
      </ButtonLink>
    </div>
  );
}
