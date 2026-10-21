/** Plan wizard steps, shared by the server page and the client step UI. */
export const steps = [
  { id: "about", title: "About you" },
  { id: "goal", title: "Your goal" },
  { id: "destination", title: "Where and budget" },
  { id: "academics", title: "Academics" },
  { id: "priorities", title: "Priorities" },
] as const;

export type StepId = (typeof steps)[number]["id"];
