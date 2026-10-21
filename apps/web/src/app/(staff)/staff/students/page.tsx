import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { students } from "@/lib/mock/people";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "My students" };

const pathTone: Record<string, BadgeTone> = {
  "Application path": "green",
  "Test-prep path": "sky",
  "Awaiting mentor review": "amber",
};

/*
 * The Figma frame lists students as plain text blocks; here the same facts
 * are laid out as a scannable caseload table with a link to Student 360.
 */
export default function MyStudentsPage() {
  return (
    <>
      <PageHeader title="My students" subtitle={`Madina S. · ${students.length} assigned students`} />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-[14px]">
          <thead>
            <tr className="text-[11.5px] uppercase tracking-[1px] text-ink-500">
              <th className="pb-2 font-semibold">Student</th>
              <th className="pb-2 font-semibold">Path</th>
              <th className="pb-2 font-semibold">Stage</th>
              <th className="pb-2 font-semibold">English</th>
              <th className="pb-2 font-semibold">SAT</th>
              <th className="pb-2 font-semibold">Next deadline</th>
              <th className="w-36 pb-2 font-semibold">Progress</th>
              <th className="pb-2"><span className="sr-only">Open</span></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-ink-100">
                <td className="py-3">
                  <span className="flex items-center gap-3">
                    <Avatar name={s.name} size={36} />
                    <span>
                      <span className="block font-bold text-brand-900">{s.name}</span>
                      <span className="block text-[12px] text-ink-500">{s.degree} · {s.intake} · {s.destinations}</span>
                    </span>
                  </span>
                </td>
                <td className="py-3"><Badge tone={pathTone[s.path]}>{s.path}</Badge></td>
                <td className="py-3 text-ink-700">{s.stage}</td>
                <td className="py-3 text-ink-700">
                  {s.english.test} {s.english.current} → {s.english.target}
                  {!s.english.met ? <span className="block text-[12px] text-amber-ink">Requirement not met</span> : null}
                </td>
                <td className="py-3 text-ink-700">{s.sat.current}</td>
                <td className="py-3 text-ink-700">{s.nextDeadline}</td>
                <td className="py-3">
                  <span className="flex items-center gap-2">
                    <ProgressBar value={s.progress} />
                    <span className="text-[12px] font-semibold text-ink-700">{s.progress}%</span>
                  </span>
                </td>
                <td className="py-3 text-right">
                  <Link href={`/staff/students/${s.id}`} className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1.5 text-[13px] font-semibold text-brand-700 hover:bg-brand-200">
                    Student 360 <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
