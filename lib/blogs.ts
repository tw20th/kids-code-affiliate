import { db } from './firebase'
import { collection, doc, getDoc, getDocs, Timestamp } from 'firebase/firestore'

export type Blog = {
  slug: string
  title: string
  content: string
  createdAt: Timestamp
}

// ✅ 指定した slug のブログ記事を取得
export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const ref = doc(collection(db, 'blogs'), slug)
    const snap = await getDoc(ref)
    return snap.exists() ? (snap.data() as Blog) : null
  } catch (err) {
    console.error(`🔥 fetchBlogBySlug エラー: ${err}`)
    return null
  }
}

// ✅ 全ブログ記事を一覧取得（作成日時降順などに並び替えたい場合はここで対応）
export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const snapshot = await getDocs(collection(db, 'blogs'))
    return snapshot.docs
      .map((doc) => doc.data() as Blog)
      .filter((blog) => blog.slug && blog.title && blog.content) // 安全チェック
  } catch (err) {
    console.error(`🔥 fetchBlogs エラー: ${err}`)
    return []
  }
}
