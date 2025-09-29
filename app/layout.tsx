import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CREDEXIS - UK Companies House Data",
  description: "Access and analyze UK company financial data and accounts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <Link
              href="/"
              className="absolute left-6 top-6 flex items-center gap-2 text-lg font-semibold uppercase tracking-wide text-white"
            >
              <Image src="/credexis-logo.svg" alt="Credexis" width={32} height={32} priority />
              <span>Credexis</span>
            </Link>
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
