"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { StepBar } from "@/components/ui/progress";
import { Button, buttonClass } from "@/components/ui/button";
import { ChoiceChips, Segmented } from "@/components/ui/choice";
import { Field, Input, Overline, Select } from "@/components/ui/field";
import { useWizard } from "../wizard-state";
import { steps, type StepId } from "../steps";


const majorsCatalogue = ["Computer Science", "Data Science", "Business", "Economics", "Engineering", "Medicine", "Not sure yet"];

export function WizardStep({ step }: { step: StepId }) {
  const router = useRouter();
  const { answers, update } = useWizard();
  const index = steps.findIndex((s) => s.id === step);
  const current = steps[index];
  const prev = index > 0 ? `/plan/new/${steps[index - 1].id}` : "/register";
  const next = index < steps.length - 1 ? `/plan/new/${steps[index + 1].id}` : "/plan/new/building";
  const canSkip = index >= 2;

  return (
    <section className="glass w-full max-w-[540px] rounded-[32px] p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <Logo size="sm" />
        <p className="text-[12.5px] text-ink-500">
          Step {index + 1} of {steps.length} · About 3 minutes · Saved automatically
        </p>
      </div>
      <StepBar total={steps.length} current={index + 1} />
      <h1 className="mb-6 mt-7 text-[32px] font-extrabold tracking-[-1px] text-brand-900">{current.title}</h1>

      <div className="flex flex-col gap-5">
        {step === "about" ? (
          <>
            <div className="flex flex-col gap-2">
              <Overline>Who is this plan for?</Overline>
              <Segmented label="Who is this plan for?" options={["Me", "My child"]} value={answers.forWhom} onChange={(v) => update({ forWhom: v })} />
            </div>
            <Field label="Current school year or graduation year" htmlFor="schoolYear">
              <Select id="schoolYear" value={answers.schoolYear} onChange={(e) => update({ schoolYear: e.target.value })}>
                {["Grade 10 · 2028", "Grade 11 · 2027", "Grade 12 · 2026", "Graduated", "University student"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Country of citizenship" htmlFor="citizenship">
                <Select id="citizenship" value={answers.citizenship} onChange={(e) => update({ citizenship: e.target.value })}>
                  {["Uzbekistan", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Other"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </Select>
              </Field>
              <Field label="City" htmlFor="city">
                <Input id="city" placeholder="Tashkent" value={answers.city} onChange={(e) => update({ city: e.target.value })} />
              </Field>
            </div>
          </>
        ) : null}

        {step === "goal" ? (
          <>
            <div className="flex flex-col gap-2">
              <Overline>Degree level</Overline>
              <Segmented label="Degree level" options={["Bachelor", "Master", "Foundation"]} value={answers.degree} onChange={(v) => update({ degree: v })} />
            </div>
            <div className="flex flex-col gap-2">
              <Overline>When do you want to start?</Overline>
              <Segmented label="Start" options={["Fall 2027", "Spring 2028", "Fall 2028"]} value={answers.start} onChange={(v) => update({ start: v })} />
            </div>
            <div className="flex flex-col gap-2">
              <Overline>Up to 3 majors</Overline>
              <div className="relative">
                <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden />
                <Input aria-label="Search a major" placeholder="Search a major" className="pl-12" />
              </div>
              <ChoiceChips options={majorsCatalogue} value={answers.majors} onChange={(v) => update({ majors: v })} max={3} />
            </div>
          </>
        ) : null}

        {step === "destination" ? (
          <>
            <div className="flex flex-col gap-2">
              <Overline>Countries you are interested in</Overline>
              <ChoiceChips
                options={["Canada", "Germany", "South Korea", "UK", "USA", "UAE", "Italy", "Open to anywhere"]}
                value={answers.countries}
                onChange={(v) => update({ countries: v })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Overline>Yearly budget for tuition and living</Overline>
              <ChoiceChips
                options={["Under $5k", "$5–15k", "$15–30k", "$30–50k", "$50k+"]}
                value={[answers.budget]}
                onChange={(v) => update({ budget: v.at(-1) ?? answers.budget })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Overline>Do you need a scholarship?</Overline>
              <Segmented label="Scholarship" options={["Essential", "Helpful", "No"]} value={answers.scholarship} onChange={(v) => update({ scholarship: v })} />
            </div>
          </>
        ) : null}

        {step === "academics" ? (
          <>
            <div className="flex flex-col gap-2">
              <Overline>Grade average and its scale</Overline>
              <Segmented label="Grade scale" options={["5-point", "100-point", "4.0 GPA"]} value={answers.gradeScale} onChange={(v) => update({ gradeScale: v })} />
              <Input aria-label="Grade average" value={answers.gradeAverage} onChange={(e) => update({ gradeAverage: e.target.value })} inputMode="decimal" />
            </div>
            <div className="flex flex-col gap-2">
              <Overline>English test</Overline>
              <Segmented label="English test" options={["IELTS", "TOEFL", "Duolingo", "Not taken yet"]} value={answers.englishTest} onChange={(v) => update({ englishTest: v })} />
              {answers.englishTest !== "Not taken yet" ? (
                <Input aria-label="English score" placeholder="Score" value={answers.englishScore} onChange={(e) => update({ englishScore: e.target.value })} inputMode="decimal" />
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Overline>SAT / ACT · recommended</Overline>
              <Segmented label="SAT or ACT" options={["SAT", "ACT", "Not taken", "Not planning"]} value={answers.satTest} onChange={(v) => update({ satTest: v })} />
              {answers.satTest === "SAT" || answers.satTest === "ACT" ? (
                <Input aria-label="SAT or ACT score" placeholder="Score" value={answers.satScore} onChange={(e) => update({ satScore: e.target.value })} inputMode="numeric" />
              ) : null}
            </div>
          </>
        ) : null}

        {step === "priorities" ? (
          <>
            <div className="flex flex-col gap-2">
              <Overline>Pick up to 3</Overline>
              <ChoiceChips
                options={["Low cost", "Scholarships", "Ranking", "Career outcomes", "Location / city life", "Easier admission", "Specific country"]}
                value={answers.priorities}
                onChange={(v) => update({ priorities: v })}
                max={3}
              />
            </div>
            <p className="rounded-[14px] bg-brand-50 px-4 py-3 text-[13px] text-ink-700">
              We only ask what matching uses. Essays and family income are collected later by your mentor.
            </p>
          </>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link href={prev} className={buttonClass({ variant: "glass" })}>
            Back
          </Link>
          {canSkip ? (
            <Link href={next} className="text-[14px] text-ink-500 hover:text-brand-600">
              Skip for now
            </Link>
          ) : null}
        </div>
        <Button onClick={() => router.push(next)}>{index === steps.length - 1 ? "Build my plan" : "Continue"}</Button>
      </div>
    </section>
  );
}
