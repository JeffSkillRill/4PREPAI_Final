import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ProgressRing } from "@/components/ui/progress";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Your child's progress" };

const journey = ["Consultation", "Test prep", "Agreement", "Documents", "Applications", "Offers & grants", "Visa", "Departure"];
const currentStep = 1; // Test prep

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="flex flex-col gap-2">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3 rounded-[12px] bg-white/75 px-3.5 py-2.5 text-[13.5px]">
          <dt className="text-ink-500">{k}</dt>
          <dd className="text-right font-semibold text-brand-900">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ChildProgressPage() {
  return (
    <>
      <PageHeader title="Your child’s progress" subtitle="Selected child: Aziza Karimova · Family view · Status information only" />
      <div className="flex flex-col gap-6">
        <Card tone="tint">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <ProgressRing value={18} size={84} stroke={8} label="Overall progress 18%" />
              <div>
                <h2 className="text-[22px] font-bold text-brand-900">Aziza Karimova</h2>
                <p className="text-[13.5px] text-ink-700">Tashkent · Bachelor&apos;s · Fall 2027 · USA</p>
                <p className="mt-1 text-[13.5px] text-ink-700">Current stage: <span className="font-bold">Test preparation</span> · On track</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>
                <MessageSquare className="size-4" aria-hidden /> Message mentor
              </Button>
              <Button variant="glass">
                <MessageSquare className="size-4" aria-hidden /> Message teacher
              </Button>
            </div>
          </div>
          <ol className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-8" aria-label="Journey">
            {journey.map((j, i) => (
              <li key={j} className="flex flex-col gap-2">
                <span className={cn("h-2 rounded-full", i < currentStep ? "bg-brand-400" : i === currentStep ? "bg-brand-600" : "bg-white")} />
                <span className={cn("text-[12.5px]", i === currentStep ? "font-bold text-brand-700" : i < currentStep ? "text-brand-900" : "text-ink-500")}>
                  {j}
                  {i === currentStep ? " · now" : ""}
                </span>
              </li>
            ))}
          </ol>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Scores" />
            <Facts rows={[["IELTS", "5.5 → target 6.5 · requirement 6.5"], ["SAT", "Not taken · Recommended"]]} />
          </Card>
          <Card>
            <CardHeader title="Current preparation" />
            <Facts
              rows={[
                ["Class", "IELTS General to 6.5 · Online"],
                ["Attendance", "No lessons yet"],
                ["Next deadline", "Not set"],
                ["Payment", "Class agreement paid"],
              ]}
            />
          </Card>
          <Card>
            <CardHeader title="What we need from your family" />
            <ul className="flex flex-col gap-2">
              {[
                ["Passport copy", "Missing", "coral"],
                ["Parent signature on admission agreement", "Later · after test prep", "neutral"],
              ].map(([t, s, tone]) => (
                <li key={t} className="flex items-center justify-between gap-3 rounded-[12px] bg-white/75 px-3.5 py-2.5 text-[13.5px]">
                  <span className="font-semibold text-brand-900">{t}</span>
                  <Badge tone={tone as "coral" | "neutral"}>{s}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12.5px] text-ink-500">You see document statuses, not their contents.</p>
          </Card>
          <Card>
            <CardHeader title="Family decision authority" />
            <ul className="flex flex-col gap-2 text-[13.5px] text-ink-700">
              <li>The family reviews offers, grants and total costs, and approves submissions.</li>
              <li>A parent signs the admission agreement if the student is under 18.</li>
              <li>No sensitive document contents are shown here.</li>
            </ul>
          </Card>
        </div>

        <Card>
          <CardHeader title="Your child’s team" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Madina S.", "Admission mentor"],
              ["Ms. Rakhimova", "IELTS teacher"],
            ].map(([n, r]) => (
              <div key={n} className="flex items-center gap-3 rounded-[16px] bg-white/80 p-3">
                <Avatar name={n} size={44} />
                <span className="flex-1">
                  <span className="block text-[14px] font-bold text-brand-900">{n}</span>
                  <span className="block text-[12.5px] text-ink-500">{r}</span>
                </span>
                <Button size="sm" variant="soft">Message</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
