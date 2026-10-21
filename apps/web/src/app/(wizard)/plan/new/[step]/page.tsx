import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WizardStep } from "./wizard-step";
import { steps, type StepId } from "../steps";

export function generateStaticParams() {
  return steps.map((s) => ({ step: s.id }));
}

export const metadata: Metadata = { title: "Build your free plan" };

export default async function PlanStepPage({ params }: PageProps<"/plan/new/[step]">) {
  const { step } = await params;
  if (!steps.some((s) => s.id === step)) notFound();
  return <WizardStep step={step as StepId} />;
}
