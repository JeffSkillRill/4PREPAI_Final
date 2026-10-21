/**
 * Mock university catalogue. In production every fact comes from the
 * `universities`, `programs`, `admission_requirements`, `costs`,
 * `deadlines` and `scholarships` tables, each with a source URL and a
 * checked date. Values here are illustrative, not verified admissions data.
 */

export type Tier = "Reach" | "Target" | "Safety" | "Not enough data";

export type University = {
  slug: string;
  code: string;
  name: string;
  city: string;
  country: string;
  ranking: string;
  scholarship: "Full scholarship" | "Partial scholarship" | "Scholarship" | "Low tuition" | null;
  costPerYear: string | null;
  minIelts: string;
  deadline: string;
  tier: Tier;
  type: "Public" | "Private";
  intake: string;
  overview: string;
  stats: { label: string; value: string }[];
  keyFacts: { label: string; value: string }[];
  admissions: { item: string; detail: string; status: "Required" | "Recommended" | "Optional" }[];
  programmes: { name: string; detail: string }[];
  fit: { factor: string; result: string }[];
  sources: { fact: string; source: string; checked: string }[];
};

export const universities: University[] = [
  {
    slug: "university-of-toronto",
    code: "UT",
    name: "University of Toronto",
    city: "Toronto",
    country: "Canada",
    ranking: "QS Top 50",
    scholarship: "Partial scholarship",
    costPerYear: "$38k",
    minIelts: "6.5",
    deadline: "Jan 15",
    tier: "Target",
    type: "Public",
    intake: "Sep 2027",
    overview:
      "The University of Toronto is Canada's leading research university with three campuses, 700+ undergraduate programs and strong co-op links with industry. International students make up about a quarter of the student body.",
    stats: [
      { label: "Programs", value: "700+" },
      { label: "International", value: "25%" },
      { label: "Acceptance rate", value: "43%" },
      { label: "Tuition / year", value: "$38k" },
    ],
    keyFacts: [
      { label: "Tuition", value: "$38,000 / yr" },
      { label: "Living costs", value: "$16,000 / yr" },
      { label: "Intake", value: "September" },
      { label: "Application deadline", value: "Jan 15, 2027" },
      { label: "Decision", value: "Mar–May 2027" },
      { label: "Language", value: "English" },
    ],
    admissions: [
      { item: "IELTS Academic", detail: "6.5 overall, no band below 6.0", status: "Required" },
      { item: "SAT", detail: "1400+ (for Engineering 1450+)", status: "Recommended" },
      { item: "High school GPA", detail: "Equivalent of 4.5 / 5.0 or higher", status: "Required" },
      { item: "Essays", detail: "Personal statement + 2 short answers", status: "Required" },
      { item: "Recommendation", detail: "1 teacher recommendation", status: "Required" },
      { item: "Application fee", detail: "CAD 180", status: "Required" },
    ],
    programmes: [
      { name: "Arts & Science", detail: "Humanities, social sciences, languages and interdisciplinary programs." },
      { name: "Engineering", detail: "Core engineering disciplines with strong co-op and research opportunities." },
      { name: "Rotman Commerce", detail: "Business, management and commerce programs with a global perspective." },
      { name: "Health Sciences", detail: "Programs focused on health, wellness and biomedical sciences." },
    ],
    fit: [
      { factor: "Academic", result: "Meets typical range" },
      { factor: "Financial", result: "Above your budget" },
      { factor: "Language", result: "IELTS 6.5 meets minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Matches your country" },
    ],
    sources: [
      { fact: "Acceptance rate", source: "University common data set", checked: "12 Oct 2026" },
      { fact: "Tuition and fees", source: "Official fees page", checked: "12 Oct 2026" },
      { fact: "Language requirement", source: "Admissions office", checked: "10 Oct 2026" },
      { fact: "Ranking", source: "QS World University Rankings", checked: "2026 edition" },
    ],
  },
  {
    slug: "kaist",
    code: "KA",
    name: "KAIST",
    city: "Daejeon",
    country: "South Korea",
    ranking: "QS Top 100",
    scholarship: "Full scholarship",
    costPerYear: "$4.5k",
    minIelts: "6.0",
    deadline: "Dec 1",
    tier: "Reach",
    type: "Public",
    intake: "Feb 2027",
    overview: "Korea's leading science and technology university, taught largely in English, with generous scholarships for international undergraduates.",
    stats: [
      { label: "Programs", value: "30+" },
      { label: "International", value: "10%" },
      { label: "Acceptance rate", value: "Not reported" },
      { label: "Tuition / year", value: "$4.5k" },
    ],
    keyFacts: [
      { label: "Tuition", value: "$4,500 / yr" },
      { label: "Living costs", value: "$5,300 / yr" },
      { label: "Intake", value: "February" },
      { label: "Application deadline", value: "Dec 1, 2026" },
      { label: "Language", value: "English" },
    ],
    admissions: [
      { item: "IELTS Academic", detail: "6.0 overall", status: "Required" },
      { item: "SAT", detail: "Strong math scores help", status: "Recommended" },
      { item: "Essays", detail: "Statement of purpose", status: "Required" },
      { item: "Recommendation", detail: "2 teacher recommendations", status: "Required" },
    ],
    programmes: [
      { name: "Computer Science", detail: "Top-ranked CS school in Korea." },
      { name: "Electrical Engineering", detail: "Strong research labs and industry partners." },
    ],
    fit: [
      { factor: "Academic", result: "Grades below typical range" },
      { factor: "Financial", result: "Inside your budget" },
      { factor: "Language", result: "IELTS 6.5 meets minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Matches your country" },
    ],
    sources: [{ fact: "Tuition", source: "Official fees page", checked: "8 Oct 2026" }],
  },
  {
    slug: "tu-munich",
    code: "TM",
    name: "TU Munich",
    city: "Munich",
    country: "Germany",
    ranking: "QS Top 50",
    scholarship: "Low tuition",
    costPerYear: "€0.3k",
    minIelts: "6.5",
    deadline: "Jan 31",
    tier: "Target",
    type: "Public",
    intake: "Oct 2027",
    overview: "One of Europe's top technical universities. Public, with a small semester fee and many English-taught programs at master's level.",
    stats: [
      { label: "Programs", value: "180+" },
      { label: "International", value: "38%" },
      { label: "Acceptance rate", value: "Not reported" },
      { label: "Semester fee", value: "€150" },
    ],
    keyFacts: [
      { label: "Tuition", value: "Semester fee ~€150" },
      { label: "Living costs", value: "€14,000 / yr" },
      { label: "Intake", value: "October" },
      { label: "Application deadline", value: "Jan 31, 2027" },
      { label: "Language", value: "German / English" },
    ],
    admissions: [
      { item: "IELTS Academic", detail: "6.5 overall", status: "Required" },
      { item: "Aptitude assessment", detail: "Program-specific", status: "Required" },
      { item: "SAT", detail: "Not used", status: "Optional" },
    ],
    programmes: [{ name: "Informatics", detail: "Computer science with strong industry ties." }],
    fit: [
      { factor: "Academic", result: "Inside typical range" },
      { factor: "Financial", result: "Inside your budget" },
      { factor: "Language", result: "Meets minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Matches your country" },
    ],
    sources: [{ fact: "Semester fee", source: "Official fees page", checked: "11 Oct 2026" }],
  },
  {
    slug: "nyu-abu-dhabi",
    code: "NY",
    name: "NYU Abu Dhabi",
    city: "Abu Dhabi",
    country: "UAE",
    ranking: "QS Top 100",
    scholarship: "Full scholarship",
    costPerYear: null,
    minIelts: "7.0",
    deadline: "Jan 5",
    tier: "Not enough data",
    type: "Private",
    intake: "Sep 2027",
    overview: "A liberal arts and research campus of New York University with need-based aid for admitted students.",
    stats: [
      { label: "Programs", value: "25+" },
      { label: "International", value: "Not reported" },
      { label: "Acceptance rate", value: "Not reported" },
      { label: "Tuition / year", value: "Not reported" },
    ],
    keyFacts: [
      { label: "Tuition", value: "Not reported" },
      { label: "Intake", value: "September" },
      { label: "Application deadline", value: "Jan 5, 2027" },
      { label: "Language", value: "English" },
    ],
    admissions: [
      { item: "IELTS Academic", detail: "7.0 overall", status: "Required" },
      { item: "SAT", detail: "Test-optional", status: "Optional" },
    ],
    programmes: [{ name: "Computer Science", detail: "Small classes, research from year one." }],
    fit: [
      { factor: "Academic", result: "Admitted range not reported" },
      { factor: "Financial", result: "Cost not reported" },
      { factor: "Language", result: "Below minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Matches your country" },
    ],
    sources: [{ fact: "Deadline", source: "Admissions office", checked: "9 Oct 2026" }],
  },
  {
    slug: "university-of-manchester",
    code: "UM",
    name: "University of Manchester",
    city: "Manchester",
    country: "UK",
    ranking: "QS Top 50",
    scholarship: "Partial scholarship",
    costPerYear: "£27k",
    minIelts: "6.5",
    deadline: "Jan 29",
    tier: "Safety",
    type: "Public",
    intake: "Sep 2027",
    overview: "A large research university in the north of England, part of the Russell Group.",
    stats: [
      { label: "Programs", value: "400+" },
      { label: "International", value: "30%" },
      { label: "Acceptance rate", value: "Not reported" },
      { label: "Tuition / year", value: "£27k" },
    ],
    keyFacts: [
      { label: "Tuition", value: "£27,000 / yr" },
      { label: "Intake", value: "September" },
      { label: "Application deadline", value: "Jan 29, 2027" },
      { label: "Language", value: "English" },
    ],
    admissions: [{ item: "IELTS Academic", detail: "6.5 overall", status: "Required" }],
    programmes: [{ name: "Computer Science", detail: "Strong industry placements." }],
    fit: [
      { factor: "Academic", result: "Above typical range" },
      { factor: "Financial", result: "Slightly above budget" },
      { factor: "Language", result: "Meets minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Matches your country" },
    ],
    sources: [{ fact: "Tuition", source: "Official fees page", checked: "10 Oct 2026" }],
  },
  {
    slug: "wiut-tashkent",
    code: "WI",
    name: "WIUT Tashkent",
    city: "Tashkent",
    country: "Uzbekistan",
    ranking: "Local",
    scholarship: "Scholarship",
    costPerYear: "$4k",
    minIelts: "6.0",
    deadline: "Aug 15",
    tier: "Safety",
    type: "Private",
    intake: "Sep 2027",
    overview: "Westminster International University in Tashkent awards UK degrees in Uzbekistan.",
    stats: [
      { label: "Programs", value: "20+" },
      { label: "International", value: "Not reported" },
      { label: "Acceptance rate", value: "Not reported" },
      { label: "Tuition / year", value: "$4k" },
    ],
    keyFacts: [
      { label: "Tuition", value: "$4,000 / yr" },
      { label: "Intake", value: "September" },
      { label: "Application deadline", value: "Aug 15, 2027" },
      { label: "Language", value: "English" },
    ],
    admissions: [{ item: "IELTS Academic", detail: "6.0 overall", status: "Required" }],
    programmes: [{ name: "Business Information Systems", detail: "UK-validated degree." }],
    fit: [
      { factor: "Academic", result: "Above typical range" },
      { factor: "Financial", result: "Inside your budget" },
      { factor: "Language", result: "Meets minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Home country" },
    ],
    sources: [{ fact: "Tuition", source: "Official fees page", checked: "7 Oct 2026" }],
  },
  {
    slug: "politecnico-di-milano",
    code: "PM",
    name: "Politecnico di Milano",
    city: "Milan",
    country: "Italy",
    ranking: "QS Top 150",
    scholarship: "Partial scholarship",
    costPerYear: "$12.5k",
    minIelts: "6.0",
    deadline: "Feb 28",
    tier: "Safety",
    type: "Public",
    intake: "Sep 2027",
    overview: "Italy's largest technical university with English-taught engineering and design programs.",
    stats: [
      { label: "Programs", value: "60+" },
      { label: "International", value: "20%" },
      { label: "Acceptance rate", value: "Not reported" },
      { label: "Tuition / year", value: "$3.9k" },
    ],
    keyFacts: [
      { label: "Total cost", value: "$12,500 / yr" },
      { label: "Intake", value: "September" },
      { label: "Application deadline", value: "Feb 28, 2027" },
      { label: "Language", value: "English" },
    ],
    admissions: [{ item: "IELTS Academic", detail: "6.0 overall", status: "Required" }],
    programmes: [{ name: "Computer Engineering", detail: "English-taught bachelor's." }],
    fit: [
      { factor: "Academic", result: "Inside typical range" },
      { factor: "Financial", result: "Inside your budget" },
      { factor: "Language", result: "Meets minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Matches your country" },
    ],
    sources: [{ fact: "Tuition", source: "Official fees page", checked: "6 Oct 2026" }],
  },
  {
    slug: "university-of-michigan",
    code: "MI",
    name: "Univ. of Michigan",
    city: "Ann Arbor",
    country: "USA",
    ranking: "QS Top 50",
    scholarship: "Partial scholarship",
    costPerYear: "$58k",
    minIelts: "6.5",
    deadline: "Nov 1",
    tier: "Reach",
    type: "Public",
    intake: "Aug 2027",
    overview: "A top public research university with strong engineering and business schools.",
    stats: [
      { label: "Programs", value: "250+" },
      { label: "International", value: "7%" },
      { label: "Acceptance rate", value: "18%" },
      { label: "Tuition / year", value: "$58k" },
    ],
    keyFacts: [
      { label: "Tuition", value: "$58,000 / yr" },
      { label: "Intake", value: "August" },
      { label: "Application deadline", value: "Nov 1, 2026 (EA)" },
      { label: "Language", value: "English" },
    ],
    admissions: [
      { item: "IELTS Academic", detail: "6.5 overall", status: "Required" },
      { item: "SAT", detail: "Test-optional, strongly considered", status: "Recommended" },
    ],
    programmes: [{ name: "Computer Science", detail: "Engineering or LSA track." }],
    fit: [
      { factor: "Academic", result: "Below typical range" },
      { factor: "Financial", result: "Above your budget" },
      { factor: "Language", result: "Meets minimum" },
      { factor: "Career", result: "Major offered" },
      { factor: "Geographic", result: "Matches your country" },
    ],
    sources: [{ fact: "Acceptance rate", source: "Common data set", checked: "5 Oct 2026" }],
  },
];

export const countryFilters = [
  "All countries",
  "USA",
  "Canada",
  "UK",
  "Germany",
  "South Korea",
  "UAE",
  "Uzbekistan",
] as const;

export function getUniversity(slug: string) {
  return universities.find((u) => u.slug === slug);
}
