"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/** Answers collected by the 5-step plan wizard (spec §8.3 student_preferences). */
export type WizardAnswers = {
  forWhom: string;
  schoolYear: string;
  citizenship: string;
  city: string;
  degree: string;
  start: string;
  majors: string[];
  countries: string[];
  budget: string;
  scholarship: string;
  gradeScale: string;
  gradeAverage: string;
  englishTest: string;
  englishScore: string;
  satTest: string;
  satScore: string;
  priorities: string[];
};

const initial: WizardAnswers = {
  forWhom: "Me",
  schoolYear: "Grade 11 · 2027",
  citizenship: "Uzbekistan",
  city: "",
  degree: "Bachelor",
  start: "Fall 2027",
  majors: ["Computer Science"],
  countries: ["Canada", "Germany", "South Korea"],
  budget: "$15–30k",
  scholarship: "Helpful",
  gradeScale: "5-point",
  gradeAverage: "4.6",
  englishTest: "IELTS",
  englishScore: "6.5",
  satTest: "Not taken",
  satScore: "",
  priorities: ["Scholarships", "Career outcomes"],
};

const Ctx = createContext<{
  answers: WizardAnswers;
  update: (patch: Partial<WizardAnswers>) => void;
} | null>(null);

/**
 * Keeps wizard answers while the user moves between steps (the layout, and
 * so this provider, stays mounted across step URLs). In production each step
 * is also saved to the API with PUT /plan/draft ("Saved automatically").
 */
export function WizardProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<WizardAnswers>(initial);

  function update(patch: Partial<WizardAnswers>) {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }

  return <Ctx.Provider value={{ answers, update }}>{children}</Ctx.Provider>;
}

export function useWizard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWizard must be used inside WizardProvider");
  return ctx;
}
