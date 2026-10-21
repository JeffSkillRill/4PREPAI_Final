import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Plus Jakarta Sans, self-hosted (variable weight 200–800) so builds and
// pages never depend on Google Fonts being reachable.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-VF.ttf",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "4Prep Academy — study in the USA, Canada and Europe",
    template: "%s · 4Prep",
  },
  description:
    "4Prep Academy helps students from Central Asia prepare, apply and get their student visa for universities in the USA, Canada and Europe.",
};

export const viewport: Viewport = {
  themeColor: "#f4fbf7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
