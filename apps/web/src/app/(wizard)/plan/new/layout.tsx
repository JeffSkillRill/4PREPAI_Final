import { Blobs } from "@/components/ui/blobs";
import { WizardProvider } from "./wizard-state";

export default function WizardLayout({ children }: LayoutProps<"/plan/new">) {
  return (
    <div className="relative isolate flex min-h-dvh flex-1 items-center justify-center bg-gradient-to-b from-brand-50 to-brand-100/70 px-4 py-10">
      <Blobs
        blobs={[
          { color: "mint", className: "-left-24 top-0 size-[520px]" },
          { color: "sky", className: "right-[10%] -top-20 size-[420px]" },
          { color: "lime", className: "-bottom-20 right-[-5%] size-[520px]" },
        ]}
      />
      <WizardProvider>{children}</WizardProvider>
    </div>
  );
}
