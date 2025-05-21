import { notFound } from 'next/navigation'
import schools from '@/data/schools.json'
import SchoolCard from '@/components/SchoolCard'

type Props = {
  params: { tag: string }
}

export default function CategoryPage({ params }: Props) {
  const { tag } = params
  const filtered = schools.filter((school) => school.category?.includes(tag))

  if (filtered.length === 0) return notFound()

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        「{tag}」カテゴリのスクール一覧
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((school) => (
          <SchoolCard key={school.id} {...school} />
        ))}
      </div>
    </main>
  )
}
