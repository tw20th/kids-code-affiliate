export async function fetchUnsplashImage(keyword: string): Promise<string | null> {
  const fetch = (await import("node-fetch")).default;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = (await res.json()) as {
    results?: { urls?: { regular?: string } }[];
  };
  return data.results?.[0]?.urls?.regular ?? null;
}
