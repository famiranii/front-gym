import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen flex flex-col text-right">
        {children}
      </body>
    </html>
  );
}