import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";

const sections: Record<string, string> = {
  applications: "Applications",
  calendar: "Calendar",
  messages: "Messages",
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function FamilySection({ params }: PageProps<"/family/[section]">) {
  const { section } = await params;
  const title = sections[section];
  if (!title) notFound();
  return <ComingSoon title={title} backHref="/family" backLabel="Back to child progress" />;
}
