import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { CatalogueEditor } from "./catalogue-editor";

export const metadata: Metadata = { title: "University catalogue" };

export default function CataloguePage() {
  return (
    <>
      <PageHeader
        title="University catalogue & partners"
        subtitle="Every fact needs a source and a checked date. Missing data stays “not reported”."
        actions={
          <>
            <Button variant="glass">Import CSV</Button>
            <Button>Add university</Button>
          </>
        }
      />
      <CatalogueEditor />
    </>
  );
}
