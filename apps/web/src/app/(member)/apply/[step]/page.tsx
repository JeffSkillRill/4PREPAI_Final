import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blobs } from "@/components/ui/blobs";
import { applySteps, type ApplyStepId } from "../steps";
import { ApplyStep } from "./apply-step";

export function generateStaticParams() {
  return applySteps.map((s) => ({ step: s.id }));
}

export const metadata: Metadata = { title: "Join 4Prep Academy" };

export default async function ApplyStepPage({ params }: PageProps<"/apply/[step]">) {
  const { step } = await params;
  if (!applySteps.some((s) => s.id === step)) notFound();
  return (
    <div className="relative isolate flex-1 px-4 pb-16 pt-[120px] lg:pt-[140px]">
      <Blobs
        blobs={[
          { color: "mint", className: "-left-20 top-20 size-[460px]" },
          { color: "sky", className: "right-[15%] -top-10 size-[380px]" },
          { color: "lime", className: "bottom-0 right-[-5%] size-[460px]" },
        ]}
      />
      <ApplyStep step={step as ApplyStepId} />
    </div>
  );
}
