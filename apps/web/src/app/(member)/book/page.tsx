import type { Metadata } from "next";
import { Blobs } from "@/components/ui/blobs";
import { Container } from "@/components/layout/page-header";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = { title: "Book a free consultation" };

export default function BookPage() {
  return (
    <div className="relative isolate flex-1 pb-16 pt-[120px] lg:pt-[140px]">
      <Blobs />
      <Container>
        <h1 className="text-[32px] font-extrabold tracking-[-1px] text-brand-900 sm:text-[44px]">Book a free consultation</h1>
        <p className="mb-8 mt-2 text-[15px] text-ink-500">Meet your mentor and choose your major · 45 min · Free</p>
        <BookingForm />
      </Container>
    </div>
  );
}
