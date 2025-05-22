"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "next/navigation";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { app } from "@/lib/firebaseClient";
import ReactMarkdown from "react-markdown";

const db = getFirestore(app);

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "blogs", String(slug));
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title);
        setContent(data.content);
        const image = await fetchUnsplashImage(data.title);
        setImageUrl(image);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {imageUrl && <img src={imageUrl} alt="記事画像" className="mb-6 rounded-md shadow" />}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
          components={{
            h2: ({ node: _node, ...props }) => (
              <h2 className="text-xl mt-6 mb-2 font-bold" {...props} />
            ),
            h3: ({ node: _node, ...props }) => (
              <h3 className="text-lg mt-4 mb-1 font-semibold" {...props} />
            ),
            p: ({ node: _node, ...props }) => <p className="mb-2" {...props} />,
            ul: ({ node: _node, ...props }) => <ul className="list-disc ml-6 mb-2" {...props} />,
            ol: ({ node: _node, ...props }) => <ol className="list-decimal ml-6 mb-2" {...props} />,
            li: ({ node: _node, ...props }) => <li className="mb-1" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
