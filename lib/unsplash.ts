// lib/unsplash.ts
export async function fetchUnsplashImage(
  keyword: string
): Promise<string | null> {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      keyword
    )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  )
  const data = await res.json()
  return data.results?.[0]?.urls?.regular ?? null
}
