import type { Metadata } from "next";
import { FileText, Users, Waypoints, ShieldCheck } from "lucide-react";
import { Blobs } from "@/components/ui/blobs";
import { Eyebrow } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { CounselorChat } from "./counselor-chat";

export const metadata: Metadata = {
  title: "AI Counselor",
  description: "Ask anything about universities, countries, tests and applications. Answers use only the sourced 4Prep catalogue.",
};

const how = [
  { icon: FileText, title: "Grounded in sources", text: "University facts come only from the catalogue, with a Verified label and source link. Missing data is shown as “not reported”." },
  { icon: Users, title: "Knows your plan", text: "When logged in, it reads your plan and saved universities — not documents, chats or payments." },
  { icon: Waypoints, title: "You decide", text: "It lays out options and consequences. It never picks a university for you." },
  { icon: ShieldCheck, title: "Humans for big decisions", text: "Strategy, essays and visa risk go to a 4Prep mentor with one click." },
];

export default function CounselorPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100/60 pb-24 pt-[120px] lg:pt-[140px]">
        <Blobs blobs={[{ color: "mint", className: "-top-20 right-[-5%] size-[560px]" }, { color: "lime", className: "top-10 left-[10%] size-[320px]" }]} />
        <Container>
          <Eyebrow>Free for everyone · Verified university data</Eyebrow>
          <h1 className="mt-4 text-[34px] font-extrabold tracking-[-1.5px] text-brand-900 sm:text-[52px]">
            Ask anything about universities
          </h1>
          <p className="mt-3 max-w-[760px] text-[16px] text-ink-500 sm:text-[18px]">
            Universities, countries, tests and applications. Answers use only the sourced 4Prep catalogue — and say so when data is missing.
          </p>
        </Container>
      </section>

      <Container className="-mt-16">
        <CounselorChat />
      </Container>

      <Container className="mt-10">
        <div className="bg-forest-gradient flex flex-col items-start justify-between gap-4 rounded-[28px] p-6 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-[17px] font-bold">Need a person for this?</p>
            <p className="text-[14px] text-brand-200">Strategy, essays and visa questions are best answered by a 4Prep mentor.</p>
          </div>
          <ButtonLink href="/book">Talk to a 4Prep mentor</ButtonLink>
        </div>
      </Container>

      <section className="py-20">
        <Container>
          <SectionHeading overline="How it works" title="Grounded, explainable, human-backed" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {how.map((h) => (
              <Card key={h.title} tone="solid">
                <span className="flex size-11 items-center justify-center rounded-[14px] bg-brand-100 text-brand-600">
                  <h.icon className="size-5" aria-hidden />
                </span>
                <p className="mt-4 text-[17px] font-bold text-brand-900">{h.title}</p>
                <p className="mt-2 text-[14px] leading-6 text-ink-500">{h.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
