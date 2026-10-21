import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  GraduationCap,
  Image as ImageIcon,
  Languages,
  Mail,
  MapPin,
  Phone,
  Plane,
  Send,
  Sparkles,
  Clock,
} from "lucide-react";
import { Blobs } from "@/components/ui/blobs";
import { Eyebrow, Badge } from "@/components/ui/badge";
import { ButtonLink, Button } from "@/components/ui/button";
import { Card, Row } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Container, SectionHeading } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/field";
import { Faq } from "./faq";

const services = [
  {
    icon: GraduationCap,
    title: "Admission and grants",
    text: "University choice, applications, documents and financial aid for the USA, Canada and Europe. 4Prep writes and submits; you approve.",
    tag: "Bachelor's · Master's · Transfer",
  },
  {
    icon: Plane,
    title: "Visa interview preparation",
    text: "4Prep prepares the visa paperwork. You practise the interview with your mentor and walk in ready.",
    tag: "Online · Office",
  },
  {
    icon: Languages,
    title: "English (General English + IELTS)",
    text: "Small groups from everyday English up to IELTS, with mock tests, homework and monthly teacher feedback.",
    tag: "Online · Office",
  },
  {
    icon: Calculator,
    title: "Math & SAT (Foundation Math + SAT)",
    text: "Foundation Math builds the base, then SAT groups with scored practice tests and a weekly plan.",
    tag: "Online · Office",
  },
];

const stages = [
  { title: "Agreement", text: "Signed and paid admission agreement" },
  { title: "Applications", text: "Student-approved submissions" },
  { title: "Grants and offers", text: "Financial aid and offer review" },
  { title: "Visa", text: "Interview and departure support" },
];

const destinations = ["USA", "Canada", "Germany", "Czechia", "Latvia", "Poland", "Italy"];

const team = [
  { name: "Madina Saidova", role: "Mentor", focus: "Admissions · USA, Canada" },
  { name: "Sardor Karimov", role: "Mentor", focus: "Admissions · Korea, Germany" },
  { name: "Dilnoza Nazarova", role: "Teacher", focus: "English test preparation" },
  { name: "Rustam Zokirov", role: "Teacher", focus: "SAT · Math" },
];

const news = [
  { tag: "University news", tone: "sky" as const, date: "Oct 9 · 3 min read", title: "Common App opens for Fall 2027 applicants" },
  { tag: "Event", tone: "amber" as const, date: "Oct 25 · 2 min read", title: "Open day at the Tashkent office" },
  { tag: "Deadline", tone: "green" as const, date: "Oct 7 · 2 min read", title: "Early deadlines: what to finish by November 1" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100 pb-16 pt-[120px] lg:pt-[140px]">
        <Blobs />
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,640px)_1fr]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>4Prep Academy · Tashkent</Eyebrow>
            <h1 className="text-[36px] font-extrabold leading-[1.1] tracking-[-1.5px] text-brand-900 sm:text-[46px] lg:text-[54px] lg:leading-[60px] lg:tracking-[-2px]">
              We help students prepare for admission to universities in the
              USA, Canada and Europe with grant and visa support.
            </h1>
            <p className="text-[17px] leading-[30px] text-ink-500 sm:text-[19px]">
              You can browse universities worldwide, then choose a free
              consultation online, at the office or by phone. Every student gets
              a free consultation before joining.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <ButtonLink href="/book" size="lg">
                Get a free consultation
              </ButtonLink>
              <ButtonLink href="/register" variant="glass" size="lg">
                Create free plan
              </ButtonLink>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {["Free consultation", "Worldwide university browsing", "Real mentors"].map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-[14px] font-semibold text-ink-700">
                  <Check className="size-4 text-brand-600" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto h-[520px] w-full max-w-[600px] sm:h-[640px]">
            <div className="bg-forest-gradient absolute right-0 top-0 flex size-[300px] flex-col items-center gap-2 rounded-[36px] pt-14 sm:size-[420px]">
              <ImageIcon className="size-10 text-brand-200" aria-hidden />
              <p className="text-[14px] font-semibold text-brand-200">Real team / office photo</p>
            </div>
            <Card className="absolute left-0 top-[150px] w-[300px] !p-5 sm:w-[330px]">
              <p className="mb-3 text-[14px] font-bold text-brand-900">Free consultation</p>
              <div className="flex flex-col gap-3">
                <Row>
                  <Badge tone="amber">Online</Badge>
                  <span className="text-[13.5px] font-semibold text-ink-700">Office · Phone</span>
                </Row>
                <Row>
                  <Badge>Worldwide browsing</Badge>
                  <span className="text-[13.5px] font-semibold text-ink-700">Any intake</span>
                </Row>
                <Row>
                  <Badge tone="sky">Real mentors</Badge>
                  <span className="text-right text-[13.5px] font-semibold text-ink-700">Bachelor&apos;s · Master&apos;s · Transfer</span>
                </Row>
              </div>
              <p className="mt-3 text-[12.5px] text-ink-500">Every student starts with a free consultation.</p>
            </Card>
            <Card tone="dark" className="absolute bottom-6 right-0 w-[300px] !p-[18px] sm:bottom-auto sm:top-[380px] sm:w-[340px]">
              <div className="flex items-center gap-2.5">
                <span className="bg-logo-gradient flex size-[34px] items-center justify-center rounded-[11px]">
                  <Sparkles className="size-[17px] text-white" aria-hidden />
                </span>
                <p className="text-[14px] font-bold">AI Counselor</p>
              </div>
              <p className="mt-2.5 rounded-[14px] bg-white/12 p-3 text-[13px] leading-[19px]">
                Browse universities worldwide, then choose a free consultation
                for USA, Canada and Europe support.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-20">
        <Container>
          <SectionHeading
            overline="What we do"
            title="Four ways 4Prep helps you"
            subtitle="Every service is delivered by real mentors and teachers."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Card key={s.title} tone="solid" className="flex flex-col gap-3">
                <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-[14px] text-white shadow-glow">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-[18px] font-bold text-brand-900">{s.title}</h3>
                <p className="text-[14px] leading-6 text-ink-500">{s.text}</p>
                <div className="mt-auto flex flex-col items-start gap-3 pt-2">
                  <Badge tone="neutral">{s.tag}</Badge>
                  <Link href="/courses" className="inline-flex items-center gap-1 text-[14px] font-semibold text-brand-600 hover:underline">
                    Details <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16">
        <Container>
          <SectionHeading
            overline="How it works"
            title="Two entry paths that merge into one shared path"
            subtitle="Free consultation online, at the office or by phone. Bachelor's, master's and transfer applicants follow the same process, for Fall and Spring intakes."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Card tone="solid" className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[18px] font-bold text-brand-900">I have IELTS 6.5 or equivalent (Duolingo, TOEFL)</p>
                <p className="mt-2 text-[14px] text-ink-500">Free consultation → scores checked → start your application.</p>
              </div>
              <span className="text-[28px] font-extrabold text-brand-600" aria-hidden>A</span>
            </Card>
            <Card tone="solid" className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[18px] font-bold text-brand-900">I don&apos;t have it yet</p>
                <p className="mt-2 text-[14px] text-ink-500">Free consultation → English (and recommended SAT) preparation → reach the requirement, then continue on the same path.</p>
              </div>
              <span className="text-[28px] font-extrabold text-brand-600" aria-hidden>B</span>
            </Card>
          </div>
          <p className="my-6 text-center text-[13px] font-semibold text-ink-500">Both paths join at the admission agreement</p>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <li key={s.title} className="glass relative rounded-[22px] p-5">
                <span className="text-[12px] font-bold text-brand-600">Step {i + 1}</span>
                <p className="mt-1 text-[16px] font-bold text-brand-900">{s.title}</p>
                <p className="mt-1 text-[13px] text-ink-500">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-6 max-w-[760px] text-center text-[14px] leading-6 text-ink-500">
            Have IELTS 6.5 (or Duolingo/TOEFL equivalent)? You can start your
            application now. Not yet? We prepare you first, then you continue on
            the same path. IELTS is required; SAT is recommended — it improves
            admission and scholarship chances.
          </p>
        </Container>
      </section>

      {/* Destinations */}
      <section className="py-12">
        <Container>
          <SectionHeading align="left" overline="Where our students go" title="A growing destination list" subtitle="Our consulting destinations keep growing. University browsing remains worldwide, beyond this list." />
          <div className="-mt-4 flex flex-wrap gap-2">
            {destinations.map((d) => (
              <span key={d} className="rounded-full border border-ink-200 bg-white px-4 py-2 text-[14px] font-medium text-ink-700">{d}</span>
            ))}
            <span className="rounded-full border border-dashed border-ink-300 px-4 py-2 text-[14px] text-ink-500">More countries coming</span>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="bg-forest-gradient my-8 py-16 text-center text-white">
        <Container>
          <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-lime">Real results</p>
          <h2 className="mt-2 text-[30px] font-bold tracking-[-0.8px] sm:text-[40px]">Verified results from real 4Prep students</h2>
          <p className="mx-auto mt-3 max-w-[620px] text-[14px] text-brand-200">
            Results appear here once students have agreed to share them.
          </p>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16">
        <Container>
          <SectionHeading align="left" overline="Mentors and teachers" title="The people who work with you" subtitle="Real people, real experience." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((p) => (
              <Card key={p.name} tone="solid" className="flex flex-col items-center gap-3 text-center">
                <Avatar name={p.name} size={88} className="rounded-[24px]" />
                <p className="text-[16px] font-bold text-brand-900">{p.name}</p>
                <Badge tone={p.role === "Mentor" ? "green" : "amber"}>{p.role}</Badge>
                <p className="text-[13px] text-ink-500">{p.focus}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* News */}
      <section className="py-12">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionHeading align="left" overline="News" title="Latest from 4Prep" />
            <Link href="/news" className="mb-10 inline-flex shrink-0 items-center gap-1 text-[14px] font-semibold text-brand-600">
              All news <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {news.map((n) => (
              <Card key={n.title} tone="solid" className="overflow-hidden !p-0">
                <div className="bg-forest-gradient relative h-36">
                  <Badge tone={n.tone} className="absolute bottom-3 left-4">{n.tag}</Badge>
                </div>
                <div className="p-5">
                  <p className="text-[12px] text-ink-500">{n.date}</p>
                  <p className="mt-1 text-[15px] font-bold text-brand-900">{n.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ + contact */}
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <SectionHeading align="left" overline="FAQ" title="Common questions" />
            <Faq />
          </div>
          <Card tone="solid" className="h-fit">
            <h3 className="text-[20px] font-bold text-brand-900">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3 text-[14px] text-ink-700">
              <li className="flex items-center gap-3"><Phone className="size-4 text-brand-600" aria-hidden /> +998 90 000 00 00 · Telegram @4prepacademy</li>
              <li className="flex items-center gap-3"><Mail className="size-4 text-brand-600" aria-hidden /> hello@4prep.uz</li>
              <li className="flex items-center gap-3"><MapPin className="size-4 text-brand-600" aria-hidden /> Tashkent office</li>
              <li className="flex items-center gap-3"><Clock className="size-4 text-brand-600" aria-hidden /> Mon–Sat, 9:00–18:00</li>
            </ul>
            <form className="mt-5 flex flex-col gap-3">
              <label htmlFor="ask" className="text-[13px] font-semibold text-ink-700">Ask a question</label>
              <Input id="ask" placeholder="Your question…" />
              <Button type="submit" className="w-full">
                <Send className="size-4" aria-hidden /> Send question
              </Button>
            </form>
          </Card>
        </Container>
      </section>

      <Footer />
    </>
  );
}

