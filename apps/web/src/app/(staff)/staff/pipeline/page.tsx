import type { Metadata } from "next";
import Link from "next/link";
import { students } from "@/lib/mock/people";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Applicants pipeline" };

const columns = [
  { name: "New application", ids: ["dilnoza-rahimova"] },
  { name: "Consultation booked", ids: [] },
  { name: "Test prep", ids: ["aziza-karimova"] },
  { name: "Agreement & payment", ids: [] },
  { name: "Documents", ids: [] },
  { name: "Application accounts", ids: [] },
  { name: "Applications", ids: ["jasur-aliyev"] },
  { name: "Offers", ids: [] },
  { name: "Visa", ids: [] },
  { name: "Departed", ids: [] },
];

/*
 * Mentor Admin pipeline: one column per student stage (spec §3.2).
 * Horizontal scroll keeps all stages visible on desktop; drag-to-move
 * arrives with the API (POST /staff/pipeline/move).
 */
export default function PipelinePage() {
  return (
    <>
      <PageHeader title="Applicants pipeline" subtitle="Free consultation to departure · each sample applicant appears once" />
      <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="flex min-w-max gap-4">
          {columns.map((col) => {
            const items = students.filter((s) => (col.ids as string[]).includes(s.id));
            return (
              <section key={col.name} aria-label={col.name} className="glass w-[260px] shrink-0 rounded-[24px] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[14px] font-bold text-brand-900">{col.name}</h2>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[12px] font-semibold text-ink-500">{items.length}</span>
                </div>
                {items.length ? (
                  <ul className="flex flex-col gap-3">
                    {items.map((s) => (
                      <li key={s.id}>
                        <Link href={`/staff/students/${s.id}`} className="block rounded-[18px] bg-white p-3.5 shadow-soft hover:ring-2 hover:ring-brand-300">
                          <span className="flex items-center gap-2.5">
                            <Avatar name={s.name} size={32} />
                            <span className="text-[14px] font-bold text-brand-900">{s.name}</span>
                          </span>
                          <span className="mt-2 block text-[12px] text-ink-500">{s.degree} · {s.intake} · {s.destinations}</span>
                          <span className="mt-2 flex flex-wrap gap-1.5">
                            <Badge tone={s.english.met ? "green" : "amber"}>{s.english.test} {s.english.current}</Badge>
                            <Badge tone="sky">SAT {s.sat.current}</Badge>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-[14px] border border-dashed border-ink-200 p-3 text-center text-[12.5px] text-ink-500">No applicants</p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
