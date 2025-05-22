import { onCall } from "firebase-functions/v2/https";
import { db } from "./firebase";
import { OpenAI } from "openai";
import { OPENAI_API_KEY } from "./secrets";

export const rewriteArticle = onCall(
  {
    secrets: [OPENAI_API_KEY],
    region: "asia-northeast1",
    memory: "512MiB",
    timeoutSeconds: 60,
  },
  async (req) => {
    const { slug, suggestedTitle, suggestedOutline } = req.data;

    if (!slug || !suggestedTitle || !suggestedOutline) {
      throw new Error("Missing slug, suggestedTitle, or suggestedOutline");
    }

    const blogDoc = await db.collection("blogs").doc(slug).get();
    const oldContent = blogDoc.data()?.content || "";

    const prompt = `
あなたはSEO記事の専門ライターです。
以下の条件で日本語のMarkdown記事を新たにリライトしてください。

# 条件
- タイトル: ${suggestedTitle}
- 見出し構成: ${JSON.stringify(suggestedOutline, null, 2)}
- トーン: 読みやすく親しみやすい
- Markdown形式で生成（# や ## 見出し含む）
- 過去の内容も参考にして構成・情報を強化してください。

# 以前の記事内容（参考用）
${oldContent}
`;

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

    const chatRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const newContent = chatRes.choices[0]?.message?.content ?? "";

    const now = new Date();

    await db
      .collection("blogs")
      .doc(slug)
      .set(
        {
          revisedContent: newContent,
          updatedAt: now,
          analysisHistory: {
            revisedAt: now,
            content: newContent,
            title: suggestedTitle,
            outline: suggestedOutline,
          },
        },
        { merge: true }
      );

    return {
      message: "✅ リライト生成完了",
      revisedContent: newContent,
    };
  }
);
