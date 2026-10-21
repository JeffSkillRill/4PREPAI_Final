"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  FileText,
  FolderOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Library,
  Lock,
  LogOut,
  MailOpen,
  Menu,
  MessageSquare,
  PenLine,
  Plane,
  Route,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

type NavItem = { label: string; href: string; icon: LucideIcon; exact?: boolean };

/*
 * Navigation per area. Icons live in this client file because component
 * references cannot be passed from Server to Client Components.
 */
const studentNav: NavItem[] = [
  { label: "Home", href: "/app", icon: Home, exact: true },
  { label: "My Plan", href: "/plan", icon: Route },
  { label: "Applications", href: "/app/applications", icon: GraduationCap },
  { label: "Personal info & documents", href: "/app/documents", icon: FileText },
  { label: "Essays", href: "/app/essays", icon: PenLine },
  { label: "Recommendations", href: "/app/recommendations", icon: MailOpen },
  { label: "Test prep", href: "/app/test-prep", icon: BookOpen },
  { label: "Classes", href: "/app/classes", icon: Library },
  { label: "Grants & offers", href: "/app/offers", icon: Award },
  { label: "Visa", href: "/app/visa", icon: Plane },
  { label: "Meetings", href: "/app/meetings", icon: Calendar },
  { label: "Messages", href: "/app/messages", icon: MessageSquare },
  { label: "Payments", href: "/app/payments", icon: CreditCard },
  { label: "My team", href: "/app/team", icon: Users },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

const familyNav: NavItem[] = [
  { label: "Child progress", href: "/family", icon: BarChart3, exact: true },
  { label: "Applications", href: "/family/applications", icon: GraduationCap },
  { label: "Calendar", href: "/family/calendar", icon: Calendar },
  { label: "Messages", href: "/family/messages", icon: MessageSquare },
];

export type StaffRoleView = "Super Admin" | "Mentor Admin" | "Mentor" | "Teacher";

const staffNav: Record<StaffRoleView, NavItem[]> = {
  "Super Admin": [
    { label: "Overview", href: "/staff", icon: LayoutDashboard, exact: true },
    { label: "Users & roles", href: "/staff/users", icon: Users },
    { label: "Products & payments", href: "/staff/products", icon: CreditCard },
    { label: "Agreements", href: "/staff/agreements", icon: FileText },
    { label: "University catalogue", href: "/staff/catalogue", icon: Library },
    { label: "Results (verified)", href: "/staff/results", icon: TrendingUp },
    { label: "Settings", href: "/staff/settings", icon: Settings },
    { label: "Audit log", href: "/staff/audit", icon: Lock },
  ],
  "Mentor Admin": [
    { label: "Pipeline", href: "/staff/pipeline", icon: Workflow },
    { label: "All students", href: "/staff/students", icon: Users },
    { label: "Families", href: "/staff/users", icon: ShieldCheck },
    { label: "Approvals", href: "/staff/approvals", icon: ClipboardCheck },
  ],
  Mentor: [
    { label: "My students", href: "/staff/students", icon: Users },
    { label: "Review queues", href: "/staff/reviews", icon: FolderOpen },
    { label: "Calendar", href: "/staff/calendar", icon: Calendar },
    { label: "Tasks", href: "/staff/tasks", icon: Check },
    { label: "Messages", href: "/staff/messages", icon: MessageSquare },
  ],
  Teacher: [
    { label: "My classes", href: "/staff/classes/ielts-g65-nov-b", icon: BookOpen },
    { label: "Attendance", href: "/staff/attendance", icon: Check },
    { label: "Scores", href: "/staff/scores", icon: TrendingUp },
    { label: "Materials", href: "/staff/materials", icon: FileText },
  ],
};

const staffHome: Record<StaffRoleView, string> = {
  "Super Admin": "/staff",
  "Mentor Admin": "/staff/pipeline",
  Mentor: "/staff/students",
  Teacher: "/staff/classes/ielts-g65-nov-b",
};

const staffUser: Record<StaffRoleView, { name: string; role: string }> = {
  "Super Admin": { name: "Jahongir B.", role: "Super Admin" },
  "Mentor Admin": { name: "Rustam K.", role: "Mentor Admin" },
  Mentor: { name: "Madina S.", role: "Mentor" },
  Teacher: { name: "Ms. Rakhimova", role: "Teacher" },
};

/** Pick the staff role view from the URL so each staff screen shows its own menu. */
function roleFromPath(pathname: string): StaffRoleView {
  if (pathname.startsWith("/staff/pipeline") || pathname.startsWith("/staff/approvals")) return "Mentor Admin";
  if (pathname.startsWith("/staff/students")) return "Mentor";
  if (pathname.startsWith("/staff/classes")) return "Teacher";
  return "Super Admin";
}

function isActive(pathname: string, item: NavItem) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");
}

export function AppShell({
  area,
  children,
}: {
  area: "student" | "family" | "staff";
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dark = area !== "student";
  const role = roleFromPath(pathname);

  const items = area === "student" ? studentNav : area === "family" ? familyNav : staffNav[role];
  const user =
    area === "student"
      ? { name: "Jasur Aliyev", role: "Bachelor's · Fall 2027 · Application path" }
      : area === "family"
        ? { name: "D. Karimova", role: "Parent" }
        : staffUser[role];

  const sidebar = (
    <div className="flex h-full flex-col gap-1 p-[18px]">
      <div className="flex items-center gap-2 px-2 py-3">
        <Logo size="sm" inverted={dark} href={area === "student" ? "/app" : area === "family" ? "/family" : "/staff"} />
        {area === "staff" ? (
          <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold text-brand-900">STAFF</span>
        ) : null}
        {area === "family" ? (
          <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold text-brand-900">PARENT</span>
        ) : null}
      </div>

      {area === "staff" ? (
        <label className="mb-3 block rounded-[16px] bg-white/10 px-3.5 py-2.5">
          <span className="block text-[10px] font-semibold tracking-[1px] text-brand-200">VIEWING AS</span>
          <span className="relative block">
            <select
              aria-label="Switch staff view"
              value={role}
              onChange={(e) => {
                setOpen(false);
                router.push(staffHome[e.target.value as StaffRoleView]);
              }}
              className="w-full appearance-none bg-transparent pr-6 text-[14px] font-bold text-white outline-none [&>option]:text-brand-900"
            >
              {(Object.keys(staffNav) as StaffRoleView[]).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-brand-200" />
          </span>
        </label>
      ) : null}

      {area === "family" ? (
        <div className="mb-3 rounded-[16px] bg-white/10 px-3.5 py-2.5">
          <span className="block text-[10px] font-semibold tracking-[1px] text-brand-200">YOUR FAMILY SPACE</span>
          <span className="block text-[14px] font-bold text-white">Parent portal</span>
        </div>
      ) : null}

      <nav aria-label="Sections" className="flex flex-col gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-[14px] px-3.5 py-2.5 text-[14.5px] transition-colors",
                active
                  ? "bg-brand-gradient font-bold text-white shadow-glow"
                  : dark
                    ? "font-medium text-brand-100/90 hover:bg-white/10"
                    : "font-medium text-ink-700 hover:bg-white/70",
              )}
            >
              <Icon className="size-[19px] shrink-0" aria-hidden />
              <span className="leading-snug">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {area === "staff" ? (
        <div className="mb-2 flex items-center gap-2 rounded-[12px] bg-lime/15 px-3 py-2 text-[12px] font-semibold text-lime">
          <ShieldCheck className="size-4" aria-hidden /> 2-factor on · session 12 h
        </div>
      ) : null}

      <div
        className={cn(
          "flex items-center gap-3 rounded-[18px] p-3.5",
          dark ? "bg-white/10" : "bg-white/70",
        )}
      >
        <Avatar name={user.name} size={40} ring />
        <div className="min-w-0 flex-1">
          <p className={cn("truncate text-[14px] font-bold", dark ? "text-white" : "text-brand-900")}>
            {user.name}
          </p>
          <p className={cn("text-[12px] leading-snug", dark ? "text-brand-200" : "text-ink-500")}>
            {user.role}
          </p>
        </div>
        <Link
          href="/"
          aria-label="Log out"
          className={cn("rounded-full p-1.5", dark ? "text-brand-200 hover:bg-white/10" : "text-ink-500 hover:bg-white")}
        >
          <LogOut className="size-4" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative flex min-h-dvh">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-dvh w-[260px] shrink-0 overflow-y-auto lg:block",
          dark ? "bg-gradient-to-b from-brand-800 to-brand-900" : "glass rounded-none border-y-0 border-l-0",
        )}
      >
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-brand-900/40"
            onClick={() => setOpen(false)}
          />
          <aside
            className={cn(
              "absolute inset-y-0 left-0 w-[290px] overflow-y-auto shadow-glass",
              dark ? "bg-gradient-to-b from-brand-800 to-brand-900" : "bg-surface",
            )}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className={cn("absolute right-3 top-4 rounded-full p-2", dark ? "text-white" : "text-brand-800")}
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div
          className={cn(
            "sticky top-0 z-30 flex items-center justify-between px-4 py-3 lg:hidden",
            dark ? "bg-brand-900" : "glass rounded-none border-x-0 border-t-0",
          )}
        >
          <Logo size="sm" inverted={dark} />
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={cn("rounded-full p-2", dark ? "text-white" : "text-brand-800")}
          >
            <Menu className="size-5" />
          </button>
        </div>
        <main className="relative isolate flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
