// app/blog/page.tsx
import { fetchBlogs } from '@/lib/blogs'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ブログ記事一覧',
  description: '子ども向けプログラミング教育に関する記事一覧ページです。',
}

export default async function BlogListPage() {
  const blogs = await fetchBlogs()

  if (!blogs || blogs.length === 0) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700">ブログ記事一覧</h1>
        <p className="text-gray-500 mt-4">記事がまだありません。</p>
      </main>
    )
  }

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">ブログ記事一覧</h1>
      {blogs.map((blog) => (
        <div key={blog.slug} className="border-b py-4">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-sm text-gray-500">
            {blog.createdAt?.seconds
              ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
              : '日付なし'}
          </p>
          <Link
            href={`/blog/${blog.slug}`}
            className="text-blue-600 underline text-sm"
          >
            記事を読む →
          </Link>
        </div>
      ))}
    </main>
  )
}
