// components/ComparisonTable.tsx
type School = {
  name: string
  price: string
  ageRange: string
  features: string[]
}

type Props = {
  schools: School[]
}

export default function ComparisonTable({ schools }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">スクール名</th>
            <th className="px-4 py-2">対象年齢</th>
            <th className="px-4 py-2">料金</th>
            <th className="px-4 py-2">特徴</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2 font-semibold">{school.name}</td>
              <td className="px-4 py-2">{school.ageRange}</td>
              <td className="px-4 py-2">{school.price}</td>
              <td className="px-4 py-2">{school.features.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
