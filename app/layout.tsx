// app/layout.tsx
import * as React from "react";

import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "子供向けプログラミングスクール比較サイト",
  description: "小学生・中学生におすすめのプログラミングスクールを紹介・比較します。",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "子供向けプログラミングスクール比較サイト",
    description: "目的・年齢にあったおすすめスクールを紹介！",
    url: "https://your-site.com",
    siteName: "キッズ・コード比較",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "子供向けプログラミングスクール比較サイト",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-100 text-center py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} キッズ・コード比較
        </footer>
      </body>
    </html>
  );
}
