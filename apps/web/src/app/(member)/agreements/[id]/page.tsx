import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { offers, getOffer } from "@/lib/mock/agreements";
import { Blobs } from "@/components/ui/blobs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/layout/page-header";
import { SignPanel } from "./sign-panel";

export function generateStaticParams() {
  return offers.map((o) => ({ id: o.id }));
}

export const metadata: Metadata = { title: "Offer and agreement" };

export default async function AgreementPage({ params }: PageProps<"/agreements/[id]">) {
  const { id } = await params;
  const offer = getOffer(id);
  if (!offer) notFound();

  return (
    <div className="relative isolate flex-1 pb-16 pt-[120px] lg:pt-[140px]">
      <Blobs />
      <Container className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[32px] font-extrabold tracking-[-1px] text-brand-900 sm:text-[42px]">{offer.title}</h1>
            <p className="mt-1 text-[15px] text-ink-500">{offer.subtitle}</p>
          </div>
          <Badge tone="amber">Terms to confirm</Badge>
        </div>
        <ol className="flex gap-2">
          {["1 · Offer", "2 · Sign", "3 · Pay"].map((s, i) => (
            <li key={s} className={i === 0 ? "bg-brand-gradient rounded-full px-4 py-2 text-[13px] font-semibold text-white" : "rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink-700"}>
              {s}
            </li>
          ))}
        </ol>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader title="What is included" />
              <ul className="flex flex-col gap-3">
                {offer.included.map((it) => (
                  <li key={it.title} className="flex flex-col gap-3 rounded-[18px] bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={it.tag === "Package" || it.tag === "Class" ? "green" : "sky"}>{it.tag}</Badge>
                        <span className="text-[15px] font-bold text-brand-900">{it.title}</span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-5 text-ink-500">{it.text}</p>
                    </div>
                    <p className="shrink-0 text-[17px] font-extrabold text-brand-900">{it.price}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-[14px] bg-amber-soft px-4 py-3 text-[13px] text-amber-ink">
                Price to be confirmed. Payment plan to be confirmed before signing and payment.
              </p>
            </Card>
            <SignPanel offer={offer} />
          </div>
          <aside className="h-fit">
            <Card>
              <CardHeader title="Payment" />
              <dl className="flex flex-col gap-2">
                {[
                  ["Package price", "To confirm"],
                  ["Payment plan", "To confirm"],
                  ["Next after payment", offer.kind === "Admission package" ? "Profile + docs" : "Class starts"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between rounded-[14px] bg-white/75 px-3.5 py-3 text-[14px]">
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="font-bold text-brand-900">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[12.5px] leading-5 text-ink-500">
                After terms are confirmed, sign and pay. The signed PDF records the signer, time, IP and document hash. Payments are final — there are no refunds.
              </p>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
}
