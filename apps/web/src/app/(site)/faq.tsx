"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const items = [
  {
    q: "How does the process work?",
    a: "Every student starts with a free consultation. If you already meet the English requirement, your application starts right away. If not, we prepare you first in our English and SAT classes, then your plan merges into the same agreement, application and visa steps.",
  },
  {
    q: "Is it online or at the office?",
    a: "Both. Consultations, classes and mentor sessions run online inside 4Prep or at our Tashkent office.",
  },
  {
    q: "Can my parents follow progress?",
    a: "Yes. Parents get their own login and can see your progress, missing documents and deadlines, and message your mentor and teachers.",
  },
  {
    q: "How do payments work?",
    a: "You pay only after you sign an agreement. Payments go through our bank partner's secure checkout; 4Prep never sees your card details.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="glass rounded-[20px]">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-brand-900"
            >
              {it.q}
              <ChevronDown className={cn("size-5 shrink-0 text-brand-600 transition-transform", isOpen && "rotate-180")} aria-hidden />
            </button>
            {isOpen ? <p className="px-5 pb-5 text-[14px] leading-6 text-ink-500">{it.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
