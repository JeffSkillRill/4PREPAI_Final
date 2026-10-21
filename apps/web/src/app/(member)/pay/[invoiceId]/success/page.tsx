import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, FileText, Users, UserRound } from "lucide-react";
import { offers, getOfferByInvoice } from "@/lib/mock/agreements";
import { Blobs } from "@/components/ui/blobs";
import { ButtonLink } from "@/components/ui/button";

export function generateStaticParams() {
  return offers.map((o) => ({ invoiceId: o.invoiceId }));
}

export const metadata: Metadata = { title: "Payment success" };

export default async function PaymentSuccess({ params }: PageProps<"/pay/[invoiceId]/success">) {
  const { invoiceId } = await params;
  const offer = getOfferByInvoice(invoiceId);
  if (!offer) notFound();
  const first = offer.student.split(" ")[0];

  const next = [
    { icon: Users, title: "Mentor coordination", text: "After profile and document review, 4Prep opens and manages your application accounts." },
    { icon: UserRound, title: "Parent access", text: "If you are under 18, your parent's login is created by 4Prep after your profile is completed." },
    { icon: FileText, title: "Next steps", text: "Personal information · Transcript · Passport · Document checklist" },
  ];

  return (
    <div className="relative isolate flex flex-1 items-center justify-center px-4 pb-16 pt-[120px] lg:pt-[140px]">
      <Blobs />
      <section className="glass w-full max-w-[620px] rounded-[32px] p-6 text-center sm:p-10">
        <span className="bg-brand-gradient mx-auto flex size-16 items-center justify-center rounded-full text-white shadow-glow">
          <Check className="size-8" aria-hidden />
        </span>
        <h1 className="mt-5 text-[28px] font-extrabold tracking-[-0.8px] text-brand-900">Payment received, {first}</h1>
        <p className="mt-2 text-[14px] text-ink-500">
          Example state — shown after the bank confirms payment; your receipt is issued then.
        </p>
        <ul className="mt-6 flex flex-col gap-3 text-left">
          {next.map((n) => (
            <li key={n.title} className="flex gap-3 rounded-[18px] bg-white/80 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-brand-100 text-brand-600">
                <n.icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-[14px] font-bold text-brand-900">{n.title}</span>
                <span className="block text-[13px] text-ink-500">{n.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <ButtonLink href="/app" className="mt-6">Go to my dashboard</ButtonLink>
      </section>
    </div>
  );
}
