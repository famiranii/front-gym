import type { Metadata } from "next";
import "./globals.css";
import "material-symbols";

import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://cheheltike.com"),
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
