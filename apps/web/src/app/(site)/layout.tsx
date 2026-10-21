import { PublicNav } from "@/components/layout/public-nav";

/** Public website for visitors who are not signed in. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <PublicNav />
      <div className="-mt-[84px] flex flex-1 flex-col lg:-mt-[92px]">{children}</div>
    </>
  );
}
