import { AppShell } from "@/components/layout/app-shell";
import { Blobs } from "@/components/ui/blobs";

/**
 * Staff panels. The "Viewing as" switcher in the sidebar changes the menu
 * between Super Admin, Mentor Admin, Mentor and Teacher views.
 */
export default function StaffLayout({ children }: LayoutProps<"/staff">) {
  return (
    <AppShell area="staff">
      <Blobs blobs={[{ color: "mint", className: "-top-24 right-[5%] size-[520px]" }, { color: "lime", className: "bottom-0 right-[-8%] size-[420px]" }]} />
      {children}
    </AppShell>
  );
}
