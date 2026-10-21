"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Info } from "lucide-react";
import { applySteps, type ApplyStepId } from "../steps";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { Button, buttonClass } from "@/components/ui/button";
import { StepBar } from "@/components/ui/progress";
import { Checkbox, ChoiceChips, Segmented } from "@/components/ui/choice";
import { Field, Input, Overline, Select, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/cn";

/**
 * Academy application wizard. Pre-filled from the plan and profile.
 * Submitting leads to a free consultation, not to enrolment or payment.
 */
export function ApplyStep({ step }: { step: ApplyStepId }) {
  const router = useRouter();
  const index = applySteps.findIndex((s) => s.id === step);
  const current = applySteps[index];
  const prev = index > 0 ? `/apply/${applySteps[index - 1].id}` : "/plan";
  const next = index < applySteps.length - 1 ? `/apply/${applySteps[index + 1].id}` : "/applicant";

  const [english, setEnglish] = useState("IELTS");
  const [sat, setSat] = useState("Not taken");
  const [countries, setCountries] = useState(["USA"]);
  const [interests, setInterests] = useState(["Admission support", "IELTS classes"]);
  const [channel, setChannel] = useState("Online");
  const [language, setLanguage] = useState("Uzbek");
  const [terms, setTerms] = useState(false);
  const [parentAgrees, setParentAgrees] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function goNext() {
    if (step === "consent" && (!terms || !parentAgrees)) {
      setError("Please accept the Terms and confirm your parent knows about this application.");
      return;
    }
    setError(null);
    router.push(next);
  }

  return (
    <section className="glass mx-auto w-full max-w-[880px] rounded-[32px] p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Eyebrow>Join 4Prep Academy</Eyebrow>
        <p className="text-[12.5px] text-ink-500">
          Step {index + 1} of {applySteps.length} · {index === 0 ? "Pre-filled from your plan and profile" : "Takes about 2 minutes"}
        </p>
      </div>
      <StepBar total={applySteps.length} current={index + 1} />
      <ol className="mt-4 flex flex-wrap gap-2">
        {applySteps.map((s, i) => (
          <li key={s.id}>
            <Link
              href={`/apply/${s.id}`}
              aria-current={i === index ? "step" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-full border px-4 text-[13px] font-medium",
                i === index ? "border-brand-300 bg-brand-100 text-brand-800" : "border-ink-200 bg-white text-ink-700",
              )}
            >
              {i + 1} {s.label}
            </Link>
          </li>
        ))}
      </ol>
      <h1 className="mb-6 mt-6 text-[28px] font-extrabold tracking-[-0.8px] text-brand-900 sm:text-[32px]">{current.title}</h1>

      {step === "student" ? (
        <div className="flex flex-col gap-6">
          <Overline>Student</Overline>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name (as in passport)" htmlFor="fn"><Input id="fn" defaultValue="Aziza Karimova" /></Field>
            <Field label="Date of birth" htmlFor="dob"><Input id="dob" type="date" defaultValue="2009-05-12" /></Field>
            <Field label="Phone" htmlFor="ph" aside={<Badge>SMS-verified</Badge>}><Input id="ph" type="tel" defaultValue="+998 90 123 45 67" /></Field>
            <Field label="Telegram username (optional)" htmlFor="tg"><Input id="tg" defaultValue="@aziza" /></Field>
            <Field label="City" htmlFor="city"><Input id="city" defaultValue="Tashkent" /></Field>
            <Field label="School and current grade" htmlFor="school">
              <Select id="school" defaultValue="School 110 · Grade 11"><option>School 110 · Grade 11</option><option>School 110 · Grade 10</option></Select>
            </Field>
            <Field label="Applying for" htmlFor="deg" hint="Bachelor's / Master's / Transfer">
              <Select id="deg" defaultValue="Bachelor's"><option>Bachelor&apos;s</option><option>Master&apos;s</option><option>Transfer</option></Select>
            </Field>
            <Field label="Intake" htmlFor="intake" hint="Fall / Spring + year">
              <Select id="intake" defaultValue="Fall 2027"><option>Fall 2027</option><option>Spring 2028</option><option>Fall 2028</option></Select>
            </Field>
          </div>
          <Overline>Parent or guardian · required if under 18</Overline>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" htmlFor="pn"><Input id="pn" defaultValue="Dilfuza Karimova" /></Field>
            <Field label="Relationship" htmlFor="rel">
              <Select id="rel" defaultValue="Mother"><option>Mother</option><option>Father</option><option>Guardian</option></Select>
            </Field>
            <Field label="Phone" htmlFor="pph"><Input id="pph" type="tel" defaultValue="+998 91 555 12 34" /></Field>
            <Field label="Email" htmlFor="pem"><Input id="pem" type="email" defaultValue="parent@email.com" /></Field>
          </div>
        </div>
      ) : null}

      {step === "scores" ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Overline>English test</Overline>
            <Segmented label="English test" options={["IELTS", "TOEFL", "Duolingo", "Not taken yet"]} value={english} onChange={setEnglish} />
          </div>
          {english !== "Not taken yet" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Overall score" htmlFor="eo"><Input id="eo" defaultValue="5.5" inputMode="decimal" /></Field>
              <Field label="Test date" htmlFor="ed"><Input id="ed" type="date" defaultValue="2026-09-14" /></Field>
              <Field label="Type" htmlFor="et">
                <Select id="et" defaultValue="Official"><option>Official</option><option>Mock</option></Select>
              </Field>
            </div>
          ) : null}
          <p className="flex items-start gap-2 rounded-[14px] bg-sky-soft px-4 py-3 text-[13px] text-sky-ink">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            IELTS 6.5 or an accepted Duolingo/TOEFL equivalent is the usual requirement. Not there yet? You start on the test-prep path and continue later.
          </p>
          <div className="flex flex-col gap-2">
            <Overline>SAT · recommended</Overline>
            <Segmented label="SAT" options={["Taken", "Planned", "Not taken"]} value={sat} onChange={setSat} />
            {sat === "Taken" ? <Input aria-label="SAT score" placeholder="e.g. 1350" inputMode="numeric" /> : null}
            <p className="text-[12.5px] text-ink-500">SAT improves admission and scholarship chances; most of our students also need only IELTS.</p>
          </div>
        </div>
      ) : null}

      {step === "destinations" ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Overline>Destinations · {countries.length} selected</Overline>
            <ChoiceChips options={["USA", "Canada", "Germany", "Czechia", "Latvia", "Poland", "Italy"]} value={countries} onChange={setCountries} />
            <p className="text-[12.5px] text-ink-500">You can browse universities worldwide; these are the countries 4Prep applies to.</p>
          </div>
          <Field label="Universities you already like (optional)" htmlFor="likes" hint="Your mentor builds the final list with you.">
            <Textarea id="likes" placeholder="e.g. University of Toronto, TU Munich" />
          </Field>
        </div>
      ) : null}

      {step === "consent" ? (
        <div className="flex flex-col gap-6">
          <p className="text-[14px] text-ink-500">
            Confirm how you&apos;d like to connect, what you need help with, and how you&apos;d like to meet. Submitting leads to a free consultation — not enrolment or a paid agreement.
          </p>
          <div className="flex flex-col gap-2">
            <Overline>Interests</Overline>
            <ChoiceChips options={["Admission support", "IELTS classes", "SAT classes", "Visa support only"]} value={interests} onChange={setInterests} />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Overline>Preferred meeting</Overline>
              <Segmented label="Preferred meeting" options={["Online", "Tashkent office", "Phone"]} value={channel} onChange={setChannel} />
            </div>
            <div className="flex flex-col gap-2">
              <Overline>Meeting language</Overline>
              <Segmented label="Meeting language" options={["Uzbek", "Russian", "English"]} value={language} onChange={setLanguage} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Biggest worry or question right now (optional)" htmlFor="worry"><Textarea id="worry" /></Field>
            <Field label="How did you hear about us?" htmlFor="heard">
              <Select id="heard" defaultValue="Instagram"><option>Instagram</option><option>Telegram</option><option>Friend</option><option>School</option></Select>
            </Field>
          </div>
          <div className="flex flex-col gap-3 rounded-[16px] bg-white/70 p-4">
            <Overline>Consent</Overline>
            <Checkbox checked={terms} onChange={setTerms}>I agree to the Terms of use and Privacy Policy</Checkbox>
            <Checkbox checked={parentAgrees} onChange={setParentAgrees}>My parent knows about and agrees with this application (required under 18)</Checkbox>
          </div>
          <p className="text-[12.5px] text-ink-500">
            After submitting, choose a time for your free consultation. If you are under 18, a parent will sign the admission agreement separately later.
          </p>
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="mt-5 rounded-[12px] bg-coral-soft px-4 py-2.5 text-[13px] font-medium text-coral-ink">{error}</p>
      ) : null}

      <div className="mt-8 flex items-center justify-between">
        <Link href={prev} className={buttonClass({ variant: "glass" })}>Back</Link>
        <Button onClick={goNext}>{step === "consent" ? "Submit application" : "Continue"}</Button>
      </div>
    </section>
  );
}
