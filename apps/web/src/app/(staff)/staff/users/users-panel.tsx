"use client";

import { useState } from "react";
import { Send, UserPlus } from "lucide-react";
import { staff, families } from "@/lib/mock/people";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { PillTabs } from "@/components/ui/choice";

const roleTone: Record<string, BadgeTone> = {
  Mentor: "green",
  "Mentor Admin": "violet",
  Teacher: "amber",
  "Content Admin": "sky",
  "Super Admin": "dark",
};

const matrix: [string, ...string[]][] = [
  ["Plan and profile", "Own", "View child", "Assigned", "View assigned", "All", "—", "All"],
  ["Documents (files)", "Own", "Status only", "Assigned", "—", "All", "—", "All"],
  ["Essays (text)", "Review & approve", "Status only", "Write (assigned)", "—", "All", "—", "All"],
  ["Application statuses", "View own", "View child", "Edit assigned", "—", "Edit all", "—", "All"],
  ["Class attendance and scores", "View own", "View child", "View assigned", "Edit own classes", "View all", "—", "All"],
  ["Offers and discounts", "View own", "View child", "Create", "—", "Approve", "—", "All"],
  ["Payments", "Pay own", "Pay child's", "View status", "—", "View", "—", "Edit"],
  ["News and About page", "—", "—", "—", "—", "—", "Yes", "Yes"],
  ["Staff accounts and roles", "—", "—", "—", "—", "—", "—", "Yes"],
  ["Parent accounts", "—", "—", "—", "—", "Create, link", "—", "Create, link"],
  ["Audit log", "—", "—", "—", "—", "View", "—", "Yes"],
];
const roles = ["Student", "Parent", "Mentor", "Teacher", "Mentor Admin", "Content Admin", "Super Admin"];

const loginTone = { Active: "green", Sent: "sky", "Not created": "neutral" } as const;

export function UsersPanel() {
  const [tab, setTab] = useState("Staff accounts");
  const [fams, setFams] = useState(families);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PillTabs options={["Staff accounts", "Families"]} value={tab} onChange={setTab} />
        <Button>
          <UserPlus className="size-4" aria-hidden /> {tab === "Families" ? "Create parent login" : "Add staff member"}
        </Button>
      </div>

      {tab === "Staff accounts" ? (
        <section className="glass overflow-x-auto rounded-[28px] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-brand-900">Staff accounts</h2>
            <span className="text-[12.5px] text-ink-500">Sessions expire after 12 hours</span>
          </div>
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead>
              <tr className="text-[11.5px] uppercase tracking-[1px] text-ink-500">
                <th className="pb-2 font-semibold">Name</th>
                <th className="pb-2 font-semibold">Roles</th>
                <th className="pb-2 font-semibold">2FA</th>
                <th className="pb-2 font-semibold">Last login</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.name} className="border-t border-ink-100">
                  <td className="py-3"><span className="flex items-center gap-3 font-bold text-brand-900"><Avatar name={s.name} size={32} /> {s.name}</span></td>
                  <td className="py-3"><span className="flex flex-wrap gap-1.5">{s.roles.map((r) => <Badge key={r} tone={roleTone[r]}>{r}</Badge>)}</span></td>
                  <td className="py-3"><Badge tone={s.twoFactor ? "green" : "amber"}>{s.twoFactor ? "On" : "Not set up"}</Badge></td>
                  <td className="py-3 text-ink-700">{s.lastLogin}</td>
                  <td className="py-3"><Badge tone={s.status === "Active" ? "green" : "amber"}>{s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="glass overflow-x-auto rounded-[28px] p-5 sm:p-6">
          <div className="mb-4">
            <h2 className="text-[20px] font-bold text-brand-900">Families</h2>
            <p className="text-[13px] text-ink-500">Create parent logins, send them by SMS or Telegram, and assign the mentor and teachers.</p>
          </div>
          <table className="w-full min-w-[860px] text-left text-[14px]">
            <thead>
              <tr className="text-[11.5px] uppercase tracking-[1px] text-ink-500">
                <th className="pb-2 font-semibold">Student</th>
                <th className="pb-2 font-semibold">Parent</th>
                <th className="pb-2 font-semibold">Phone</th>
                <th className="pb-2 font-semibold">Login</th>
                <th className="pb-2 font-semibold">Mentor</th>
                <th className="pb-2 font-semibold">Teachers</th>
                <th className="pb-2 font-semibold"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {fams.map((f, i) => (
                <tr key={f.student} className="border-t border-ink-100">
                  <td className="py-3 font-bold text-brand-900">{f.student}</td>
                  <td className="py-3 text-ink-700">{f.parent}</td>
                  <td className="py-3 text-ink-700">{f.phone}</td>
                  <td className="py-3"><Badge tone={loginTone[f.login]}>{f.login}</Badge></td>
                  <td className="py-3">
                    <select aria-label={`Mentor for ${f.student}`} defaultValue={f.mentor} className="rounded-[10px] border border-ink-200 bg-white px-2 py-1.5 text-[13px]">
                      <option>Madina S.</option><option>Rustam K.</option><option>Sevara A.</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <select aria-label={`Teacher for ${f.student}`} defaultValue={f.teachers} className="rounded-[10px] border border-ink-200 bg-white px-2 py-1.5 text-[13px]">
                      <option>—</option><option>Ms. Rakhimova</option><option>Mr. Nazarov</option>
                    </select>
                  </td>
                  <td className="py-3 text-right">
                    {f.login === "Not created" ? (
                      <Button size="sm" variant="soft" onClick={() => setFams((all) => all.map((x, j) => (j === i ? { ...x, login: "Sent" } : x)))}>
                        Create login
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setFams((all) => all.map((x, j) => (j === i ? { ...x, login: "Sent" } : x)))}>
                        <Send className="size-3.5" aria-hidden /> Send via SMS / Telegram
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="glass overflow-x-auto rounded-[28px] p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[20px] font-bold text-brand-900">Permissions matrix</h2>
          <span className="text-[12.5px] text-ink-500">Own · Assigned · All · View · —</span>
        </div>
        <table className="w-full min-w-[900px] text-left text-[13px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.8px] text-ink-500">
              <th className="pb-2 font-semibold">Capability</th>
              {roles.map((r) => <th key={r} className="pb-2 font-semibold">{r}</th>)}
            </tr>
          </thead>
          <tbody>
            {matrix.map(([cap, ...cells]) => (
              <tr key={cap} className="border-t border-ink-100">
                <th scope="row" className="py-2.5 font-semibold text-brand-900">{cap}</th>
                {cells.map((c, i) => <td key={i} className={c === "—" ? "py-2.5 text-ink-300" : "py-2.5 text-ink-700"}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
