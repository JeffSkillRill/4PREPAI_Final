import type { Metadata } from "next";
import { Blobs } from "@/components/ui/blobs";
import { Container } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { CourseBrowser } from "./course-browser";

export const metadata: Metadata = {
  title: "Courses",
  description: "Foundation Math, General English, SAT and IELTS in small groups — online or at our Tashkent office.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100/60 pb-10 pt-[120px] lg:pt-[140px]">
        <Blobs blobs={[{ color: "mint", className: "-top-20 right-[-5%] size-[560px]" }, { color: "lime", className: "top-24 left-[20%] size-[300px]" }]} />
        <Container>
          <h1 className="text-[34px] font-extrabold tracking-[-1.5px] text-brand-900 sm:text-[52px]">Courses</h1>
          <p className="mt-3 max-w-[720px] text-[16px] text-ink-500 sm:text-[18px]">
            Small groups, online or at our Tashkent office. Mock tests, homework and monthly teacher feedback included.
          </p>
          <p className="mt-2 text-[13px] text-ink-500">
            IELTS is required. SAT is recommended — it improves admission and scholarship chances.
          </p>
        </Container>
      </section>
      <Container className="py-10">
        <CourseBrowser />
      </Container>
      <Footer />
    </>
  );
}
