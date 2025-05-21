// components/SchoolCard.tsx
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: string // ← 追加
  name: string
  price: string
  ageRange: string
  features: string[]
  image: string
}

export default function SchoolCard({
  id,
  name,
  price,
  ageRange,
  features,
  image,
}: Props) {
  return (
    <div className="border rounded-2xl shadow p-4 flex flex-col gap-2 hover:shadow-md transition">
      <Image
        src={image}
        alt={name}
        width={400}
        height={200}
        className="rounded-xl object-cover w-full h-40"
      />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">対象年齢: {ageRange}</p>
      <p className="text-sm text-gray-600">料金: {price}</p>
      <ul className="flex flex-wrap gap-2 mt-2 text-xs text-white">
        {features.map((feature, i) => (
          <li key={i} className="bg-blue-500 rounded-full px-2 py-1">
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={`/schools/${id}`}
        className="mt-auto text-center bg-green-600 text-white font-bold py-2 rounded-xl hover:bg-green-700 block"
      >
        詳細を見る
      </Link>
    </div>
  )
}
