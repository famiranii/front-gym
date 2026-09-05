import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import GetMe from "@/components/featchers/home/GetMe";

export const metadata: Metadata = {
  title: "آریا اسپرت",
  description: "فروشگاه تجهیزات ورزشی آریا",
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
          <Providers>
            <GetMe/>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
