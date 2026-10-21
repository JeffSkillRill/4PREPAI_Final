"use client";

import { useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Status = "Missing" | "Uploaded" | "In review" | "Needs changes" | "Approved";

const tone: Record<Status, BadgeTone> = {
  Missing: "neutral",
  Uploaded: "green",
  "In review": "sky",
  "Needs changes": "amber",
  Approved: "lime",
};

type Doc = { name: string; note?: string; status: Status };

const initialGroups: { title: string; docs: Doc[] }[] = [
  { title: "Identity", docs: [{ name: "Passport", status: "Approved" }, { name: "Photos", status: "Uploaded" }] },
  {
    title: "Academic",
    docs: [
      { name: "Transcripts", status: "In review" },
      { name: "Diploma", status: "Missing" },
      { name: "Translations", note: "Required for non-English documents", status: "Needs changes" },
    ],
  },
  {
    title: "Tests",
    docs: [
      { name: "English report", note: "IELTS 6.5 or equivalent Duolingo/TOEFL score", status: "Approved" },
      { name: "SAT report", note: "Recommended", status: "Uploaded" },
    ],
  },
  {
    title: "Financial",
    docs: [
      { name: "Bank statement", status: "Missing" },
      { name: "Sponsor letter", status: "Missing" },
      { name: "CSS Profile", note: "Financial aid form — if required", status: "Missing" },
    ],
  },
  {
    title: "Recommendations",
    docs: [
      { name: "School counselor", status: "In review" },
      { name: "Teacher 1", status: "Missing" },
      { name: "Teacher 2", status: "Missing" },
    ],
  },
  {
    title: "Essays · written by 4Prep, approved by you",
    docs: [
      { name: "Personal statement", note: "Ready for your review in Essays", status: "In review" },
      { name: "Supplements", status: "Missing" },
    ],
  },
];

/** Upload control. Frontend-only: marks the file as uploaded locally. */
export function UploadButton({ onPick }: { onPick?: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png,.heic" className="sr-only" onChange={(e) => e.target.files?.[0] && onPick?.(e.target.files[0])} />
      <Button onClick={() => ref.current?.click()}>
        <Upload className="size-4" aria-hidden /> Upload document
      </Button>
    </>
  );
}

export function DocumentGroups() {
  const [groups, setGroups] = useState(initialGroups);

  function markUploaded(g: number, d: number) {
    setGroups((prev) =>
      prev.map((grp, gi) =>
        gi !== g ? grp : { ...grp, docs: grp.docs.map((doc, di) => (di === d ? { ...doc, status: "Uploaded" } : doc)) },
      ),
    );
  }

  const all = groups.flatMap((g) => g.docs);
  const count = (s: Status) => all.filter((d) => d.status === s).length;

  return (
    <div className="flex flex-col gap-6">
      <section className="glass rounded-[28px] p-5 sm:p-6">
        <h2 className="mb-4 text-[20px] font-bold text-brand-900">Status summary</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {(["Missing", "Uploaded", "In review", "Needs changes", "Approved"] as Status[]).map((s) => (
            <div key={s} className="flex flex-col items-start gap-2 rounded-[16px] bg-white/80 p-3">
              <Badge tone={tone[s]}>{s}</Badge>
              <span className="text-[22px] font-extrabold text-brand-900">{count(s)}</span>
            </div>
          ))}
        </div>
      </section>
      {groups.map((g, gi) => (
        <section key={g.title} className="glass rounded-[28px] p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-brand-900">{g.title}</h2>
            <span className="text-[13px] font-semibold text-brand-600">{g.docs.length} items</span>
          </div>
          <ul className="flex flex-col gap-2">
            {g.docs.map((d, di) => (
              <li key={d.name} className="flex flex-wrap items-center gap-3 rounded-[16px] bg-white/80 px-3.5 py-3">
                <FileText className="size-4 shrink-0 text-brand-600" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-brand-900">{d.name}</span>
                  {d.note ? <span className="block text-[12px] text-ink-500">{d.note}</span> : null}
                </span>
                <Badge tone={tone[d.status]}>{d.status}</Badge>
                {d.status === "Missing" || d.status === "Needs changes" ? (
                  <label className="cursor-pointer rounded-full bg-brand-100 px-3 py-1.5 text-[12px] font-semibold text-brand-700 hover:bg-brand-200">
                    Upload
                    <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png,.heic" onChange={() => markUploaded(gi, di)} />
                  </label>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
