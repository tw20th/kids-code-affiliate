// lib/unsplash.ts
export async function fetchUnsplashImage(keyword: string): Promise<string | null> {
  const tryFetch = async (query: string) => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();
    return data.results?.[0]?.urls?.regular ?? null;
  };

  const image = await tryFetch(keyword);
  if (image) return image;

  // 英語キーワードへのフォールバック（例: 子供→kids）
  const fallbackKeyword = keyword.includes("子") ? "kids programming" : "education";
  return await tryFetch(fallbackKeyword);
}
