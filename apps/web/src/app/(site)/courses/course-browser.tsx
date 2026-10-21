"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { classGroups, courseInfo } from "@/lib/mock/courses";
import { PillTabs } from "@/components/ui/choice";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink, buttonClass } from "@/components/ui/button";

const filters = ["All", "Foundation Math", "General English", "SAT", "IELTS", "Online", "Office"] as const;

export function CourseBrowser() {
  const [filter, setFilter] = useState<string>("All");

  const groups = useMemo(
    () =>
      classGroups.filter((g) =>
        filter === "All" ? true : filter === "Online" || filter === "Office" ? g.mode === filter : g.course === filter,
      ),
    [filter],
  );

  return (
    <div className="-mt-[60px] flex flex-col gap-6">
      <PillTabs options={filters} value={filter} onChange={setFilter} />

      {/* Recommended path strip */}
      <div className="glass flex flex-col gap-3 rounded-[22px] p-4 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-[13px] font-bold uppercase tracking-[1px] text-brand-600">Recommended path</p>
        <p className="flex items-center gap-2 text-[14px] font-semibold text-brand-900">
          Foundation Math <ArrowRight className="size-4 text-brand-600" aria-label="then" /> SAT
        </p>
        <p className="flex items-center gap-2 text-[14px] font-semibold text-brand-900">
          General English <ArrowRight className="size-4 text-brand-600" aria-label="then" /> IELTS
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          {groups.map((g) => {
            const full = g.seatsLeft === 0;
            return (
              <article key={g.id} className="glass flex flex-col gap-4 rounded-[28px] p-5 sm:flex-row sm:justify-between">
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[20px] font-bold text-brand-900">{g.title}</h2>
                    <Badge tone="neutral">{g.code}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={g.mode === "Office" ? "amber" : "sky"}>{g.mode === "Office" ? "Office · Tashkent" : "Online · live in 4Prep"}</Badge>
                    <Badge tone="neutral">Entry: {g.entry}</Badge>
                  </div>
                  <p className="text-[14px] text-ink-700">{g.schedule} · {g.weeks} weeks · starts {g.starts}</p>
                  <p className="flex items-center gap-2 text-[13px] text-ink-500">
                    <Avatar name={g.teacher} size={22} /> Teacher: {g.teacher}
                  </p>
                </div>
                <div className="flex flex-row items-end justify-between gap-2 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <p className="text-[24px] font-extrabold text-brand-900">${g.price}</p>
                    <p className="text-[12px] text-ink-500">Instalments available</p>
                    <Badge tone={full ? "neutral" : g.seatsLeft <= 4 ? "amber" : "green"} className="mt-2">
                      {full ? "Full · waiting list" : `${g.seatsLeft} seats left`}
                    </Badge>
                  </div>
                  {full ? (
                    <button type="button" className={buttonClass({ variant: "glass", size: "sm", className: "h-10 px-5" })}>
                      Join waiting list
                    </button>
                  ) : (
                    <Link href={`/courses/${g.id}/enrol`} className={buttonClass({ size: "sm", className: "h-10 px-6" })}>
                      Enrol
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
          <p className="rounded-[14px] bg-amber-soft px-4 py-3 text-[13px] text-amber-ink">
            Prices and groups are examples until the Academy provides the real class catalogue.
          </p>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="glass rounded-[28px] p-5">
            <span className="flex size-10 items-center justify-center rounded-[12px] bg-brand-100 text-brand-600">
              <Check className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-[17px] font-bold text-brand-900">Not sure of your level?</p>
            <p className="mt-1 text-[13px] text-ink-500">Take a short placement test inside the platform to join the right group before you pay.</p>
            <ButtonLink href="/register" variant="dark" className="mt-4 w-full">Take placement test</ButtonLink>
          </div>
          <div className="glass rounded-[28px] p-5">
            <p className="text-[17px] font-bold text-brand-900">How enrolment works</p>
            <ol className="mt-3 flex flex-col gap-3">
              {[
                "Choose a course and group",
                "Optional placement test",
                "Sign the class agreement and pay",
                "After signing and payment, your class appears in your dashboard; parent access if under 18.",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-[13.5px] text-ink-700">
                  <span className="bg-brand-gradient flex size-6 shrink-0 items-center justify-center rounded-[8px] text-[12px] font-bold text-white">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="glass rounded-[28px] p-5">
            <p className="text-[17px] font-bold text-brand-900">The four courses</p>
            <ul className="mt-3 flex flex-col gap-3">
              {courseInfo.map((c) => (
                <li key={c.code} className="text-[13px] text-ink-700">
                  <span className="font-bold text-brand-900">{c.code}</span>
                  {c.leadsTo ? <span className="text-ink-500"> → {c.leadsTo}</span> : null}
                  <span className="block text-ink-500">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
