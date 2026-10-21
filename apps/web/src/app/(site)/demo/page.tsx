import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = { title: "Prototype map", robots: { index: false } };

const areas: { title: string; who: string; links: [string, string][] }[] = [
  {
    title: "Public website",
    who: "Visitor, no account",
    links: [["Home", "/"], ["Universities", "/universities"], ["University detail", "/universities/university-of-toronto"], ["AI Counselor", "/counselor"], ["Courses", "/courses"], ["Register", "/register"], ["Course enrolment (guest)", "/courses/sat-int-nov-a/enrol"]],
  },
  {
    title: "Plan and academy application",
    who: "Signed-in lead / applicant",
    links: [["Plan wizard", "/plan/new/about"], ["My Plan", "/plan"], ["Academy application", "/apply/student"], ["Applicant dashboard", "/applicant"], ["Book a consultation", "/book"], ["Offer · admission package", "/agreements/admission-package"], ["Offer · test-prep plan", "/agreements/test-prep-plan"], ["Payment", "/pay/inv-0187"], ["Payment success", "/pay/inv-0187/success"]],
  },
  {
    title: "Student dashboard",
    who: "Student after a signed agreement",
    links: [["Home", "/app"], ["Personal info & documents", "/app/documents"], ["Classes", "/app/classes"], ["Test prep", "/app/test-prep"]],
  },
  { title: "Parent portal", who: "Parent", links: [["Child progress", "/family"]] },
  {
    title: "Staff panels",
    who: "Use “Viewing as” in the sidebar to switch roles",
    links: [["Super Admin · Overview", "/staff"], ["Users & roles", "/staff/users"], ["Products & payments", "/staff/products"], ["University catalogue", "/staff/catalogue"], ["Mentor Admin · Pipeline", "/staff/pipeline"], ["Mentor · My students", "/staff/students"], ["Mentor · Student 360", "/staff/students/aziza-karimova"], ["Teacher · My class", "/staff/classes/ielts-g65-nov-b"]],
  },
];

/** Index of every prototype screen, for reviewers. Not linked from the site. */
export default function DemoPage() {
  return (
    <>
      <Container className="flex-1 pb-16 pt-[120px] lg:pt-[140px]">
        <h1 className="text-[36px] font-extrabold tracking-[-1px] text-brand-900">Prototype map</h1>
        <p className="mt-2 max-w-[640px] text-[15px] text-ink-500">
          Front-end prototype with mock data. Nothing is saved; forms and payments are simulated.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((a) => (
            <section key={a.title} className="glass rounded-[28px] p-5">
              <h2 className="text-[18px] font-bold text-brand-900">{a.title}</h2>
              <p className="text-[13px] text-ink-500">{a.who}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {a.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-[14px] font-medium text-brand-600 hover:underline">{label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}
