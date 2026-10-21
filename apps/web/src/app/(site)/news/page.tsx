import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <div className="flex-1 px-4 pt-[120px] lg:pt-[140px]">
        <ComingSoon title="News" backHref="/" backLabel="Back to home" />
      </div>
      <Footer />
    </>
  );
}
