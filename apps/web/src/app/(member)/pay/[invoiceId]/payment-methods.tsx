"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, CheckCircle2, Circle, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/*
 * Payment methods. Online card payments go through J.P. Morgan's hosted
 * checkout (spec §12.3); card details never reach 4Prep servers. Until
 * J.P. Morgan installs its system, "Pay" simulates a successful checkout.
 */
const methods = [
  { id: "card", title: "Card payment", note: "Secure checkout by J.P. Morgan", icon: CreditCard },
  { id: "bank", title: "Bank transfer", note: "For companies · confirmed manually", icon: Building2 },
] as const;

export function PaymentMethods({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("card");
  const [paying, setPaying] = useState(false);

  return (
    <section className="glass rounded-[28px] p-5 sm:p-6">
      <h2 className="mb-4 text-[20px] font-bold text-brand-900">Choose a payment method</h2>
      <div role="radiogroup" aria-label="Payment method" className="flex flex-col gap-3">
        {methods.map((m) => {
          const on = method === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setMethod(m.id)}
              className={cn(
                "flex items-center gap-4 rounded-[18px] border-2 bg-white p-4 text-left transition-colors",
                on ? "border-brand-500" : "border-transparent hover:border-brand-200",
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-[12px] bg-brand-100 text-brand-600">
                <m.icon className="size-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-[15px] font-bold text-brand-900">{m.title}</span>
                <span className="block text-[12.5px] text-ink-500">{m.note}</span>
              </span>
              {on ? <CheckCircle2 className="size-6 text-brand-600" aria-hidden /> : <Circle className="size-6 text-ink-200" aria-hidden />}
            </button>
          );
        })}
      </div>
      <p className="mt-4 flex items-start gap-2 text-[12.5px] text-ink-500">
        <Lock className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
        Card details are entered on the bank&apos;s secure page. 4Prep never sees or stores card data. You return to 4Prep automatically.
      </p>
      <Button
        size="lg"
        className="mt-5 w-full"
        disabled={paying}
        onClick={() => {
          setPaying(true);
          setTimeout(() => router.push(`/pay/${invoiceId}/success`), 900);
        }}
      >
        {paying ? "Opening secure checkout…" : method === "card" ? "Pay securely" : "Show bank details"}
      </Button>
    </section>
  );
}
