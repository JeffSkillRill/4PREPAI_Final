"use client";

import { useMemo, useState } from "react";
import { FileText, Pencil, Plus, X } from "lucide-react";
import { universities } from "@/lib/mock/universities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UniLogo } from "@/components/ui/avatar";
import { PillTabs, Toggle } from "@/components/ui/choice";
import { cn } from "@/lib/cn";

const statusOf: Record<string, "Published" | "Draft" | "Needs review"> = {
  "nyu-abu-dhabi": "Draft",
  "university-of-michigan": "Needs review",
};

const partners = [
  { name: "IELTS Test Center", category: "Testing center", benefit: "Discounted exam seats", status: "Active", since: "2023" },
  { name: "Language Hub", category: "Language school", benefit: "15% off courses", status: "Active", since: "2024" },
  { name: "Visa Partner Co.", category: "Visa & legal", benefit: "Free document check", status: "Active", since: "2024" },
  { name: "Housing Abroad", category: "Housing", benefit: "Accommodation booking", status: "Pending", since: "2026" },
];

export function CatalogueEditor() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(universities[0].slug);
  const [tab, setTab] = useState("Documents");
  const [docs, setDocs] = useState([
    { name: "Passport copy", required: true },
    { name: "Official transcript (translated)", required: true },
    { name: "IELTS test report (TRF)", required: true },
    { name: "Personal statement", required: true },
    { name: "Teacher recommendation letter", required: false },
    { name: "Bank statement / proof of funds", required: false },
  ]);
  const [visible, setVisible] = useState(true);

  const rows = useMemo(
    () => universities.filter((u) => filter === "All" || u.country === filter),
    [filter],
  );
  const current = universities.find((u) => u.slug === selected) ?? universities[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="glass overflow-x-auto rounded-[28px] p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <PillTabs options={["All", "Canada", "USA", "UK", "Germany", "South Korea"]} value={filter} onChange={setFilter} />
            <span className="text-[13px] font-semibold text-brand-600">{universities.length} total</span>
          </div>
          <table className="w-full min-w-[620px] text-left text-[14px]">
            <thead>
              <tr className="text-[11.5px] uppercase tracking-[1px] text-ink-500">
                <th className="pb-2 font-semibold">University</th>
                <th className="pb-2 font-semibold">Country</th>
                <th className="pb-2 font-semibold">Agreement</th>
                <th className="pb-2 font-semibold">Deadline</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => {
                const st = statusOf[u.slug] ?? "Published";
                return (
                  <tr
                    key={u.slug}
                    onClick={() => setSelected(u.slug)}
                    className={cn("cursor-pointer border-t border-ink-100 hover:bg-white/60", selected === u.slug && "bg-white/80")}
                  >
                    <td className="py-2.5">
                      <button type="button" className="flex items-center gap-3 text-left font-bold text-brand-900" aria-pressed={selected === u.slug}>
                        <UniLogo code={u.code} size={34} className="rounded-[10px]" /> {u.name}
                      </button>
                    </td>
                    <td className="py-2.5 text-ink-700">{u.country}</td>
                    <td className="py-2.5"><Badge tone={u.slug === "university-of-michigan" ? "neutral" : "green"}>{u.slug === "university-of-michigan" ? "None" : "Direct"}</Badge></td>
                    <td className="py-2.5 text-ink-700">{u.deadline}</td>
                    <td className="py-2.5"><Badge tone={st === "Published" ? "green" : st === "Draft" ? "neutral" : "amber"}>{st}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="glass h-fit rounded-[28px] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-brand-900">Edit university</h2>
            <Badge>{statusOf[current.slug] ?? "Published"}</Badge>
          </div>
          <PillTabs options={["Overview", "Requirements", "Documents", "Deadlines"]} value={tab} onChange={setTab} />
          <p className="mb-3 mt-5 text-[11.5px] font-semibold uppercase tracking-[1px] text-ink-500">
            {tab} — {current.name}
          </p>
          {tab === "Documents" ? (
            <ul className="flex flex-col gap-2">
              {docs.map((d, i) => (
                <li key={d.name} className="flex items-center gap-3 rounded-[14px] bg-white/85 px-3.5 py-3">
                  <FileText className="size-4 text-brand-600" aria-hidden />
                  <span className="flex-1 text-[14px] text-brand-900">{d.name}</span>
                  <button
                    type="button"
                    onClick={() => setDocs((all) => all.map((x, j) => (j === i ? { ...x, required: !x.required } : x)))}
                    aria-label={`Toggle required for ${d.name}`}
                  >
                    <Badge tone={d.required ? "green" : "neutral"}>{d.required ? "Required" : "Optional"}</Badge>
                  </button>
                  <button type="button" aria-label={`Remove ${d.name}`} onClick={() => setDocs((all) => all.filter((_, j) => j !== i))} className="text-ink-300 hover:text-coral-ink">
                    <X className="size-4" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setDocs((all) => [...all, { name: `New document ${all.length + 1}`, required: false }])}
                  className="flex w-full items-center justify-center gap-2 rounded-[14px] border-2 border-dashed border-brand-300 py-3 text-[14px] font-semibold text-brand-700 hover:bg-white/60"
                >
                  <Plus className="size-4" aria-hidden /> Add document
                </button>
              </li>
            </ul>
          ) : (
            <dl className="flex flex-col gap-2">
              {(tab === "Requirements" ? current.admissions.map((a) => [a.item, a.detail] as const) : current.keyFacts.map((f) => [f.label, f.value] as const)).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 rounded-[14px] bg-white/85 px-3.5 py-3 text-[13.5px]">
                  <dt className="text-ink-500">{k}</dt>
                  <dd className="text-right font-semibold text-brand-900">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[14px] font-semibold text-brand-900">Visible to students</span>
            <Toggle checked={visible} onChange={setVisible} label="Visible to students" />
          </div>
          <Button size="lg" className="mt-5 w-full">Save changes</Button>
        </section>
      </div>

      <section className="glass overflow-x-auto rounded-[28px] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-brand-900">Cooperation companies</h2>
          <Button variant="glass" size="sm">Add partner</Button>
        </div>
        <table className="w-full min-w-[640px] text-left text-[14px]">
          <thead>
            <tr className="text-[11.5px] uppercase tracking-[1px] text-ink-500">
              <th className="pb-2 font-semibold">Company</th>
              <th className="pb-2 font-semibold">Category</th>
              <th className="pb-2 font-semibold">Benefit</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 font-semibold">Since</th>
              <th className="pb-2"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.name} className="border-t border-ink-100">
                <td className="py-3 font-bold text-brand-900">{p.name}</td>
                <td className="py-3 text-ink-700">{p.category}</td>
                <td className="py-3 text-ink-700">{p.benefit}</td>
                <td className="py-3"><Badge tone={p.status === "Active" ? "green" : "amber"}>{p.status}</Badge></td>
                <td className="py-3 text-ink-500">{p.since}</td>
                <td className="py-3 text-right">
                  <button type="button" aria-label={`Edit ${p.name}`} className="rounded-[10px] bg-brand-50 p-2 text-brand-600 hover:bg-brand-100"><Pencil className="size-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
