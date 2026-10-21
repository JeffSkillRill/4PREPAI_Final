import type { Metadata } from "next";
import { FileText, Search } from "lucide-react";
import { products, payments } from "@/lib/mock/staff";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { DestinationToggles } from "./destination-toggles";

export const metadata: Metadata = { title: "Products & payments" };

const typeTone: Record<string, BadgeTone> = { Package: "green", Class: "sky", "Add-on": "amber" };
const payTone: Record<string, BadgeTone> = { Paid: "green", Overdue: "amber", Failed: "coral", Pending: "neutral" };

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products & payments"
        subtitle="Packages, classes, add-ons, instalment rules, invoices and agreement templates."
        actions={
          <>
            <label className="glass flex h-11 items-center gap-2 rounded-full px-4">
              <Search className="size-4 text-ink-500" aria-hidden />
              <span className="sr-only">Search</span>
              <input placeholder="Search…" className="w-28 bg-transparent text-[14px] outline-none placeholder:text-ink-500" />
            </label>
            <Button variant="glass">Export for accounting</Button>
            <Button>New product</Button>
          </>
        }
      />
      <div className="flex flex-col gap-6">
        <Card className="overflow-x-auto">
          <CardHeader title="Product catalogue" />
          <table className="w-full min-w-[760px] text-left text-[14px]">
            <thead>
              <tr className="text-[11.5px] uppercase tracking-[1px] text-ink-500">
                <th className="pb-2 font-semibold">Product</th>
                <th className="pb-2 font-semibold">Type</th>
                <th className="pb-2 text-right font-semibold">Price (UZS)</th>
                <th className="pb-2 text-right font-semibold">Price (USD)</th>
                <th className="pb-2 pl-6 font-semibold">Instalments</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name} className="border-t border-ink-100">
                  <td className="py-3 font-bold text-brand-900">{p.name}</td>
                  <td className="py-3"><Badge tone={typeTone[p.type]}>{p.type}</Badge></td>
                  <td className="py-3 text-right tabular-nums text-ink-700">{p.uzs}</td>
                  <td className="py-3 text-right tabular-nums text-ink-700">{p.usd}</td>
                  <td className="py-3 pl-6 text-ink-700">{p.parts}</td>
                  <td className="py-3"><Badge tone={p.status === "Active" ? "green" : "neutral"}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 w-fit rounded-[12px] bg-amber-soft px-3 py-2 text-[12.5px] text-amber-ink">Example prices until the Academy provides the real list.</p>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <Card>
            <CardHeader title="Payments" subtitle="Card payments arrive through J.P. Morgan; status updates come from the bank's server notification." />
            <ul className="flex flex-col gap-2">
              {payments.map((p) => (
                <li key={p.who} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-[14px] bg-white/80 px-3.5 py-3 text-[14px]">
                  <span>
                    <span className="block font-bold text-brand-900">{p.who}</span>
                    <span className="block text-[12px] text-ink-500">{p.method}</span>
                  </span>
                  <span className="font-bold tabular-nums text-brand-900">{p.amount}</span>
                  <Badge tone={payTone[p.status]}>{p.status}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12.5px] text-ink-500">Illustrative transactions, not actual receipts. Payments are final; there is no refund function.</p>
          </Card>
          <Card>
            <CardHeader title="Agreement templates" />
            <ul className="flex flex-col gap-2">
              {[
                ["Services agreement v3", "Active · auto-filled from offer"],
                ["Class agreement v2", "Active · e-signature by SMS code"],
              ].map(([t, s]) => (
                <li key={t} className="flex items-center gap-3 rounded-[14px] bg-white/80 px-3.5 py-3">
                  <FileText className="size-5 text-brand-600" aria-hidden />
                  <span>
                    <span className="block text-[14px] font-bold text-brand-900">{t}</span>
                    <span className="block text-[12px] text-ink-500">{s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card>
          <CardHeader title="Admission rules" subtitle="These rules decide when a student meets the English requirement. Missing equivalent minimums send the file to mentor review." />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["IELTS minimum", "6.5"],
              ["Duolingo minimum", "Not configured"],
              ["TOEFL minimum", "Not configured"],
            ].map(([k, v]) => (
              <label key={k} className="flex flex-col gap-2 text-[13px] font-semibold text-ink-700">
                {k}
                <input defaultValue={v} className="h-12 rounded-[14px] border border-ink-200 bg-white px-4 text-[15px] font-normal text-brand-900" />
              </label>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-ink-500">SAT is recommended and does not block the application path once English is met.</p>
        </Card>

        <Card>
          <CardHeader title="Destinations" subtitle="Academy destination list. These settings do not restrict worldwide university browsing." />
          <DestinationToggles />
        </Card>
      </div>
    </>
  );
}
