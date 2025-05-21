import { fetchBlogBySlug } from '@/lib/blogs'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

type Props = {
  params: { slug: string }
}

// ✅ SEO対応（ページごとの title, description, OGP 出力）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await fetchBlogBySlug(params.slug)

  if (!blog) {
    return { title: '記事が見つかりません' }
  }

  return {
    title: blog.title,
    description: blog.content.slice(0, 100) + '…',
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 100) + '…',
      url: `https://あなたのドメイン/blog/${blog.slug}`,
      siteName: 'キッズ・コード比較',
      images: [
        {
          url: 'https://あなたのドメイン/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
    },
  }
}

// ✅ ブログ詳細ページ本体
export default async function BlogDetailPage({ params }: Props) {
  const blog = await fetchBlogBySlug(params.slug)

  if (!blog) return notFound()

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">{blog.title}</h1>
      <div className="text-sm text-gray-500">
        {blog.createdAt?.seconds
          ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
          : '日付なし'}
      </div>
      <div className="prose max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </main>
  )
}
