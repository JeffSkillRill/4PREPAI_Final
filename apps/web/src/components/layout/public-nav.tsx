"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "About" },
  { href: "/universities", label: "Universities" },
  { href: "/counselor", label: "AI Counselor" },
  { href: "/courses", label: "Courses" },
  { href: "/news", label: "News" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Floating glass pill navigation (Figma: Nav pill).
 * `member` swaps "Log in / Create free plan" for "My Plan" + avatar.
 */
export function PublicNav({
  member,
}: {
  member?: { initials: string; name: string };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-8 lg:px-20 lg:pt-6">
      <nav
        aria-label="Main"
        className="glass flex items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 lg:px-6"
      >
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={cn(
                  "text-[15px] transition-colors hover:text-brand-600",
                  isActive(pathname, l.href)
                    ? "font-bold text-brand-600"
                    : "font-medium text-ink-700",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-4">
          {member ? (
            <Link href="/plan" className="flex items-center gap-3">
              <span className="hidden text-[15px] font-semibold text-brand-600 sm:inline">
                My Plan
              </span>
              <Avatar name={member.name} size={36} />
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="hidden text-[15px] font-semibold text-brand-800 sm:inline"
              >
                Log in
              </Link>
              <ButtonLink href="/register" size="sm" className="h-10 px-5 sm:h-11 sm:px-7 sm:text-[15px]">
                Create free plan
              </ButtonLink>
            </>
          )}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="glass mt-2 rounded-[24px] p-3 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-[14px] px-4 py-3 text-[15px]",
                    isActive(pathname, l.href)
                      ? "bg-brand-100 font-bold text-brand-700"
                      : "font-medium text-ink-700",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {!member ? (
              <li>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block rounded-[14px] px-4 py-3 text-[15px] font-semibold text-brand-800"
                >
                  Log in
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
