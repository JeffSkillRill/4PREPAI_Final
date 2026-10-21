/**
 * Mock AI plan (spec §11.2). Tiers and factor results are computed by code
 * from the catalogue; the model only writes the one-line explanations.
 */

export type FactorState = "meets" | "partial" | "misses" | "unknown";

export type PlanMatch = {
  slug: string;
  code: string;
  name: string;
  place: string;
  tier: "Reach" | "Target" | "Safety" | "Not enough data";
  reason: string;
  factors: Record<"Academic" | "Financial" | "Language" | "Career" | "Geographic", FactorState>;
};

export const planSummary = {
  title: "Bachelor · Computer Science · Fall 2027",
  chips: ["Canada", "Germany", "South Korea", "Budget $15–30k", "IELTS 6.5", "SAT not taken"],
};

export const planMatches: PlanMatch[] = [
  {
    slug: "kaist",
    code: "KA",
    name: "KAIST",
    place: "Daejeon · South Korea",
    tier: "Reach",
    reason: "Your IELTS 6.5 meets their minimum 6.0. Grades are below their typical range. Total cost $9,800 is inside your budget.",
    factors: { Academic: "partial", Financial: "meets", Language: "meets", Career: "meets", Geographic: "meets" },
  },
  {
    slug: "university-of-toronto",
    code: "UT",
    name: "University of Toronto",
    place: "Toronto · Canada",
    tier: "Reach",
    reason: "Your IELTS 6.5 meets their minimum 6.5. Total cost $54,000 is above your budget.",
    factors: { Academic: "partial", Financial: "misses", Language: "meets", Career: "meets", Geographic: "meets" },
  },
  {
    slug: "tu-munich",
    code: "TM",
    name: "TU Munich",
    place: "Munich · Germany",
    tier: "Target",
    reason: "Your grades are inside their typical range. Total cost $14,200 is inside your budget.",
    factors: { Academic: "meets", Financial: "meets", Language: "meets", Career: "meets", Geographic: "meets" },
  },
  {
    slug: "university-of-manchester",
    code: "UM",
    name: "Univ. of Manchester",
    place: "Manchester · UK",
    tier: "Target",
    reason: "IELTS 6.5 meets their minimum 6.5. Total cost $31,000 is slightly above your budget.",
    factors: { Academic: "meets", Financial: "partial", Language: "meets", Career: "meets", Geographic: "meets" },
  },
  {
    slug: "wiut-tashkent",
    code: "WI",
    name: "WIUT Tashkent",
    place: "Tashkent · Uzbekistan",
    tier: "Safety",
    reason: "Your grades are above their typical range. Total cost $6,000 is inside your budget.",
    factors: { Academic: "meets", Financial: "meets", Language: "meets", Career: "meets", Geographic: "meets" },
  },
  {
    slug: "politecnico-di-milano",
    code: "PM",
    name: "Politecnico di Milano",
    place: "Milan · Italy",
    tier: "Safety",
    reason: "Your grades are inside their typical range. Total cost $12,500 is inside your budget.",
    factors: { Academic: "meets", Financial: "meets", Language: "meets", Career: "meets", Geographic: "meets" },
  },
  {
    slug: "nyu-abu-dhabi",
    code: "NY",
    name: "NYU Abu Dhabi",
    place: "Abu Dhabi · UAE",
    tier: "Not enough data",
    reason: "Cost is not reported and the admitted grade range is missing, so we cannot judge this one yet.",
    factors: { Academic: "unknown", Financial: "unknown", Language: "meets", Career: "meets", Geographic: "meets" },
  },
];

export const tierMeta = {
  Reach: { label: "Reach", note: "Ambitious — admission is less likely", tone: "amber" },
  Target: { label: "Target", note: "A realistic match", tone: "green" },
  Safety: { label: "Safety", note: "Admission is likely", tone: "sky" },
  "Not enough data": { label: "Not enough data", note: "We do not guess when facts are missing", tone: "neutral" },
} as const;

export const roadmap = [
  { when: "Oct–Nov 2026", task: "Take IELTS (target 7.0) · book SAT date", done: true },
  { when: "Nov–Dec 2026", task: "Collect transcripts and passport · write personal statement", done: true },
  { when: "Dec 2026–Jan 2027", task: "Submit applications — earliest deadline Dec 1 (KAIST)", done: false },
  { when: "Mar–May 2027", task: "Decisions, compare offers, pay deposit", done: false },
  { when: "Jun–Aug 2027", task: "Visa, housing, pre-departure checklist", done: false },
];
