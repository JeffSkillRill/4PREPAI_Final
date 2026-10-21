"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import type { Offer } from "@/lib/mock/agreements";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/choice";
import { Field, Input } from "@/components/ui/field";

/**
 * Click-to-sign (spec §12.2 step 4): review checkbox + typed full name +
 * 6-digit SMS code sent to the signer's verified phone.
 */
export function SignPanel({ offer }: { offer: Offer }) {
  const router = useRouter();
  const [reviewed, setReviewed] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const complete = reviewed && name.trim().length > 3 && code.every((c) => /\d/.test(c));

  function setDigit(i: number, v: string) {
    const d = v.replace(/\D/g, "").slice(-1);
    setCode((prev) => prev.map((c, j) => (j === i ? d : c)));
    if (d && i < 5) refs.current[i + 1]?.focus();
  }

  return (
    <section className="glass rounded-[28px] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[20px] font-bold text-brand-900">Agreement</h2>
        <Button variant="glass" size="sm">
          <Download className="size-4" aria-hidden /> Download preview
        </Button>
      </div>
      <div className="max-h-[300px] overflow-y-auto rounded-[18px] border border-ink-200 bg-white p-5 text-[13px] leading-6 text-ink-700">
        <p className="mb-3 font-bold text-brand-900">SERVICES AGREEMENT № {offer.number}</p>
        {offer.clauses.map((c) => (
          <p key={c} className="mb-3 last:mb-0">{c}</p>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <Checkbox checked={reviewed} onChange={setReviewed}>
          I have reviewed the agreement and accept the confirmed terms.
        </Checkbox>
        <Field label="Signer's full name (learner 18+ or parent if under 18)" htmlFor="signer">
          <Input id="signer" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your full name" />
        </Field>
        <fieldset>
          <legend className="mb-2 text-[13px] font-semibold text-ink-700">SMS code sent to the signer&apos;s phone</legend>
          <div className="flex gap-2">
            {code.map((c, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                value={c}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus();
                }}
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                className="size-12 rounded-[14px] border-2 border-brand-300 bg-white text-center text-[20px] font-bold text-brand-900 outline-none focus:border-brand-600 sm:size-14"
              />
            ))}
          </div>
        </fieldset>
        <Button size="lg" disabled={!complete} onClick={() => router.push(`/pay/${offer.invoiceId}`)}>
          Sign and continue to payment
        </Button>
      </div>
    </section>
  );
}
