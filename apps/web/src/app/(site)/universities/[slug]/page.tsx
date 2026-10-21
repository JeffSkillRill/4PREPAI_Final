import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Sparkles } from "lucide-react";
import { universities, getUniversity } from "@/lib/mock/universities";
import { Blobs } from "@/components/ui/blobs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { UniLogo } from "@/components/ui/avatar";
import { Container } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { tierTone } from "@/components/university-card";

// Pre-render every catalogue page at build time (Cache Components needs
// known params, otherwise params would be request-time data).
export function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps<"/universities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniversity(slug);
  return { title: u ? u.name : "University" };
}

const sections = ["Overview", "Admissions", "Programmes", "Sources"];

export default async function UniversityPage({ params }: PageProps<"/universities/[slug]">) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden pb-6 pt-[120px] lg:pt-[140px]">
        <Blobs blobs={[{ color: "mint", className: "-top-20 right-[-5%] size-[520px]" }]} />
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-500">
            <Link href="/universities" className="hover:text-brand-600">Universities</Link> / {u.country} /{" "}
            <span className="font-semibold text-brand-900">{u.name}</span>
          </nav>
          <Card className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <UniLogo code={u.code} size={72} className="rounded-[20px]" />
              <div>
                <h1 className="text-[26px] font-extrabold tracking-[-0.8px] text-brand-900 sm:text-[34px]">{u.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-ink-500">
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden />{u.city}, {u.country}</span>
                  <Badge tone="neutral">{u.type}</Badge>
                  <Badge>{u.ranking}</Badge>
                  {u.scholarship ? <Badge tone="amber">{u.scholarship}</Badge> : null}
                  <Badge tone="sky">Intake: {u.intake}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <ButtonLink href="/universities" variant="glass">Compare</ButtonLink>
              <ButtonLink href="/register">Save</ButtonLink>
            </div>
          </Card>
          <nav aria-label="On this page" className="mt-5 flex flex-wrap gap-2">
            {sections.map((s, i) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className={
                  i === 0
                    ? "bg-brand-gradient rounded-full px-4 py-2 text-[13px] font-semibold text-white shadow-glow"
                    : "rounded-full border border-ink-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink-700 hover:border-brand-300"
                }
              >
                {s}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Container className="grid gap-6 pb-16 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <Card id="overview">
            <CardHeader title="Overview" />
            <p className="text-[15px] leading-7 text-ink-700">{u.overview}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {u.stats.map((s) => (
                <div key={s.label} className="rounded-[16px] bg-brand-50 p-4">
                  <p className="text-[22px] font-extrabold text-brand-900">{s.value}</p>
                  <p className="text-[12px] text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card id="admissions">
            <CardHeader title="Admissions" subtitle="Source: university admissions office · checked 12 Oct 2026" />
            <ul className="flex flex-col gap-2">
              {u.admissions.map((a) => (
                <li key={a.item} className="grid grid-cols-[minmax(0,140px)_1fr_auto] items-center gap-3 rounded-[14px] bg-white/75 px-4 py-3 text-[14px]">
                  <span className="font-semibold text-brand-900">{a.item}</span>
                  <span className="text-ink-700">{a.detail}</span>
                  <Badge tone={a.status === "Required" ? "green" : a.status === "Recommended" ? "sky" : "neutral"}>{a.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card id="programmes">
            <CardHeader title="Programmes" subtitle="Programme examples below require confirmation with the university." />
            <div className="grid gap-3 sm:grid-cols-2">
              {u.programmes.map((p) => (
                <div key={p.name} className="rounded-[16px] bg-brand-50 p-4">
                  <p className="text-[15px] font-bold text-brand-900">{p.name}</p>
                  <p className="mt-1 text-[13px] leading-5 text-ink-500">{p.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card id="sources">
            <CardHeader title="Sources" subtitle="Every fact shows where it came from and when it was checked. Missing data is shown as “not reported”." />
            <ul className="flex flex-col gap-2">
              {u.sources.map((s) => (
                <li key={s.fact} className="flex flex-wrap items-center justify-between gap-2 rounded-[14px] bg-white/75 px-4 py-3 text-[14px]">
                  <span className="font-semibold text-brand-900">{s.fact}</span>
                  <span className="text-ink-500">{s.source}</span>
                  <Badge>Checked {s.checked}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Key facts" />
            <dl className="flex flex-col divide-y divide-ink-100">
              {u.keyFacts.map((f) => (
                <div key={f.label} className="flex justify-between gap-3 py-2.5 text-[14px]">
                  <dt className="text-ink-500">{f.label}</dt>
                  <dd className="text-right font-bold text-brand-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card tone="dark" className="bg-forest-gradient">
            <p className="text-[12px] font-bold uppercase tracking-[1px] text-lime">Your fit</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[24px] font-extrabold">{u.tier}</p>
              <Badge tone={tierTone[u.tier]}>Explained below</Badge>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {u.fit.map((f) => (
                <li key={f.factor} className="flex justify-between gap-3 rounded-[12px] bg-white/10 px-3 py-2.5 text-[13px]">
                  <span className="font-semibold">{f.factor}</span>
                  <span className="text-right text-brand-100">{f.result}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/counselor" size="md" className="mt-4 w-full">
              <Sparkles className="size-4" aria-hidden /> Ask the counselor about this university
            </ButtonLink>
          </Card>
          <Card>
            <p className="text-[17px] font-bold text-brand-900">Need help applying?</p>
            <p className="mt-2 text-[14px] leading-6 text-ink-500">
              Join 4Prep Academy and work with a real mentor team — online or at our Tashkent office.
            </p>
            <ButtonLink href="/book" variant="dark" className="mt-4 w-full">Book a free consultation</ButtonLink>
          </Card>
        </aside>
      </Container>
      <Footer />
    </>
  );
}
