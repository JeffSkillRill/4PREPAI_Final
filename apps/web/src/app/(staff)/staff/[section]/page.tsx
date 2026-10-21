import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";

/** Staff menu items without a P1 frame yet (spec §4.6). */
const sections: Record<string, { title: string; back: string }> = {
  agreements: { title: "Agreements", back: "/staff" },
  results: { title: "Results (verified)", back: "/staff" },
  settings: { title: "Settings", back: "/staff" },
  audit: { title: "Audit log", back: "/staff" },
  approvals: { title: "Approvals", back: "/staff/pipeline" },
  reviews: { title: "Review queues", back: "/staff/students" },
  calendar: { title: "Calendar", back: "/staff/students" },
  tasks: { title: "Tasks", back: "/staff/students" },
  messages: { title: "Messages", back: "/staff/students" },
  attendance: { title: "Attendance", back: "/staff/classes/ielts-g65-nov-b" },
  scores: { title: "Scores", back: "/staff/classes/ielts-g65-nov-b" },
  materials: { title: "Materials", back: "/staff/classes/ielts-g65-nov-b" },
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function StaffSection({ params }: PageProps<"/staff/[section]">) {
  const { section } = await params;
  const s = sections[section];
  if (!s) notFound();
  return <ComingSoon title={s.title} phase="a later phase (design pending)" backHref={s.back} />;
}
