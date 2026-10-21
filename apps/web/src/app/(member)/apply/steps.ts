/** Academy application steps (Figma: Academy application — Step 1–4). */
export const applySteps = [
  { id: "student", label: "Student & parent", title: "About you and your parent" },
  { id: "scores", label: "Your test scores", title: "Your test scores" },
  { id: "destinations", label: "Destinations", title: "Where do you want to apply?" },
  { id: "consent", label: "Interest & consent", title: "Final step: interest & consent" },
] as const;

export type ApplyStepId = (typeof applySteps)[number]["id"];
