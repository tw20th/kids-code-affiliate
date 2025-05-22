"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebaseClient";
import Link from "next/link";
import { fetchUnsplashImage } from "@/lib/unsplash";

const db = getFirestore(app);

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "blogs"));
      const blogData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageUrl = await fetchUnsplashImage(data.title);
          return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            content: data.content,
            imageUrl,
          };
        })
      );
      setBlogs(blogData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📝 ブログ一覧</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg p-4 shadow">
            {blog.imageUrl && (
              <img src={blog.imageUrl} alt="記事画像" className="mb-4 rounded-md" />
            )}
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 line-clamp-3">{blog.content.slice(0, 100)}...</p>
            <Link href={`/blog/${blog.slug}`} className="text-blue-500 mt-2 inline-block">
              続きを読む
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
