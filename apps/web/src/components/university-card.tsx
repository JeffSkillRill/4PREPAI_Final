import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import type { University } from "@/lib/mock/universities";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { UniLogo } from "@/components/ui/avatar";
import { buttonClass } from "@/components/ui/button";

export const tierTone: Record<University["tier"], BadgeTone> = {
  Reach: "amber",
  Target: "green",
  Safety: "sky",
  "Not enough data": "neutral",
};

/** University card used on the catalogue (Figma: University card / Grid). */
export function UniversityCard({ u }: { u: University }) {
  return (
    <article className="glass flex flex-col gap-4 rounded-[28px] p-5">
      <div className="flex items-start gap-3">
        <UniLogo code={u.code} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[17px] font-bold text-brand-900">{u.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-[12.5px] text-ink-500">
            <MapPin className="size-3.5" aria-hidden /> {u.city} · {u.country}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Save ${u.name}`}
          className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100"
        >
          <Heart className="size-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>{u.ranking}</Badge>
        {u.scholarship ? <Badge tone="amber">{u.scholarship}</Badge> : null}
      </div>
      <dl className="grid grid-cols-3 gap-2 rounded-[16px] bg-brand-50/80 p-3.5">
        <div>
          <dt className="text-[11.5px] text-ink-500">Cost / yr</dt>
          <dd className="mt-1 text-[15px] font-bold text-brand-900">{u.costPerYear ?? <span className="text-[12px]">Not reported</span>}</dd>
        </div>
        <div>
          <dt className="text-[11.5px] text-ink-500">Min IELTS</dt>
          <dd className="mt-1 text-[15px] font-bold text-brand-900">{u.minIelts}</dd>
        </div>
        <div>
          <dt className="text-[11.5px] text-ink-500">Deadline</dt>
          <dd className="mt-1 text-[15px] font-bold text-brand-900">{u.deadline}</dd>
        </div>
      </dl>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Badge tone={tierTone[u.tier]}>{u.tier}</Badge>
          <Badge tone="neutral">Compare</Badge>
        </div>
        <Link href={`/universities/${u.slug}`} className={buttonClass({ variant: "dark", size: "sm", className: "h-10 px-6" })}>
          Open
        </Link>
      </div>
    </article>
  );
}
