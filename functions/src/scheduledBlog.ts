import { onSchedule } from "firebase-functions/v2/scheduler";
import { OpenAI } from "openai";
import slugify from "slugify";
import { db } from "./firebase";
import { OPENAI_API_KEY } from "./secrets";

// 🔽 Unsplash画像取得（エラー時はnull）
async function fetchUnsplashImage(keyword: string): Promise<string | null> {
  try {
    const fetch = (await import("node-fetch")).default;

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        keyword
      )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    interface UnsplashApiResponse {
      results?: {
        urls?: {
          regular?: string;
        };
      }[];
    }

    const json: unknown = await res.json();

    if (
      typeof json === "object" &&
      json !== null &&
      "results" in json &&
      Array.isArray((json as UnsplashApiResponse).results)
    ) {
      const data = json as UnsplashApiResponse;
      return data.results?.[0]?.urls?.regular ?? null;
    }

    return null;
  } catch (error) {
    console.error("❌ Unsplash image fetch error:", error);
    return null;
  }
}

export const scheduledBlog = onSchedule(
  {
    schedule: "every day 06:00",
    timeZone: "Asia/Tokyo",
    secrets: [OPENAI_API_KEY],
    region: "asia-northeast1",
    memory: "512MiB",
    timeoutSeconds: 180,
  },
  async (_event) => {
    console.log("⏰ scheduledBlog triggered");

    try {
      const openai = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

      const prompt = `
あなたはSEOに強い日本語ブログライターです。
以下のテーマに基づいて、子供向けプログラミングスクールについて、見出し付きの記事をMarkdown形式で生成してください。

# テーマ
子供向けプログラミングスクールの選び方とおすすめ3選

# 条件
- 最初の行に「# 記事タイトル」を必ず含めてください
- h2 (##), h3 (###) の構成で6〜8セクション
- 読みやすく、親向けのわかりやすい言葉で
- Markdown形式で出力してください
`;

      const chatRes = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = chatRes.choices[0]?.message?.content ?? "";
      const titleMatch = responseText.match(/^#\s+(.{5,100})/m);

      if (!titleMatch || !titleMatch[1].trim()) {
        throw new Error(`❌ タイトル抽出失敗（titleMatch: ${JSON.stringify(titleMatch)}）`);
      }

      const title = titleMatch[1].trim();
      const rawSlug = slugify(title, { lower: true, strict: true });
      const slug = rawSlug.length >= 3 ? rawSlug : `blog-${Date.now().toString(36)}`;

      if (!slug || slug.length < 3) {
        throw new Error(`❌ slugが不正です: ${slug}`);
      }

      console.log("🔤 title:", title);
      console.log("🔗 slug:", slug);

      const createdAt = new Date();
      const imageUrl = await fetchUnsplashImage(title);

      const blogData = {
        slug,
        title,
        content: responseText,
        imageUrl,
        createdAt,
        updatedAt: createdAt,
      };

      await db.collection("blogs").doc(slug).set(blogData);
      console.log(`✅ Scheduled blog created: ${title} (${slug})`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ scheduledBlog error:", error.message);
      } else {
        console.error("❌ scheduledBlog error:", error);
      }
    }
  }
);
