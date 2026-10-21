import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Test prep" };

const pathway = [
  { t: "Free consultation", s: "Mentor checks scores and targets." },
  { t: "Class agreement / pay", s: "Before initial prep classes." },
  { t: "IELTS + recommended SAT", s: "SAT strengthens admission and scholarships." },
  { t: "Mocks / official English", s: "Record results; review the requirement." },
  { t: "Mentor moves you to the application path", s: "At the admission agreement stage." },
];

export default function TestPrepPage() {
  return (
    <>
      <PageHeader
        title="Test prep"
        subtitle="Aziza Karimova · Tashkent · Bachelor's · Fall 2027 · USA · Test-prep path"
        actions={<ButtonLink href="/app/meetings">Book a meeting</ButtonLink>}
      />
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[13px] text-ink-500">English · official result</span>
              <Badge tone="amber">Requirement not met yet</Badge>
            </div>
            <p className="mt-3 flex items-baseline gap-4">
              <span className="text-[44px] font-extrabold tracking-[-1px] text-brand-900">IELTS 5.5</span>
              <span className="text-[18px] font-bold text-brand-600">Target 6.5</span>
            </p>
            <p className="mt-2 text-[13.5px] text-ink-500">
              The requirement is 6.5. Your official 5.5 does not meet it yet. This is an official score, not a mock result.
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-brand-900">SAT</h2>
              <Badge tone="sky">Recommended</Badge>
            </div>
            <p className="mt-2 text-[18px] font-bold text-brand-900">Not taken · Not chosen</p>
            <p className="mt-1 text-[13px] text-ink-500">SAT is recommended — it improves admission and scholarship chances.</p>
            <dl className="mt-3 text-[13px]">
              <dt className="text-ink-500">SAT official date</dt>
              <dd className="font-bold text-brand-900">Not booked</dd>
            </dl>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <Card>
            <CardHeader title="IELTS General to 6.5" action={<Badge tone="neutral">IELTS-G65-Nov-B</Badge>} />
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["Format / schedule", "Online · Tue / Thu · 19:00–21:00"],
                ["Teacher", "Ms. Rakhimova"],
                ["Duration / start", "12 weeks · starts 3 Nov"],
                ["Attendance", "Not yet recorded"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[12px] text-ink-500">{k}</dt>
                  <dd className="text-[14px] font-bold text-brand-900">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <CardHeader title="Teacher comments" />
            <p className="rounded-[14px] bg-brand-50 p-3 text-[13px] text-ink-500">
              Not yet recorded. Teacher feedback will appear here when it is recorded.
            </p>
          </Card>
        </div>

        <Card>
          <CardHeader title="Mock results" subtitle="The 6.5 line is a target, not an achieved result." />
          <div className="relative h-56 rounded-[18px] bg-white/80 p-4" role="img" aria-label="Mock results chart: no mock results recorded yet; target IELTS 6.5">
            {[9, 6.5, 4, 0].map((v) => (
              <div key={v} className="absolute inset-x-12 border-t border-ink-100" style={{ top: `${16 + (1 - v / 9) * 170}px` }}>
                <span className="absolute -left-9 -top-2.5 text-[11px] text-ink-500">{v.toFixed(1)}</span>
              </div>
            ))}
            <div className="absolute inset-x-12 border-t-2 border-dashed border-brand-500" style={{ top: `${16 + (1 - 6.5 / 9) * 170}px` }}>
              <span className="absolute -top-6 right-0 text-[12px] font-semibold text-brand-600">Target IELTS 6.5</span>
            </div>
            <p className="absolute inset-x-0 top-[60%] text-center text-[13px] text-ink-500">No mock results recorded</p>
          </div>
        </Card>

        <Card>
          <CardHeader title="Test-prep path → admission" subtitle="How the process works; this is not a record of completed steps." />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {pathway.map((p) => (
              <li key={p.t} className="rounded-[16px] bg-white/80 p-4">
                <p className="text-[13.5px] font-bold text-brand-900">{p.t}</p>
                <p className="mt-1 text-[12.5px] text-ink-500">{p.s}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card tone="tint">
          <p className="text-[12px] font-bold uppercase tracking-[1px] text-brand-600">When the requirement is met</p>
          <p className="mt-1 text-[18px] font-bold text-brand-900">English requirement reached — your mentor moves you to admission.</p>
          <p className="mt-1 text-[13.5px] text-ink-700">
            When you meet the English requirement, your mentor offers the admission package. Retakes can continue alongside applications.
          </p>
        </Card>
      </div>
    </>
  );
}
