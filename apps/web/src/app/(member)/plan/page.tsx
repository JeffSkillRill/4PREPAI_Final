import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightLeft, Sparkles } from "lucide-react";
import { planMatches, planSummary, tierMeta, roadmap, type PlanMatch } from "@/lib/mock/plan";
import { Blobs } from "@/components/ui/blobs";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UniLogo } from "@/components/ui/avatar";
import { Container } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/cn";
import { RoadmapList, SaveHeart } from "./plan-client";

export const metadata: Metadata = { title: "My Plan" };

const factorStyle = {
  meets: "bg-brand-100 text-brand-700 before:bg-brand-500",
  partial: "bg-amber-soft text-amber-ink before:bg-amber",
  misses: "bg-coral-soft text-coral-ink before:bg-coral",
  unknown: "bg-ink-100 text-ink-500 before:bg-ink-300",
} as const;

function MatchCard({ m }: { m: PlanMatch }) {
  return (
    <article className="glass flex flex-col gap-3 rounded-[24px] p-5">
      <div className="flex items-start gap-3">
        <UniLogo code={m.code} size={42} />
        <div className="min-w-0 flex-1">
          <Link href={`/universities/${m.slug}`} className="text-[16px] font-bold text-brand-900 hover:underline">
            {m.name}
          </Link>
          <p className="text-[12px] text-ink-500">{m.place}</p>
        </div>
        <SaveHeart name={m.name} />
      </div>
      <p className="text-[13.5px] leading-[21px] text-ink-700">{m.reason}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label="Fit factors">
        {Object.entries(m.factors).map(([factor, state]) => (
          <li
            key={factor}
            title={`${factor}: ${state}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold before:size-1.5 before:rounded-full before:content-['']",
              factorStyle[state],
            )}
          >
            {factor}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function MyPlanPage() {
  const tiers = ["Reach", "Target", "Safety", "Not enough data"] as const;
  const done = roadmap.filter((r) => r.done).length;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100/60 pb-10 pt-[120px] lg:pt-[140px]">
        <Blobs blobs={[{ color: "mint", className: "-top-20 right-[-5%] size-[520px]" }, { color: "lime", className: "top-10 left-[5%] size-[300px]" }]} />
        <Container className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[36px] font-extrabold tracking-[-1.5px] text-brand-900 sm:text-[48px]">My Plan</h1>
            <p className="mt-1 text-[15px] text-ink-500">Built from your answers. Every match is explained — no unexplained fit score.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass">Share with parent</Button>
            <ButtonLink href="/plan/new/about" variant="glass">Re-build plan</ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="grid gap-6 pb-16 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[1px] text-brand-600">Summary</p>
              <p className="mt-1 text-[20px] font-bold text-brand-900">{planSummary.title}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {planSummary.chips.map((c) => (
                  <Badge key={c} tone="neutral">{c}</Badge>
                ))}
              </div>
            </div>
            <ButtonLink href="/plan/new/goal" variant="glass" size="sm">Edit</ButtonLink>
          </Card>

          {tiers.map((tier) => {
            const items = planMatches.filter((m) => m.tier === tier);
            if (!items.length) return null;
            const meta = tierMeta[tier];
            return (
              <section key={tier} aria-labelledby={`tier-${tier}`}>
                <div className="mb-3 flex items-center gap-3">
                  <Badge tone={meta.tone} className="!text-[12px]">
                    <span id={`tier-${tier}`}>{meta.label}</span>
                  </Badge>
                  <span className="text-[13px] text-ink-500">{meta.note}</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((m) => (
                    <MatchCard key={m.slug} m={m} />
                  ))}
                </div>
              </section>
            );
          })}

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-brand-900">Roadmap to Fall 2027</h2>
              <span className="text-[13px] font-semibold text-brand-600">{done} of {roadmap.length} steps done</span>
            </div>
            <RoadmapList />
          </Card>
        </div>

        <aside className="flex flex-col gap-6">
          <Card>
            <p className="text-[17px] font-bold text-brand-900">Gaps and next steps</p>
            <p className="mt-2 text-[13px] leading-5 text-ink-500">
              Most of your targets ask for IELTS 6.5 and you have not taken IELTS yet. Options:
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                ["Self-study with free resources", "/counselor"],
                ["Join a 4Prep IELTS course", "/courses"],
                ["Choose universities with lower requirements", "/universities"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="flex items-center gap-2 rounded-[14px] bg-brand-50 px-3.5 py-3 text-[13.5px] font-medium text-brand-900 hover:bg-brand-100">
                    <ArrowRightLeft className="size-4 text-brand-600" aria-hidden /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-[17px] font-bold text-brand-900">Weekly check-in</p>
            <p className="mt-2 text-[13px] leading-5 text-ink-500">
              Once a week the counselor asks how it went, ticks finished tasks and adjusts your roadmap.
            </p>
            <Button variant="dark" className="mt-4 w-full">Start this week&apos;s check-in</Button>
          </Card>
          <Card tone="dark" className="bg-forest-gradient">
            <p className="text-[12px] font-bold uppercase tracking-[1px] text-lime">4Prep Academy</p>
            <p className="mt-2 text-[20px] font-bold leading-snug">Want a mentor team to do this with you?</p>
            <p className="mt-2 text-[13px] text-brand-200">Explains the services and process. No pressure.</p>
            <ButtonLink href="/apply/student" className="mt-4 w-full">Apply to join</ButtonLink>
          </Card>
          <Link href="/counselor" className="glass flex items-center gap-3 rounded-[24px] p-4 text-[14px] font-semibold text-brand-900 hover:bg-white">
            <span className="bg-logo-gradient flex size-9 items-center justify-center rounded-[11px] text-white">
              <Sparkles className="size-4" aria-hidden />
            </span>
            Ask the counselor about my plan
          </Link>
        </aside>
      </Container>
      <Footer />
    </>
  );
}
