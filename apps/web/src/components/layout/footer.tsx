import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const cols = [
  {
    title: "Explore",
    links: [
      ["About", "/"],
      ["Universities", "/universities"],
      ["AI Counselor", "/counselor"],
      ["Courses", "/courses"],
    ],
  },
  {
    title: "Academy",
    links: [
      ["Join 4Prep Academy", "/apply"],
      ["Book a meeting", "/book"],
      ["News", "/news"],
      ["Partners", "/partners"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-900 px-4 pb-8 pt-14 text-white sm:px-8 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-[300px]">
          <Logo inverted />
          <p className="mt-4 text-[14px] leading-6 text-brand-200/90">
            4Prep Academy helps you plan, prepare and win your university
            application — with real mentors and a free AI counselor.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[13px] font-bold text-lime">{c.title}</p>
              <ul className="mt-3 space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-[14px] text-brand-100/90 hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-[13px] font-bold text-lime">Contact</p>
            <ul className="mt-3 space-y-2.5 text-[14px] text-brand-100/90">
              <li>Tashkent, Uzbekistan</li>
              <li>
                <a href="mailto:hello@4prep.uz" className="hover:text-white">
                  hello@4prep.uz
                </a>
              </li>
              <li>+998 90 000 00 00</li>
              <li>Mon–Sat, 9:00–18:00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-white/10 pt-6 text-[12px] text-brand-200/80">
        © 2026 4Prep Academy · Terms of use · Privacy Policy
      </div>
    </footer>
  );
}
