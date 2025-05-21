// components/Layout.tsx
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            キッズ・コード比較
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/compare" className="hover:underline">
              比較
            </Link>
            <Link href="/faq" className="hover:underline">
              Q&A
            </Link>
            <Link href="/blog" className="hover:underline">
              ブログ
            </Link>
            <Link href="/about" className="hover:underline">
              運営者情報
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} キッズ・コード比較 |
        すべての子どもにITの力を。
      </footer>
    </div>
  )
}
