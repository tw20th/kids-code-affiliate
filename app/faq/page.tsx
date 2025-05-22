// app/faq/page.tsx
const faqs = [
  {
    question: "何歳から始められますか？",
    answer: "スクールによって異なりますが、早いところでは年長（5歳）から学べます。",
  },
  {
    question: "パソコンが苦手でも大丈夫？",
    answer: "オンラインで親子で学べる講座や、教室での丁寧なサポートがあるので安心です。",
  },
  {
    question: "無料体験はありますか？",
    answer: "ほとんどのスクールで無料体験が用意されています。まずは気軽に試してみましょう。",
  },
];

export default function FAQPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">よくある質問</h1>
      {faqs.map((faq, i) => (
        <div key={i} className="border-b py-4">
          <h2 className="font-semibold">{faq.question}</h2>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      ))}
    </main>
  );
}
