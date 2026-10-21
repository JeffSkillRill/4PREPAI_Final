import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = { title: "Partners" };

export default function PartnersPage() {
  return (
    <>
      <div className="flex-1 px-4 pt-[120px] lg:pt-[140px]">
        <ComingSoon title="Partners" backHref="/" backLabel="Back to home" />
      </div>
      <Footer />
    </>
  );
}
