import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";

/** Student menu items whose screens arrive in Phase 2 (spec §4.4, §17). */
const sections: Record<string, { title: string; phase: string }> = {
  applications: { title: "Applications", phase: "Phase 2" },
  essays: { title: "Essays", phase: "Phase 2" },
  recommendations: { title: "Recommendations", phase: "Phase 2" },
  offers: { title: "Grants & offers", phase: "Phase 2" },
  visa: { title: "Visa", phase: "Phase 2" },
  meetings: { title: "Meetings", phase: "Phase 1 (design pending)" },
  messages: { title: "Messages", phase: "Phase 1 (design pending)" },
  payments: { title: "Payments", phase: "Phase 1 (design pending)" },
  team: { title: "My team", phase: "Phase 1 (design pending)" },
  settings: { title: "Settings", phase: "Phase 1 (design pending)" },
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function StudentSection({ params }: PageProps<"/app/[section]">) {
  const { section } = await params;
  const s = sections[section];
  if (!s) notFound();
  return <ComingSoon title={s.title} phase={s.phase} backHref="/app" backLabel="Back to home" />;
}
