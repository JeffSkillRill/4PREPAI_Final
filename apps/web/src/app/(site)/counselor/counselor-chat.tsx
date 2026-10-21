"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { UniLogo } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress";

type Answer = {
  text: string;
  unis?: { code: string; name: string; note: string; slug: string }[];
  source?: string;
  view?: string;
};

type Message = { role: "user"; text: string } | { role: "assistant"; answer: Answer };

const GUEST_LIMIT = 10;

const wont = [
  "Write essays for you",
  "Promise admission or a visa",
  "Choose a university for you",
  "Read private documents, mentor chats or payments",
];

const suggestions = [
  "Which universities fit my budget?",
  "What IELTS do I need?",
  "Explain my plan",
  "What is the difference between Reach and Safety?",
];

/*
 * Mock replies. In production the API streams answers from Claude, and every
 * university fact comes from catalogue tool results (never from the model).
 */
function mockAnswer(q: string): Answer {
  const t = q.toLowerCase();
  if (t.includes("germany") || t.includes("tuition") || t.includes("budget")) {
    return {
      text: "Public universities in Germany usually charge no tuition for international students, with a small semester fee. These two in the catalogue offer CS in English:",
      unis: [
        { code: "TM", name: "TU Munich", note: "Semester fee ~€150", slug: "tu-munich" },
        { code: "TB", name: "TU Berlin", note: "Semester fee ~€320", slug: "tu-munich" },
      ],
      source: "Sources: DAAD · university fee pages · checked 12 Oct 2026",
      view: "Living costs and German-language requirements for some programmes matter as much as tuition. Compare total yearly cost, not just tuition.",
    };
  }
  if (t.includes("ielts")) {
    return {
      text: "Most universities in the catalogue ask for IELTS Academic 6.5 overall; some top programmes ask for 7.0. 4Prep uses 6.5 (or a Duolingo/TOEFL equivalent) as the default requirement to start your application.",
      source: "Source: 4Prep catalogue · admission requirements · checked 10 Oct 2026",
    };
  }
  if (t.includes("reach") || t.includes("safety")) {
    return {
      text: "Reach means admission is less likely for your profile; Target is a realistic match; Safety means admission is likely. Each match in My Plan explains why, factor by factor — there is no single hidden score.",
    };
  }
  if (t.includes("plan")) {
    return {
      text: "Log in so I can read your plan and saved universities. I never read documents, mentor chats or payments.",
    };
  }
  return {
    text: "I can only answer from the sourced 4Prep catalogue. For this question the data is not reported yet — a 4Prep mentor can help.",
  };
}

export function CounselorChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "user", text: "Which universities in Germany have low tuition for Computer Science?" },
    { role: "assistant", answer: mockAnswer("germany") },
  ]);
  const [draft, setDraft] = useState("");
  const used = messages.filter((m) => m.role === "user").length + 2;
  const limitReached = used >= GUEST_LIMIT;

  function ask(text: string) {
    const q = text.trim();
    if (!q || limitReached) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "assistant", answer: mockAnswer(q) }]);
    setDraft("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section aria-label="AI Counselor chat" className="glass flex flex-col rounded-[28px] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-logo-gradient flex size-10 items-center justify-center rounded-[12px] text-white">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-[16px] font-bold text-brand-900">4Prep AI Counselor</p>
              <p className="text-[12px] text-ink-500">Options and consequences — never picks for you</p>
            </div>
          </div>
          <Badge tone="amber">Guest · {used} of {GUEST_LIMIT} messages today</Badge>
        </div>

        <div className="flex flex-col gap-4" aria-live="polite">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <p key={i} className="bg-brand-gradient max-w-[85%] self-start rounded-[20px] rounded-tl-[6px] px-4 py-3 text-[14px] text-white">
                {m.text}
              </p>
            ) : (
              <div key={i} className="flex flex-col gap-3">
                <div className="rounded-[20px] bg-white p-4 shadow-soft">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge>Verified</Badge>
                    <span className="text-[12px] text-ink-500">From the 4Prep catalogue</span>
                  </div>
                  <p className="text-[14px] leading-6 text-ink-700">{m.answer.text}</p>
                  {m.answer.unis ? (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {m.answer.unis.map((u) => (
                        <Link key={u.name} href={`/universities/${u.slug}`} className="flex items-center gap-3 rounded-[16px] bg-brand-50 p-3 hover:bg-brand-100">
                          <UniLogo code={u.code} size={38} />
                          <span className="flex-1">
                            <span className="block text-[14px] font-bold text-brand-900">{u.name}</span>
                            <span className="block text-[12px] text-ink-500">{u.note}</span>
                          </span>
                          <ArrowRight className="size-4 text-brand-600" aria-hidden />
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  {m.answer.source ? (
                    <p className="mt-3 flex items-center gap-1.5 text-[12px] text-ink-500">
                      <FileText className="size-3.5" aria-hidden /> {m.answer.source}
                    </p>
                  ) : null}
                </div>
                {m.answer.view ? (
                  <div className="rounded-[20px] bg-amber-soft p-4">
                    <p className="text-[12px] font-bold text-amber-ink">Counselor&apos;s view</p>
                    <p className="mt-1 text-[14px] leading-6 text-amber-ink">{m.answer.view}</p>
                  </div>
                ) : null}
              </div>
            ),
          )}
        </div>

        <form
          className="mt-5 flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1.5 pl-5 pr-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
          }}
        >
          <label htmlFor="counselor-input" className="sr-only">Ask the counselor</label>
          <input
            id="counselor-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={limitReached}
            placeholder={limitReached ? "Daily guest limit reached — log in to continue" : "Ask about a university, country or test…"}
            className="h-10 min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-500"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={limitReached}
            className="bg-brand-gradient flex size-10 items-center justify-center rounded-full text-white disabled:opacity-50"
          >
            <Send className="size-4" />
          </button>
        </form>
      </section>

      <aside className="flex flex-col gap-6">
        <div className="glass rounded-[28px] p-5">
          <p className="text-[17px] font-bold text-brand-900">Guest limit</p>
          <ProgressBar value={(used / GUEST_LIMIT) * 100} tone="amber" className="mt-3 h-2" />
          <p className="mt-3 text-[13px] leading-5 text-ink-500">
            {used} of {GUEST_LIMIT} free messages used today. Log in so the counselor knows your plan and has a higher daily limit.
          </p>
          <ButtonLink href="/register" className="mt-4 w-full">Log in or create free plan</ButtonLink>
        </div>
        <div className="glass rounded-[28px] p-5">
          <p className="text-[17px] font-bold text-brand-900">Try asking</p>
          <ul className="mt-3 flex flex-col gap-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => ask(s)}
                  className="flex w-full items-center justify-between gap-2 rounded-[14px] bg-white/80 px-3.5 py-3 text-left text-[13.5px] font-medium text-brand-900 hover:bg-white"
                >
                  {s} <ArrowRight className="size-4 shrink-0 text-brand-600" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-[28px] p-5">
          <p className="text-[17px] font-bold text-brand-900">What the counselor will not do</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {wont.map((w) => (
              <li key={w} className="flex items-start gap-2 text-[14px] text-ink-700">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden /> {w}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
