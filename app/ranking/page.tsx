// app/ranking/page.tsx
import schools from '@/data/schools.json'
import SchoolCard from '@/components/SchoolCard'

export default function RankingPage() {
  const sorted = [...schools].sort((a, b) => b.score - a.score)

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-blue-700">
        人気スクールランキング
      </h1>
      <p className="text-gray-600">
        評価スコアに基づいて人気順にランキング表示しています。
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((school, index) => (
          <div key={school.id} className="relative">
            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full shadow">
              {index + 1} 位
            </div>
            <SchoolCard {...school} />
          </div>
        ))}
      </div>
    </main>
  )
}
