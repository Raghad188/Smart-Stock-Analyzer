import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "محلل الأسهم الذكي | Smart Stock Analyzer",
  description: "منصة ذكية لتحليل أخبار السوق السعودي واستشراف حركة الأسهم",
  icons: { icon: "/logo.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
