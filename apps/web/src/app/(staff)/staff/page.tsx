import type { Metadata } from "next";
import Link from "next/link";
import { Award, Bell, CreditCard, Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { kpis, registrations, funnel, newApplications, meetingsToday } from "@/lib/mock/staff";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";
import { MonthlyBars, FunnelBars } from "@/components/charts";

export const metadata: Metadata = { title: "Staff overview" };

const kpiIcons = [Users, Sparkles, Award, CreditCard];
const statusTone: Record<string, BadgeTone> = { New: "green", "Consult booked": "sky", "Offer sent": "amber" };

export default function StaffOverview() {
  return (
    <>
      <PageHeader
        title="Good morning, Jahongir"
        subtitle="Business dashboard — sign-ups, plans, applications, students, revenue"
        actions={
          <>
            <label className="glass flex h-11 items-center gap-2 rounded-full px-4">
              <Search className="size-4 text-ink-500" aria-hidden />
              <span className="sr-only">Search</span>
              <input placeholder="Search students, posts…" className="w-40 bg-transparent text-[14px] outline-none placeholder:text-ink-500" />
            </label>
            <button type="button" aria-label="Notifications" className="glass flex size-11 items-center justify-center rounded-full text-brand-800">
              <Bell className="size-5" />
            </button>
            <ButtonLink href="/staff/results">New post</ButtonLink>
          </>
        }
      />
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k, i) => {
            const Icon = kpiIcons[i];
            return (
              <Card key={k.label}>
                <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-[14px] text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-4 text-[14px] text-ink-500">{k.label}</p>
                <p className="mt-1 text-[32px] font-extrabold tracking-[-1px] text-brand-900">{k.value}</p>
                <p className="mt-1 flex items-center gap-1 text-[12.5px] font-semibold text-brand-600">
                  <TrendingUp className="size-3.5" aria-hidden /> {k.delta}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
          <Card>
            <CardHeader title="New registrations" subtitle="Accounts created per month" action={<span className="text-[13px] font-semibold text-brand-600">Last 8 months</span>} />
            <MonthlyBars data={registrations} label="New registrations per month, March to October: peaked at 390 in September; 310 in October so far." />
          </Card>
          <Card>
            <CardHeader title="Student funnel" subtitle="From sign-up to paid student" />
            <FunnelBars data={funnel} label="Student funnel" />
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
          <Card>
            <CardHeader title="New Academy applications" action={<Link href="/staff/pipeline" className="text-[13px] font-semibold text-brand-600">Open pipeline</Link>} />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-[14px]">
                <thead>
                  <tr className="text-[11.5px] uppercase tracking-[1px] text-ink-500">
                    <th className="pb-2 font-semibold">Student</th>
                    <th className="pb-2 font-semibold">Target</th>
                    <th className="pb-2 font-semibold">Format</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {newApplications.map((a) => (
                    <tr key={a.name} className="border-t border-ink-100">
                      <td className="py-3">
                        <span className="flex items-center gap-3 font-bold text-brand-900"><Avatar name={a.name} size={32} /> {a.name}</span>
                      </td>
                      <td className="py-3 text-ink-700">{a.target}</td>
                      <td className="py-3 text-ink-700">{a.format}</td>
                      <td className="py-3"><Badge tone={statusTone[a.status] ?? "neutral"}>{a.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <CardHeader title="Meetings today" action={<span className="text-[13px] font-semibold text-brand-600">Wed, Oct 21</span>} />
            <ul className="flex flex-col gap-2.5">
              {meetingsToday.map((m) => (
                <li key={m.time} className="flex items-center gap-3 rounded-[16px] bg-white/80 p-3">
                  <span className="rounded-[10px] bg-brand-100 px-2.5 py-1.5 text-[14px] font-bold text-brand-800">{m.time}</span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-bold text-brand-900">{m.who}</span>
                    <span className="block text-[12.5px] text-ink-500">{m.what}</span>
                  </span>
                  <Badge>Confirmed</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
