"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  // カテゴリ一覧を定義（必要に応じて増やせます）
  const categories = ["online", "minecraft", "教室型"];

  return (
    <header className="bg-blue-600 text-white px-6 py-4 sticky top-0 z-50 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          キッズ・コード比較
        </Link>

        {/* モバイルメニュー */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-2xl">
            ☰
          </button>
        </div>

        {/* PCメニュー */}
        <nav className="hidden md:flex gap-4 text-sm items-center">
          <Link href="/compare">比較</Link>
          <Link href="/ranking">ランキング</Link>

          {/* カテゴリリンク（PC用） */}
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="hover:underline"
            >
              {cat}
            </Link>
          ))}

          <Link href="/faq">Q&A</Link>
          <Link href="/blog">ブログ</Link>
          <Link href="/about">運営者情報</Link>
        </nav>
      </div>

      {/* モバイルドロワー */}
      {open && (
        <div className="md:hidden bg-blue-700 text-white p-4 space-y-2">
          <Link href="/compare" onClick={() => setOpen(false)}>
            比較
          </Link>
          <Link href="/ranking" onClick={() => setOpen(false)}>
            ランキング
          </Link>

          {/* カテゴリリンク（モバイル用） */}
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              onClick={() => setOpen(false)}
            >
              {cat}
            </Link>
          ))}

          <Link href="/faq" onClick={() => setOpen(false)}>
            Q&A
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            ブログ
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            運営者情報
          </Link>
        </div>
      )}
    </header>
  );
}
