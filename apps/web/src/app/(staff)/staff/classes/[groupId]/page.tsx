import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { classGroups, getGroup } from "@/lib/mock/courses";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassRoster } from "./class-roster";

export function generateStaticParams() {
  return classGroups.map((g) => ({ groupId: g.id }));
}

export const metadata: Metadata = { title: "My class" };

export default async function TeacherClassPage({ params }: PageProps<"/staff/classes/[groupId]">) {
  const { groupId } = await params;
  const g = getGroup(groupId);
  if (!g) notFound();

  return (
    <>
      <PageHeader title="My class" subtitle={`${g.title} · ${g.code}`} />
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader title="Class schedule" action={<Badge tone={g.mode === "Office" ? "amber" : "sky"}>{g.mode}</Badge>} />
          <p className="text-[14px] text-ink-700">{g.mode} · {g.schedule} · {g.weeks} weeks · starts {g.starts}</p>
          <p className="mt-1 text-[14px] text-ink-700">Teacher: {g.teacher}</p>
        </Card>
        <ClassRoster isOnline={g.mode === "Online"} />
      </div>
    </>
  );
}
