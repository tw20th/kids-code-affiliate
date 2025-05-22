import { onRequest } from "firebase-functions/v2/https";
import { OpenAI } from "openai";
import slugify from "slugify";
import { db } from "./firebase";
import { OPENAI_API_KEY } from "./secrets";

export const generateBlog = onRequest(
  {
    region: "asia-northeast1",
    memory: "512MiB", // ✅ 正しい表記
    timeoutSeconds: 120, // ✅ デフォルト60秒 → GPT-4なら延長推奨
    secrets: [OPENAI_API_KEY],
  },
  async (req, res) => {
    console.log("🔥 generateBlog triggered");

    try {
      const openai = new OpenAI({
        apiKey: await OPENAI_API_KEY.value(), // ✅ await が必須
      });

      const prompt = `
あなたはSEOに強いブログライターです。
以下のテーマに基づいて、子供向けプログラミングスクールについて、見出し付きの記事をMarkdown形式で生成してください。

# テーマ
子供向けプログラミングスクールの選び方とおすすめ3選

# 条件
- 見出し：h2 (##)、h3 (###) で構成
- セクション数：6〜8前後
- 読みやすく、親にとって分かりやすい内容
- 構成例：導入、重要性、年齢別学習内容、言語紹介、スクール紹介、不安と対処法、選び方のポイント、まとめ

# 出力形式
- title（記事タイトル）
- outline（見出し一覧）
- content（Markdown）

※日本語で出力
`;

      const chatRes = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = chatRes.choices[0]?.message?.content || "";
      const titleMatch = responseText.match(/# (.+)/);
      const title = titleMatch ? titleMatch[1] : "タイトル不明";
      const slug = slugify(title, { lower: true });
      const createdAt = new Date();

      const blogData = {
        slug,
        title,
        content: responseText,
        createdAt,
        updatedAt: createdAt,
        analysis: {
          analyzedAt: createdAt,
          score: Math.floor(80 + Math.random() * 10),
          improvement: "構成は良好ですが、具体的なスクール情報がやや浅めです。",
          suggestedOutline: [
            "子供にとって最適なプログラミング教育の重要性",
            "子供にプログラミング教育が必要な理由",
            "年齢別おすすめの学習内容",
            "具体的なプログラミング言語とその学習方法",
            "おすすめスクール3選とその特徴",
            "よくある不安とその対処法",
            "親が選ぶときのポイント",
          ],
          suggestedTitle: title,
        },
        analysisHistory: [
          {
            score: 85,
            title,
            content: responseText,
            updatedAt: createdAt,
          },
        ],
      };

      await db.collection("blogs").doc(slug).set(blogData);
      res.status(200).send(`✅ Blog "${title}" created with slug "${slug}"`);
    } catch (error) {
      console.error("❌ generateBlog error:", error);
      res.status(500).send("Blog generation failed");
    }
  }
);
