import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { offers, getOfferByInvoice } from "@/lib/mock/agreements";
import { Blobs } from "@/components/ui/blobs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/layout/page-header";
import { PaymentMethods } from "./payment-methods";

export function generateStaticParams() {
  return offers.map((o) => ({ invoiceId: o.invoiceId }));
}

export const metadata: Metadata = { title: "Payment" };

export default async function PayPage({ params }: PageProps<"/pay/[invoiceId]">) {
  const { invoiceId } = await params;
  const offer = getOfferByInvoice(invoiceId);
  if (!offer) notFound();

  return (
    <div className="relative isolate flex-1 pb-16 pt-[120px] lg:pt-[140px]">
      <Blobs />
      <Container className="flex flex-col gap-6">
        <h1 className="text-[32px] font-extrabold tracking-[-1px] text-brand-900 sm:text-[42px]">
          Confirm your {offer.kind.toLowerCase()}
        </h1>
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            <PaymentMethods invoiceId={invoiceId} />
            <Card>
              <CardHeader title={`${offer.kind} · ${offer.student}`} action={<span className="text-[12px] text-ink-500">Example invoice · terms pending</span>} />
              <dl className="flex flex-col gap-2">
                {[
                  ["Package", offer.included[0].title, "Price to be confirmed"],
                  ["Plan", "Payment terms", "To be confirmed"],
                  ["Agreement", `№ ${offer.number}`, "Signed"],
                ].map(([k, a, b]) => (
                  <div key={k} className="grid grid-cols-[100px_1fr_auto] items-center gap-3 rounded-[14px] bg-white/75 px-3.5 py-3 text-[13.5px]">
                    <dt className="font-bold text-brand-900">{k}</dt>
                    <dd className="truncate text-ink-500">{a}</dd>
                    <Badge tone={b === "Signed" ? "green" : "amber"}>{b}</Badge>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
          <aside className="flex flex-col gap-6">
            <Card>
              <p className="text-[13px] text-ink-500">{offer.kind} · {offer.student}</p>
              <p className="mt-2 text-[34px] font-extrabold leading-tight tracking-[-1px] text-brand-900">Price to be confirmed</p>
              <p className="mt-1 text-[13px] text-ink-500">Payment plan to be confirmed</p>
              <p className="mt-4 text-[12.5px] leading-5 text-ink-500">
                Payment is confirmed by the bank&apos;s server notification, not by the browser redirect. Payments are final — 4Prep does not offer refunds.
              </p>
            </Card>
            <Card>
              <p className="text-[16px] font-bold text-brand-900">After confirmed payment</p>
              <ul className="mt-3 flex flex-col gap-2 text-[13.5px] text-ink-700">
                {["Complete personal information", "Upload passport and transcript", "Mentor coordination after document review", "Parent access if under 18"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="size-4 text-brand-600" aria-hidden /> {t}</li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
}
