import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Check, Lock, Search, Sparkles, FileText } from "lucide-react";
import { Blobs } from "@/components/ui/blobs";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardHeader, Row } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Container } from "@/components/layout/page-header";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Applicant dashboard" };

const steps = [
  { label: "Applied", note: "Form received", state: "done" },
  { label: "Book meeting", note: "Pick a slot", state: "current" },
  { label: "Consultation", note: "Meet your mentor", state: "locked" },
  { label: "Path assigned", note: "After consultation", state: "locked" },
  { label: "Sign agreement", note: "Parent signs under 18", state: "locked" },
  { label: "Payment", note: "Admission agreement", state: "locked" },
] as const;

const testPrepPath = ["Test-prep classes", "Official English requirement met", "Mentor moves you to the application path at the admission agreement"];
const applicationPath = [
  "Consultation",
  "Signed and paid admission agreement",
  "Personal info and documents",
  "Application accounts — opened and managed by 4Prep",
  "Student-approved applications",
  "Offers and family decision",
  "Visa and departure",
];

export default function ApplicantDashboard() {
  return (
    <div className="relative isolate flex-1 pb-16 pt-[120px] lg:pt-[140px]">
      <Blobs />
      <Container className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[32px] font-extrabold tracking-[-1px] text-brand-900 sm:text-[40px]">Welcome, Aziza Karimova</h1>
            <p className="mt-1 text-[15px] text-ink-500">Your application is received. Next: book your free first consultation.</p>
          </div>
          <Badge tone="amber">Applicant</Badge>
        </div>

        <Card>
          <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (
              <li key={s.label} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border-2 text-[15px] font-bold",
                    s.state === "done" && "border-brand-600 bg-brand-600 text-white",
                    s.state === "current" && "border-brand-500 bg-white text-brand-600",
                    s.state === "locked" && "border-ink-200 bg-white text-ink-300",
                  )}
                >
                  {s.state === "done" ? <Check className="size-5" /> : s.state === "locked" ? <Lock className="size-4" /> : i + 1}
                </span>
                <span className={cn("text-[13px] font-bold", s.state === "locked" ? "text-ink-500" : "text-brand-900")}>{s.label}</span>
                <span className="text-[11.5px] text-ink-500">{s.note}</span>
              </li>
            ))}
          </ol>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            <div className="bg-forest-gradient flex flex-col items-start justify-between gap-4 rounded-[28px] p-6 text-white sm:flex-row sm:items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[1px] text-lime">Next step</p>
                <p className="mt-1 text-[24px] font-bold">Book your free consultation</p>
                <p className="text-[14px] text-brand-200">45 minutes with your mentor · online, Tashkent office or phone</p>
              </div>
              <ButtonLink href="/book">Pick a time</ButtonLink>
            </div>

            <Card>
              <CardHeader title="Your consultant" />
              <div className="flex items-center gap-4">
                <Avatar name="Madina S." size={56} />
                <div className="flex-1">
                  <p className="text-[16px] font-bold text-brand-900">Madina S.</p>
                  <p className="text-[13px] text-ink-500">Admission mentor · USA, Canada</p>
                </div>
                <Button variant="glass" size="sm">Message</Button>
              </div>
            </Card>

            <Card>
              <CardHeader title="Upcoming meeting" />
              <Row className="justify-start gap-4">
                <span className="flex size-10 items-center justify-center rounded-[12px] bg-brand-100 text-brand-600">
                  <Calendar className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[14px] font-bold text-brand-900">No meeting booked yet</span>
                  <span className="block text-[13px] text-ink-500">Choose online, Tashkent office or phone when you book.</span>
                </span>
              </Row>
            </Card>

            <Card>
              <CardHeader title="After consultation preview" subtitle="This is not your current state. It shows what happens after your first meeting." action={<Badge>Preview</Badge>} />
              <div className="rounded-[18px] bg-brand-50 p-4">
                <p className="text-[14px] font-bold text-brand-900">Likely path: Test-prep path first</p>
                <p className="mt-1 text-[13px] text-ink-500">IELTS 5.5 → target 6.5 · Entry requirement: IELTS 6.5 or equivalent Duolingo / TOEFL · SAT not taken (recommended)</p>
              </div>
              <p className="mb-2 mt-5 text-[13px] font-bold text-brand-900">Test-prep path</p>
              <ol className="flex flex-col gap-2">
                {testPrepPath.map((s, i) => (
                  <Row key={s}><span className="text-[13.5px] text-ink-700">{s}</span><span className="text-[12px] font-semibold text-ink-500">{i === 0 ? "Next" : "Then"}</span></Row>
                ))}
              </ol>
              <p className="mb-2 mt-5 text-[13px] font-bold text-brand-900">Application path</p>
              <ol className="flex flex-col gap-2">
                {applicationPath.map((s, i) => (
                  <Row key={s}><span className="text-[13.5px] text-ink-700">{s}</span><span className="text-[12px] font-semibold text-ink-500">{i === 0 ? "First" : i === applicationPath.length - 1 ? "Final" : "Then"}</span></Row>
                ))}
              </ol>
              <p className="mt-4 rounded-[14px] bg-white/70 p-3 text-[13px] text-ink-500">
                <span className="font-semibold text-brand-900">Parallel support:</span> financial aid, English/SAT retakes and visa interview prep can run alongside applications, not after offers.
              </p>
            </Card>
          </div>

          <aside className="flex flex-col gap-6">
            <Card>
              <CardHeader title="Still available to you" />
              <ul className="flex flex-col gap-2">
                {[
                  { label: "My Plan and matched universities", href: "/plan", icon: FileText },
                  { label: "AI Counselor", href: "/counselor", icon: Sparkles },
                  { label: "Saved universities", href: "/universities", icon: Search },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="flex items-center justify-between gap-2 rounded-[14px] bg-white/80 px-3.5 py-3 text-[13.5px] font-medium text-brand-900 hover:bg-white">
                      <span className="flex items-center gap-2"><l.icon className="size-4 text-brand-600" aria-hidden /> {l.label}</span>
                      <ArrowRight className="size-4 text-brand-600" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardHeader title="Chat with your consultant" subtitle="Opens once your mentor is assigned — done for you." />
              <p className="rounded-[14px] bg-brand-50 p-3 text-[13px] text-ink-700">Hi Aziza! Looking forward to meeting you. Pick any time that suits you.</p>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
}
