import { AppShell } from "@/components/layout/app-shell";
import { Blobs } from "@/components/ui/blobs";

/** Parent portal: read-mostly view of one's own child. Dark sidebar. */
export default function FamilyLayout({ children }: LayoutProps<"/family">) {
  return (
    <AppShell area="family">
      <Blobs blobs={[{ color: "mint", className: "-top-24 right-[5%] size-[520px]" }, { color: "lime", className: "bottom-0 right-[-8%] size-[420px]" }]} />
      {children}
    </AppShell>
  );
}
