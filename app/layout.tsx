import type { Metadata } from "next";
import "./globals.css";
import "material-symbols";

import Providers from "@/components/Providers";

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "چهلتیکه",
    template: "%s | چهلتیکه",
  },
  description: "فروشگاه آنلاین چهلتیکه",
  applicationName: "چهلتیکه",
  openGraph: {
    title: "چهلتیکه",
    description: "فروشگاه آنلاین چهلتیکه",
    type: "website",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "چهلتیکه",
    description: "فروشگاه آنلاین چهلتیکه",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen text-right">
        <main className="w-full mx-auto">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
