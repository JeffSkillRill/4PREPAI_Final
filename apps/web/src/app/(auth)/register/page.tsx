import type { Metadata } from "next";
import { Check } from "lucide-react";
import { AuthSplit } from "@/components/auth-split";
import { SignupForm } from "@/components/signup-form";
import { StepBar } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";

export const metadata: Metadata = { title: "Create your free account" };

const perks = [
  "Free plan, universities and AI counselor",
  "Your personal roadmap and matched universities",
  "Optional: join 4Prep Academy with real mentors",
];

export default function RegisterPage() {
  return (
    <AuthSplit
      left={
        <div className="flex flex-col gap-6">
          <h1 className="text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px]">Create your free study plan.</h1>
          <ul className="flex flex-col gap-4">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[16px]">
                <span className="flex size-7 items-center justify-center rounded-[8px] bg-lime text-brand-900">
                  <Check className="size-4" aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-16 flex items-center gap-3 rounded-[20px] border border-white/25 bg-white/10 p-4 backdrop-blur">
            <Avatar name="S M" size={44} ring />
            <div>
              <p className="text-[14px] font-bold">Your plan is ready in about 3 minutes — five short questions.</p>
              <p className="text-[12px] text-brand-200">Free · Verify your email to book and pay</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="w-20">
          <StepBar total={3} current={1} />
        </div>
        <span className="text-[12px] text-ink-500">Step 1 of 3 · Account</span>
      </div>
      <h2 className="text-[32px] font-extrabold tracking-[-1px] text-brand-900">Create your free account</h2>
      <p className="mb-6 mt-2 text-[15px] text-ink-500">No card needed. Join the Academy any time.</p>
      <SignupForm submitLabel="Create account" next="/plan/new/about" />
    </AuthSplit>
  );
}
