"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { universities, countryFilters } from "@/lib/mock/universities";
import { UniversityCard } from "@/components/university-card";
import { PillTabs, Checkbox } from "@/components/ui/choice";
import { Button } from "@/components/ui/button";
import { Select, Overline } from "@/components/ui/field";
import { cn } from "@/lib/cn";

const degrees = ["Bachelor", "Master", "Foundation"] as const;
const scholarships = ["Full scholarship", "Partial scholarship"] as const;
const ielts = ["6.0 and below", "6.5", "7.0+"] as const;

/** Catalogue search + filters. Filtering is client-side over mock data for now. */
export function UniversityBrowser() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("All countries");
  const [degree, setDegree] = useState<string[]>(["Bachelor"]);
  const [scholarship, setScholarship] = useState<string[]>([]);
  const [band, setBand] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return universities.filter((u) => {
      if (country !== "All countries" && u.country !== country) return false;
      if (q && !`${u.name} ${u.city} ${u.country}`.toLowerCase().includes(q)) return false;
      if (scholarship.length && !scholarship.includes(u.scholarship ?? "")) return false;
      if (band.length) {
        const v = Number(u.minIelts);
        const ok = band.some((b) => (b === "6.0 and below" ? v <= 6 : b === "6.5" ? v === 6.5 : v >= 7));
        if (!ok) return false;
      }
      return true;
    });
  }, [query, country, scholarship, band]);

  function toggle(list: string[], set: (v: string[]) => void, v: string) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  return (
    <div className="-mt-[70px] flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="glass flex max-w-[640px] items-center gap-3 rounded-full py-2 pl-5 pr-2"
        >
          <Search className="size-5 shrink-0 text-ink-500" aria-hidden />
          <label htmlFor="uni-search" className="sr-only">Search universities</label>
          <input
            id="uni-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by university, country or major…"
            className="h-10 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-ink-500"
          />
          <Button type="submit" size="sm" className="h-10 px-6">Search</Button>
        </form>
        <PillTabs options={countryFilters} value={country} onChange={setCountry} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="lg:hidden">
          <Button variant="outline" size="sm" onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters}>
            <SlidersHorizontal className="size-4" aria-hidden /> Filters
          </Button>
        </div>
        <aside className={cn("glass h-fit rounded-[28px] p-5", showFilters ? "block" : "hidden lg:block")}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-brand-900">Filters</h2>
            <button
              type="button"
              className="text-[13px] font-semibold text-brand-600"
              onClick={() => {
                setCountry("All countries");
                setDegree(["Bachelor"]);
                setScholarship([]);
                setBand([]);
                setQuery("");
              }}
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Overline>Country</Overline>
              <Select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country" className="h-12">
                {countryFilters.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>
            <fieldset className="flex flex-col gap-2.5">
              <legend className="mb-2"><Overline>Degree</Overline></legend>
              {degrees.map((d) => (
                <Checkbox key={d} checked={degree.includes(d)} onChange={() => toggle(degree, setDegree, d)}>{d}</Checkbox>
              ))}
            </fieldset>
            <fieldset className="flex flex-col gap-2.5">
              <legend className="mb-2"><Overline>Scholarship</Overline></legend>
              {scholarships.map((d) => (
                <Checkbox key={d} checked={scholarship.includes(d)} onChange={() => toggle(scholarship, setScholarship, d)}>{d}</Checkbox>
              ))}
            </fieldset>
            <fieldset className="flex flex-col gap-2.5">
              <legend className="mb-2"><Overline>Test requirements</Overline></legend>
              {ielts.map((d) => (
                <Checkbox key={d} checked={band.includes(d)} onChange={() => toggle(band, setBand, d)}>{d}</Checkbox>
              ))}
            </fieldset>
          </div>
        </aside>

        <div>
          <p className="mb-4 text-[14px] text-ink-500">
            Showing <span className="font-semibold text-brand-900">{results.length}</span> universities · sorted by your fit
          </p>
          {results.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {results.map((u) => (
                <UniversityCard key={u.slug} u={u} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-[28px] p-10 text-center">
              <p className="text-[16px] font-bold text-brand-900">No universities match these filters</p>
              <p className="mt-1 text-[14px] text-ink-500">Try another country or remove a filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
