import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SimpleFooter } from "./components/Footer";
import { StickyNavbar } from "./components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agreements Online",
  description:
    "Auto-generate Ontario Standard Lease Agreement based on the information you provided.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StickyNavbar />
        {children}
        <Analytics />
        <SimpleFooter />
      </body>
    </html>
  );
}
