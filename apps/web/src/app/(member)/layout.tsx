import { PublicNav } from "@/components/layout/public-nav";

/**
 * Signed-in pages that keep the public top navigation (Figma: My Plan,
 * Academy application, booking, offer, payment). The avatar replaces Log in.
 */
export default function MemberLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <PublicNav member={{ initials: "AK", name: "Aziza Karimova" }} />
      <div className="-mt-[84px] flex flex-1 flex-col lg:-mt-[92px]">{children}</div>
    </>
  );
}
