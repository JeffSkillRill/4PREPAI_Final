import type { Metadata } from "next";
import { Video, CalendarDays } from "lucide-react";
import { classGroups } from "@/lib/mock/courses";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardHeader, Row } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Classes" };

const mine = classGroups.filter((g) => g.id === "ielts-a7-nov-a" || g.id === "sat-wkd-nov-c");

const sessions = [
  { when: "Mon 2 Nov · 17:00", group: "IELTS Advanced 7+", topic: "Writing Task 2 · argument structure", mode: "Office" },
  { when: "Sat 7 Nov · 10:00", group: "SAT Weekend", topic: "Diagnostic test", mode: "Online" },
  { when: "Wed 4 Nov · 17:00", group: "IELTS Advanced 7+", topic: "Speaking part 3", mode: "Office" },
];

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        title="My classes"
        subtitle="Your enrolled groups, upcoming lessons and attendance. Parents can see attendance and teacher feedback."
        actions={<ButtonLink href="/courses" variant="glass">Browse courses</ButtonLink>}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          {mine.map((g) => (
            <Card key={g.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[20px] font-bold text-brand-900">{g.title}</h2>
                    <Badge tone="neutral">{g.code}</Badge>
                  </div>
                  <p className="mt-2 text-[14px] text-ink-700">{g.schedule} · {g.weeks} weeks · starts {g.starts}</p>
                  <p className="mt-2 flex items-center gap-2 text-[13px] text-ink-500"><Avatar name={g.teacher} size={22} /> {g.teacher}</p>
                </div>
                <Badge tone={g.mode === "Office" ? "amber" : "sky"}>{g.mode === "Office" ? "Office · Tashkent" : "Online · live in 4Prep"}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[["Attendance", "Not started"], ["Latest mock", "Not recorded"], ["Homework", "0 / 0"]].map(([k, v]) => (
                  <div key={k} className="rounded-[14px] bg-white/80 p-3">
                    <p className="text-[11.5px] text-ink-500">{k}</p>
                    <p className="text-[14px] font-bold text-brand-900">{v}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Upcoming lessons" />
            <ul className="flex flex-col gap-2">
              {sessions.map((s) => (
                <Row key={s.when + s.group} className="items-start">
                  <span className="flex gap-3">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                    <span>
                      <span className="block text-[13px] font-bold text-brand-900">{s.when}</span>
                      <span className="block text-[12.5px] text-ink-500">{s.group} · {s.topic}</span>
                    </span>
                  </span>
                  <Badge tone={s.mode === "Office" ? "amber" : "sky"}>{s.mode}</Badge>
                </Row>
              ))}
            </ul>
            <Button className="mt-4 w-full" variant="dark">
              <Video className="size-4" aria-hidden /> Join online lesson
            </Button>
          </Card>
          <Card>
            <CardHeader title="Teacher feedback" />
            <p className="rounded-[14px] bg-brand-50 p-3 text-[13px] text-ink-500">
              Not yet recorded. Monthly feedback appears here once your teacher writes it.
            </p>
          </Card>
        </aside>
      </div>
    </>
  );
}
