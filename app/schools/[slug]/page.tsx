// app/schools/[slug]/page.tsx
import { notFound } from 'next/navigation'
import schools from '@/data/schools.json'
import Image from 'next/image'

type Params = {
  slug: string
}

export default function SchoolDetail({ params }: { params: Params }) {
  const school = schools.find((s) => s.id === params.slug)
  if (!school) return notFound()

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{school.name}</h1>
      <Image
        src={school.image}
        alt={school.name}
        width={600}
        height={300}
        className="rounded-xl"
      />
      <p>{school.description}</p>
      <div className="bg-gray-100 p-4 rounded-lg space-y-2">
        <p>
          <strong>対象年齢：</strong>
          {school.ageRange}
        </p>
        <p>
          <strong>料金：</strong>
          {school.price}
        </p>
        <p>
          <strong>特徴：</strong>
          {school.features.join(' / ')}
        </p>
      </div>
      <a
        href={school.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
      >
        無料体験・詳細をみる
      </a>
    </main>
  )
}
