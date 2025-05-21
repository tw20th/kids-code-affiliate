'use client'

import { useState } from 'react'
import schools from '@/data/schools.json'
import SchoolCard from '@/components/SchoolCard'
import ComparisonTable from '@/components/ComparisonTable'
import FilterButtons from '@/components/FilterButtons'
import Link from 'next/link'

export default function HomePage() {
  const [selected, setSelected] = useState<string | null>(null)

  const categories = Array.from(
    new Set(schools.flatMap((s) => s.category || []))
  )

  const filteredSchools = selected
    ? schools.filter((s) => s.category?.includes(selected))
    : schools

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-12">
      {/* Hero セクション */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
          子ども向けプログラミングスクール比較サイト
        </h1>
        <p className="text-gray-600">
          年齢や目的に合わせて、お子さまにぴったりのスクールを選びましょう。
        </p>
      </section>

      {/* フィルターセクション */}
      <section>
        <h2 className="text-xl font-bold mb-4">カテゴリで探す</h2>
        <FilterButtons
          categories={categories}
          selected={selected}
          onSelect={setSelected}
        />
      </section>

      {/* おすすめスクールセクション */}
      <section>
        <h2 className="text-xl font-bold mb-4">おすすめスクール</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} {...school} />
          ))}
        </div>
      </section>

      {/* 比較表セクション */}
      <section>
        <h2 className="text-xl font-bold mb-4">スクール比較</h2>
        <ComparisonTable schools={filteredSchools} />
        <div className="text-right mt-2">
          <Link
            href="/compare"
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            もっと詳しく比較を見る →
          </Link>
        </div>
      </section>

      {/* 各ページ導線 */}
      <section className="grid md:grid-cols-3 gap-6 text-center">
        <Link
          href="/faq"
          className="p-6 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition"
        >
          よくある質問
        </Link>
        <Link
          href="/blog"
          className="p-6 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition"
        >
          ブログ記事一覧
        </Link>
        <Link
          href="/about"
          className="p-6 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition"
        >
          サイト運営者について
        </Link>
      </section>
    </main>
  )
}
