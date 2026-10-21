import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { classGroups, getGroup } from "@/lib/mock/courses";
import { AuthSplit } from "@/components/auth-split";
import { SignupForm } from "@/components/signup-form";
import { StepBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export function generateStaticParams() {
  return classGroups.map((g) => ({ groupId: g.id }));
}

export const metadata: Metadata = { title: "Enrol" };

export default async function EnrolPage({ params }: PageProps<"/courses/[groupId]/enrol">) {
  const { groupId } = await params;
  const g = getGroup(groupId);
  if (!g) notFound();

  return (
    <AuthSplit
      loginLabel="Log in to continue"
      left={
        <div className="flex flex-col gap-5">
          <h1 className="text-[40px] font-extrabold leading-[1.12] tracking-[-1.2px]">
            Review the {g.title} course.
          </h1>
          <p className="text-[15px] text-brand-100">
            Create a free account to continue. No payment is taken when you create your account.
          </p>
          <div className="rounded-[24px] border border-white/25 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-[1px] text-brand-200">{g.course} course</span>
              <Badge tone="green">{g.seatsLeft} seats left</Badge>
            </div>
            <p className="mt-3 text-[26px] font-extrabold">{g.title}</p>
            <p className="text-[13px] text-brand-200">{g.code}</p>
            <Badge tone={g.mode === "Office" ? "amber" : "sky"} className="mt-3">
              {g.mode === "Office" ? "Office · Tashkent" : "Online · live in 4Prep"}
            </Badge>
            <p className="mt-3 text-[15px] font-semibold">{g.schedule}</p>
            <p className="text-[13px] text-brand-200">{g.weeks} weeks · starts {g.starts}</p>
            <p className="text-[13px] text-brand-200">Entry: {g.entry}</p>
            <p className="mt-3 flex items-center gap-2 text-[13px] text-brand-100">
              <Avatar name={g.teacher} size={26} ring /> Teacher: {g.teacher}
            </p>
            <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
              <p className="text-[30px] font-extrabold">${g.price}</p>
              <p className="text-[13px] text-brand-200">Instalments available</p>
            </div>
            <p className="mt-2 text-[12px] text-brand-200">Includes mock tests, homework and monthly teacher feedback.</p>
          </div>
        </div>
      }
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="w-20">
          <StepBar total={3} current={1} />
        </div>
        <span className="text-[12px] text-ink-500">Account → Verify email → Enrol</span>
      </div>
      <h2 className="text-[32px] font-extrabold tracking-[-1px] text-brand-900">Create your free account</h2>
      <p className="mb-6 mt-2 text-[15px] text-ink-500">
        Enrolling in {g.title} ({g.code}). Creating an account is free.
      </p>
      <SignupForm submitLabel="Create account & continue" next="/app/classes" />
      <div className="mt-6 rounded-[16px] bg-brand-100 p-4">
        <p className="text-[13px] font-bold text-brand-800">Next: verify email, then review enrolment</p>
        <p className="mt-1 text-[12.5px] leading-5 text-ink-700">
          Your seat is reserved only after you sign the class agreement and pay. If you are under 18, a parent signs the agreement; if you are 18 or older, you sign it yourself.
        </p>
      </div>
    </AuthSplit>
  );
}
