import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { UsersPanel } from "./users-panel";

export const metadata: Metadata = { title: "Users & roles" };

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Users & roles"
        subtitle="Create staff and family accounts. Two-factor authentication is mandatory for staff."
      />
      <UsersPanel />
    </>
  );
}
