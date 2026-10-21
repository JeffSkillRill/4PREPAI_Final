import type { Metadata } from "next";
import Link from "next/link";
import { Blobs } from "@/components/ui/blobs";
import { Container } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { UniversityBrowser } from "./university-browser";

export const metadata: Metadata = {
  title: "Universities",
  description: "Search the 4Prep catalogue. Every fact shows its source and the date it was checked.",
};

export default function UniversitiesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100/60 pb-10 pt-[120px] lg:pt-[140px]">
        <Blobs
          blobs={[
            { color: "sky", className: "-top-10 left-[15%] size-[420px]" },
            { color: "mint", className: "-top-20 right-[-5%] size-[520px]" },
          ]}
        />
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-500">
            <Link href="/" className="hover:text-brand-600">Home</Link> /{" "}
            <span className="font-semibold text-brand-900">Universities</span>
          </nav>
          <h1 className="mt-4 text-[34px] font-extrabold tracking-[-1.5px] text-brand-900 sm:text-[52px]">
            Find the right university for you
          </h1>
          <p className="mt-3 text-[16px] text-ink-500 sm:text-[18px]">
            Search the 4Prep catalogue. Every fact shows its source and the date it was checked.
          </p>
        </Container>
      </section>
      <Container className="py-10">
        <UniversityBrowser />
      </Container>
      <Footer />
    </>
  );
}
