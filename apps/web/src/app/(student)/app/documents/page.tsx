import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { PageHeader } from "@/components/layout/page-header";
import { DocumentGroups, UploadButton } from "./document-groups";

export const metadata: Metadata = { title: "Personal info & documents" };

const legend = [
  { b: "Missing", tone: "neutral" as const, t: "Not started" },
  { b: "Uploaded", tone: "green" as const, t: "Received and ready for review" },
  { b: "In review", tone: "sky" as const, t: "Mentor is checking the file" },
  { b: "Needs changes", tone: "amber" as const, t: "Revisions are required" },
  { b: "Approved", tone: "lime" as const, t: "Final version accepted" },
];

const flow = [
  "Free consultation",
  "Admission agreement signed and paid (parent if under 18)",
  "Personal info & documents",
  "Application accounts — opened and managed by 4Prep",
  "Applications (student approves, 4Prep submits)",
];

export default function DocumentsPage() {
  return (
    <>
      <PageHeader
        title="Personal info & documents"
        subtitle="Visible only to you and your mentors. Parents see statuses only."
        actions={
          <>
            <button type="button" aria-label="Notifications" className="glass flex size-11 items-center justify-center rounded-full text-brand-800">
              <Bell className="size-5" />
            </button>
            <UploadButton />
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <DocumentGroups />
        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Legend" />
            <ul className="flex flex-col gap-2.5">
              {legend.map((l) => (
                <li key={l.b} className="flex items-center gap-3 text-[13px] text-ink-700">
                  <Badge tone={l.tone} className="w-[104px] justify-center">{l.b}</Badge> {l.t}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader title="Personal info" />
            <form className="flex flex-col gap-3">
              {[
                ["Full name", "Jasur Aliyev"],
                ["Email", "jasur@email.com"],
                ["Phone", "+998 90 123 45 67"],
                ["Country", "Uzbekistan"],
                ["Program", "Bachelor's"],
                ["Intake", "Fall 2027"],
                ["Parent contact", "Bobur Aliyev"],
                ["Parent email", "parent@email.com"],
              ].map(([label, value]) => (
                <Field key={label} label={label} htmlFor={`pi-${label}`}>
                  <Input id={`pi-${label}`} defaultValue={value} className="h-11" />
                </Field>
              ))}
            </form>
          </Card>
          <Card>
            <CardHeader title="Admission flow" />
            <ol className="flex flex-col gap-3">
              {flow.map((f, i) => (
                <li key={f} className="flex items-center gap-3 text-[13px] text-ink-700">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white text-[12px] font-bold text-brand-900">{i + 1}</span>
                  {f}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[12px] text-ink-500">Same process for bachelor&apos;s, master&apos;s, transfer, Fall and Spring.</p>
          </Card>
        </aside>
      </div>
    </>
  );
}
