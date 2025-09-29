import type { Metadata } from "next";
import Link from "next/link";
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
            <div className="absolute inset-x-0 top-0 flex justify-center pt-6">
              <Link href="/" className="flex items-center space-x-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
                <span>CREDEXIS</span>
              </Link>
            </div>
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
