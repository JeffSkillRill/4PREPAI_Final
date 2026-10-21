import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { students, getStudent } from "@/lib/mock/people";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/layout/page-header";

export function generateStaticParams() {
  return students.map((s) => ({ id: s.id }));
}

export const metadata: Metadata = { title: "Student 360" };

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="flex flex-col gap-2">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3 rounded-[12px] bg-white/75 px-3.5 py-2.5 text-[13.5px]">
          <dt className="shrink-0 text-ink-500">{k}</dt>
          <dd className="min-w-0 text-right font-semibold text-brand-900">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function Student360({ params }: PageProps<"/staff/students/[id]">) {
  const { id } = await params;
  const s = getStudent(id);
  if (!s) notFound();
  const testPrep = s.path === "Test-prep path";

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <Avatar name={s.name} size={44} /> {s.name}
          </span>
        }
        subtitle={`${s.path} · ${s.city} · ${s.degree} · ${s.intake} · ${s.destinations}`}
        actions={
          <>
            <Button variant="glass">Message student & parent</Button>
            <Button>Create offer</Button>
          </>
        }
      />
      <div className="flex flex-col gap-6">
        <Card tone="tint">
          <CardHeader title="English eligibility and mentor action" action={<Badge tone={s.english.met ? "green" : "amber"}>{s.english.met ? "Requirement met" : "Requirement not met"}</Badge>} />
          <div className="grid gap-4 md:grid-cols-2">
            <Facts
              rows={[
                [`${s.english.test} current / target`, `${s.english.current} → ${s.english.target}`],
                ["Entry requirement", s.english.requirement],
                ["SAT (recommended)", `${s.sat.current} · target ${s.sat.target}`],
                ["Parent", s.parent],
              ]}
            />
            <div className="flex flex-col justify-between gap-3 rounded-[16px] bg-white/70 p-4">
              <p className="text-[13.5px] text-ink-700">
                {testPrep
                  ? "Move to the application path once an official score meets the requirement. The move happens at the admission agreement."
                  : "English requirement met. Build the shortlist with the student, then send the admission package offer."}
              </p>
              <Button disabled={testPrep} variant={testPrep ? "soft" : "primary"}>
                {testPrep ? "Move to application path · available when English is met" : "Send admission offer"}
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Documents" subtitle="Status only; open files from the review queue." />
            <Facts rows={[["Personal information", testPrep ? "Not started" : "Complete"], ["Passport", testPrep ? "Not started" : "Approved"], ["Transcript", testPrep ? "Not started" : "In review"], ["Financial documents", "Not started"]]} />
          </Card>
          <Card>
            <CardHeader title="Application accounts" subtitle="Opened and managed by 4Prep" />
            <Facts rows={[["US · Common App", testPrep ? "Not started" : "Open"], ["Canada · OUAC / university", "Not started"], ["Europe · national / university", "Not started"]]} />
          </Card>
          <Card>
            <CardHeader title="Applications" />
            <Facts rows={[["Applications", s.applications], ["Next deadline", s.nextDeadline], ["Submission", "4Prep submits after student approval"]]} />
          </Card>
          <Card>
            <CardHeader title="Grants & offers" />
            <Facts rows={[["Offers", "Not received"], ["Grant", "Not available"], ["Family cost comparison", "Not started"]]} />
          </Card>
          <Card>
            <CardHeader title="Visa" />
            <Facts rows={[["Current step", "Not started"], ["Mock interviews", "None yet"], ["Attempt", "—"]]} />
          </Card>
          <Card>
            <CardHeader title="Meetings and payments" />
            <Facts rows={[["Next meeting", "Not set"], [testPrep ? "Class agreement" : "Admission agreement", testPrep ? "Paid" : "Signed and paid"]]} />
          </Card>
        </div>

        <Card>
          <CardHeader title="Notes · internal staff only" subtitle="Never visible to the student or parent." />
          <label htmlFor="note" className="sr-only">New internal note</label>
          <Textarea id="note" placeholder="Add an internal note…" />
          <div className="mt-3 flex justify-end"><Button variant="dark" size="sm">Save note</Button></div>
        </Card>
      </div>
    </>
  );
}
