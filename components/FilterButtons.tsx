"use client";

type Props = {
  categories: string[];
  selected: string | null;
  onSelect: (_cat: string | null) => void; // 引数名を _cat に変更
};

export default function FilterButtons({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded-full text-sm ${
          selected === null ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        すべて
      </button>
      {categories.map((cat: string) => (
        <button
          key={cat}
          aria-label={`カテゴリ ${cat}`}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded-full text-sm ${
            selected === cat ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
