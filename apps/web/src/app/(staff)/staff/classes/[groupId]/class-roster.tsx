"use client";

import { useState } from "react";
import { Bell, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox, Segmented } from "@/components/ui/choice";
import { Input } from "@/components/ui/field";

type Att = "Present" | "Late" | "Absent" | "Excused";

const roster = [
  { name: "Aziza Karimova", path: "Test-prep path", current: "5.5", target: "6.5" },
  { name: "Jasur Aliyev", path: "Application path · retake", current: "6.5", target: "7.0" },
];

/**
 * Teacher tools: attendance, mock scores, and "target reached" flag.
 * The flag notifies the mentor; it never moves a student automatically.
 */
export function ClassRoster({ isOnline }: { isOnline: boolean }) {
  const [att, setAtt] = useState<Att[]>(roster.map(() => "Present"));
  const [mock, setMock] = useState(roster.map(() => ""));
  const [reached, setReached] = useState(roster.map(() => false));
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {isOnline ? (
          <Button>
            <Video className="size-4" aria-hidden /> Start online lesson
          </Button>
        ) : null}
        <Button variant={isOnline ? "glass" : "primary"} onClick={() => setSaved(true)}>
          Save attendance
        </Button>
        {saved ? <span role="status" className="self-center text-[13px] font-semibold text-brand-600">Attendance saved for today</span> : null}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {roster.map((s, i) => (
          <section key={s.name} className="glass rounded-[28px] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Avatar name={s.name} size={44} />
              <div>
                <h2 className="text-[18px] font-bold text-brand-900">{s.name}</h2>
                <p className="text-[13px] text-ink-500">{s.path} · IELTS {s.current} → target {s.target}</p>
              </div>
            </div>
            <p className="mb-2 mt-4 text-[13px] font-semibold text-ink-700">Today&apos;s attendance</p>
            <Segmented
              label={`Attendance for ${s.name}`}
              options={["Present", "Late", "Absent", "Excused"]}
              value={att[i]}
              onChange={(v) => setAtt((a) => a.map((x, j) => (j === i ? (v as Att) : x)))}
            />
            <label htmlFor={`mock-${i}`} className="mb-2 mt-4 block text-[13px] font-semibold text-ink-700">New mock IELTS score</label>
            <Input id={`mock-${i}`} inputMode="decimal" placeholder="e.g. 6.0" value={mock[i]} onChange={(e) => setMock((m) => m.map((x, j) => (j === i ? e.target.value : x)))} />
            <p className="mt-2 text-[12.5px] text-ink-500">Latest mock: Not recorded</p>
            <Checkbox className="mt-4" checked={reached[i]} onChange={(v) => setReached((r) => r.map((x, j) => (j === i ? v : x)))}>
              Target reached (verified result)
            </Checkbox>
            <p className="mt-2 text-[12.5px] text-ink-500">
              This flag notifies the mentor to review the result; it does not move the student automatically.
            </p>
            <Button variant="soft" size="sm" className="mt-3" disabled={!reached[i]}>
              <Bell className="size-4" aria-hidden /> Notify mentor
            </Button>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">Homework: none yet</Badge>
              <Badge tone="neutral">Monthly comment: not written</Badge>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
