"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/choice";
import { Textarea } from "@/components/ui/field";
import { cn } from "@/lib/cn";

const days = [
  { dow: "Mon", day: 19 },
  { dow: "Tue", day: 20 },
  { dow: "Wed", day: 21 },
  { dow: "Thu", day: 22 },
  { dow: "Fri", day: 23 },
  { dow: "Sat", day: 24 },
];
const times = ["10:00", "11:00", "12:30", "14:30", "15:30", "17:00"];
const modes = ["Online · video in 4Prep", "Tashkent office", "Phone"];

export function BookingForm() {
  const router = useRouter();
  const [day, setDay] = useState(2);
  const [time, setTime] = useState("14:30");
  const [mode, setMode] = useState(modes[0]);
  const [booked, setBooked] = useState(false);

  const d = days[day];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-6">
        <section className="glass rounded-[28px] p-5 sm:p-6">
          <h2 className="mb-3 text-[17px] font-bold text-brand-900">1 · Your free consultation</h2>
          <div className="bg-brand-gradient rounded-[18px] p-4 text-white shadow-glow">
            <p className="text-[15px] font-bold">Meet your mentor and choose your major · 45 min</p>
            <p className="text-[13px] text-brand-100">Your mentor checks your scores and sets targets.</p>
          </div>
          <label htmlFor="discuss" className="mb-2 mt-4 block text-[13px] font-semibold text-ink-700">What would you like to discuss? (optional)</label>
          <Textarea id="discuss" defaultValue="IELTS 5.5 to 6.5 and applying to the USA for Fall 2027." />
        </section>

        <section className="glass rounded-[28px] p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[17px] font-bold text-brand-900">2 · Pick a time with Madina S.</h2>
            <Badge tone="neutral">Time zone: Tashkent (UTC+5)</Badge>
          </div>
          <div role="radiogroup" aria-label="Day" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {days.map((x, i) => (
              <button
                key={x.day}
                type="button"
                role="radio"
                aria-checked={day === i}
                onClick={() => setDay(i)}
                className={cn(
                  "flex flex-col items-center rounded-[16px] border py-3 transition-colors",
                  day === i ? "bg-brand-gradient border-transparent text-white shadow-glow" : "border-ink-100 bg-white text-brand-900 hover:border-brand-300",
                )}
              >
                <span className={cn("text-[12px]", day === i ? "text-brand-100" : "text-ink-500")}>{x.dow}</span>
                <span className="text-[20px] font-bold">{x.day}</span>
              </button>
            ))}
          </div>
          <div role="radiogroup" aria-label="Time" className="mt-3 flex flex-wrap gap-2">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={time === t}
                onClick={() => setTime(t)}
                className={cn(
                  "h-11 rounded-[12px] border px-5 text-[14px] font-semibold",
                  time === t ? "bg-brand-gradient border-transparent text-white" : "border-ink-100 bg-white text-brand-900 hover:border-brand-300",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <Segmented label="Meeting format" options={modes} value={mode} onChange={setMode} className="mt-4" />
        </section>
      </div>

      <aside className="glass h-fit rounded-[28px] p-5 sm:p-6">
        <h2 className="mb-4 text-[20px] font-bold text-brand-900">Your meeting</h2>
        <dl className="flex flex-col gap-2">
          {[
            ["First consultation", "45 min · FREE"],
            ["With", "Madina S. · Admission mentor"],
            ["When", `${d.dow} ${d.day} · ${time} (Tashkent)`],
            ["Format", mode],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[14px] bg-white/75 px-3.5 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[1px] text-ink-500">{k}</dt>
              <dd className="text-[14px] font-bold text-brand-900">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-4 flex flex-col gap-2 text-[12.5px] text-ink-500">
          <li className="flex items-center gap-2"><Mail className="size-4 text-brand-600" aria-hidden /> Confirmation by email and in-app · .ics attached</li>
          <li className="flex items-center gap-2"><MapPin className="size-4 text-brand-600" aria-hidden /> Office address confirmed with booking</li>
          <li className="flex items-center gap-2"><Phone className="size-4 text-brand-600" aria-hidden /> Phone: we&apos;ll call your verified number</li>
          <li className="flex items-center gap-2"><Video className="size-4 text-brand-600" aria-hidden /> Online: join from your browser, no app needed</li>
        </ul>
        {booked ? (
          <div role="status" className="mt-5 rounded-[16px] bg-brand-100 p-4 text-[14px] text-brand-800">
            <p className="flex items-center gap-2 font-bold"><Clock className="size-4" aria-hidden /> Booked for {d.dow} {d.day} at {time}</p>
            <p className="mt-1 text-[13px]">We&apos;ll remind you 24 hours and 1 hour before.</p>
            <Button variant="dark" size="sm" className="mt-3" onClick={() => router.push("/applicant")}>Back to dashboard</Button>
          </div>
        ) : (
          <Button size="lg" className="mt-5 w-full" onClick={() => setBooked(true)}>Confirm booking</Button>
        )}
      </aside>
    </div>
  );
}
