import type { Metadata } from "next";
import { Bell, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader, Row } from "@/components/ui/card";
import { ProgressBar, ProgressRing } from "@/components/ui/progress";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/cn";
import { TaskList } from "./task-list";

export const metadata: Metadata = { title: "Home" };

const stages = [
  { label: "Consultation", state: "done" },
  { label: "Agreement", state: "done" },
  { label: "Personal info & documents", state: "done" },
  { label: "Application accounts — opened by 4Prep", state: "done" },
  { label: "Applications", state: "current" },
  { label: "Grants & offers", state: "next" },
  { label: "Visa & departure", state: "next" },
] as const;

export default function StudentHome() {
  return (
    <>
      <PageHeader
        title="Good morning, Jasur"
        subtitle="You are in the applications stage. Your mentor reviews scores and targets, then you approve submissions."
        actions={
          <>
            <button type="button" aria-label="Notifications" className="glass flex size-11 items-center justify-center rounded-full text-brand-800">
              <Bell className="size-5" />
            </button>
            <ButtonLink href="/app/meetings">Book a meeting</ButtonLink>
          </>
        }
      />

      <div className="flex flex-col gap-6">
        <Card>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <ProgressRing value={62} size={72} stroke={8} label="Overall progress 62%" />
              <div>
                <h2 className="text-[20px] font-bold text-brand-900">Admission stages</h2>
                <p className="text-[13px] text-ink-500">Next deadline: Dec 1 · KAIST · mentor: Madina S.</p>
              </div>
            </div>
            <Badge>Current: Applications</Badge>
          </div>
          <ol className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-7">
            {stages.map((s) => (
              <li key={s.label} className="flex flex-col gap-2">
                <span
                  className={cn(
                    "h-2 rounded-full",
                    s.state === "done" && "bg-brand-400",
                    s.state === "current" && "bg-brand-600",
                    s.state === "next" && "bg-brand-100",
                  )}
                />
                <span
                  className={cn(
                    "text-[12.5px] leading-snug",
                    s.state === "current" ? "font-bold text-brand-700" : s.state === "done" ? "font-medium text-brand-900" : "text-ink-500",
                  )}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ol>
        </Card>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader title="Today’s tasks" action={<span className="text-[13px] font-semibold text-brand-600">4 open</span>} />
            <TaskList />
          </Card>
          <Card>
            <CardHeader title="Next deadline" subtitle="Earliest round across your applications" />
            <div className="flex flex-col gap-2">
              <Row>
                <span><span className="block text-[14px] font-bold text-brand-900">KAIST · Early</span><span className="block text-[12px] text-ink-500">Portal: university</span></span>
                <Badge tone="amber">Dec 1</Badge>
              </Row>
              <Row>
                <span><span className="block text-[14px] font-bold text-brand-900">University of Toronto</span><span className="block text-[12px] text-ink-500">Portal: OUAC</span></span>
                <Badge tone="neutral">Jan 15</Badge>
              </Row>
            </div>
          </Card>
          <Card>
            <CardHeader title="Your major" />
            <div className="rounded-[18px] bg-brand-50 p-4">
              <p className="flex items-center gap-2 text-[17px] font-bold text-brand-900">
                <GraduationCap className="size-5 text-brand-600" aria-hidden /> Computer Science
              </p>
              <p className="mt-1 text-[13px] leading-5 text-ink-500">
                Strong math and an interest in software; good scholarship options in Korea and Germany.
              </p>
              <p className="mt-2 text-[12px] text-ink-500">Decided with Madina S. on 18 Sep 2026</p>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <Card>
            <CardHeader title="Applications" action={<ButtonLink href="/app/applications" variant="ghost" size="sm">Open tracker</ButtonLink>} />
            <p className="text-[15px] font-bold text-brand-900">8 proposed applications</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["5 USA", "1 Canada", "1 Germany", "1 Italy"].map((c) => (
                <Badge key={c} tone="neutral">{c}</Badge>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-ink-500">Status: Planning · Shortlist awaiting your approval</p>
          </Card>
          <Card>
            <CardHeader title="Parallel lanes" subtitle="These run alongside applications." />
            <div className="flex flex-col gap-2">
              {[
                { t: "Retake prep", s: "IELTS and SAT retakes planned", b: "Planned", tone: "amber" as const },
                { t: "Financial aid", s: "Scholarship and aid review", b: "Needs mentor review", tone: "amber" as const },
                { t: "Visa interview prep", s: "Parallel to applications", b: "Not started", tone: "neutral" as const },
              ].map((l) => (
                <Row key={l.t}>
                  <span><span className="block text-[14px] font-bold text-brand-900">{l.t}</span><span className="block text-[12px] text-ink-500">{l.s}</span></span>
                  <Badge tone={l.tone}>{l.b}</Badge>
                </Row>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader title="Score cards" action={<span className="text-[13px] font-semibold text-brand-600">Current and target</span>} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] bg-white/80 p-5">
              <div className="flex items-center justify-between"><span className="text-[13px] text-ink-500">English</span><Badge>Requirement met</Badge></div>
              <p className="mt-3 text-[30px] font-extrabold text-brand-900">IELTS 6.5</p>
              <p className="text-[13px] text-ink-500">Target 7.0 · Requirement 6.5 met</p>
              <ProgressBar value={72} target={78} className="mt-4" />
              <p className="mt-3 text-[12.5px] text-ink-500">Next official test date: Not booked</p>
            </div>
            <div className="rounded-[20px] bg-white/80 p-5">
              <div className="flex items-center justify-between"><span className="text-[13px] text-ink-500">SAT</span><Badge tone="sky">Recommended</Badge></div>
              <p className="mt-3 text-[30px] font-extrabold text-brand-900">SAT 1350 / 1600</p>
              <p className="text-[13px] text-ink-500">Target 1450 / 1600</p>
              <ProgressBar value={84} target={91} className="mt-4" />
              <p className="mt-3 text-[12.5px] text-ink-500">Next official test date: To be confirmed</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
