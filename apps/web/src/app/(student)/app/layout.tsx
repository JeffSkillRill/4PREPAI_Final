import { AppShell } from "@/components/layout/app-shell";
import { Blobs } from "@/components/ui/blobs";

/** Student dashboard (after a signed agreement). Light glass sidebar. */
export default function StudentLayout({ children }: LayoutProps<"/app">) {
  return (
    <AppShell area="student">
      <Blobs
        blobs={[
          { color: "mint", className: "-top-24 right-[5%] size-[520px]" },
          { color: "lime", className: "top-[50%] right-[-8%] size-[420px]" },
          { color: "sky", className: "top-[60%] -left-32 size-[420px]" },
        ]}
      />
      {children}
    </AppShell>
  );
}
