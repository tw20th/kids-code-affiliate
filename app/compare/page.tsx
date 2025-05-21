// app/compare/page.tsx
import schools from '@/data/schools.json'
import ComparisonTable from '@/components/ComparisonTable'

export default function ComparePage() {
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">スクール比較一覧</h1>
      <p className="text-gray-600">
        子どもの年齢・特徴・料金などをもとに、自分に合ったスクールを選びましょう。
      </p>
      <ComparisonTable schools={schools} />
    </main>
  )
}
