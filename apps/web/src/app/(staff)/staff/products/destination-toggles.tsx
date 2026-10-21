"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Toggle } from "@/components/ui/choice";
import { Button } from "@/components/ui/button";

export function DestinationToggles() {
  const [list, setList] = useState(
    ["USA", "Canada", "Germany", "Czechia", "Latvia", "Poland", "Italy"].map((c) => ({ name: c, on: true })),
  );
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between rounded-[16px] bg-white/80 px-4 py-3">
            <span className="text-[15px] font-bold text-brand-900">{d.name}</span>
            <Toggle
              label={`${d.name} destination`}
              checked={d.on}
              onChange={(v) => setList((all) => all.map((x, j) => (j === i ? { ...x, on: v } : x)))}
            />
          </div>
        ))}
      </div>
      <Button variant="soft" className="mt-4">
        <Plus className="size-4" aria-hidden /> Add country
      </Button>
    </>
  );
}
