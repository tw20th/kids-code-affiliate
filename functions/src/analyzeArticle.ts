import { onCall } from "firebase-functions/v2/https";
import { db } from "./firebase";
import { OpenAI } from "openai";
import { OPENAI_API_KEY } from "./secrets";

export const analyzeArticle = onCall(
  {
    secrets: [OPENAI_API_KEY],
    region: "asia-northeast1",
    memory: "512MiB",
    timeoutSeconds: 60,
  },
  async (req) => {
    const { slug, content } = req.data;

    if (!slug || !content) {
      throw new Error("Missing slug or content");
    }

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

    const prompt = `
あなたはSEO記事のプロ編集者です。以下の記事を分析し、スコアと改善点を日本語で提示してください。

# 出力形式
- score（100点満点で整数）
- improvement（改善点）
- suggestedTitle（提案タイトル）
- suggestedOutline（見出し案配列）

# 記事内容
${content}
`;

    const chatRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const analysisText = chatRes.choices[0]?.message?.content ?? "";

    const scoreMatch = analysisText.match(/score[：: ]?(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;

    const improvementMatch = analysisText.match(/improvement[：: ]?(.+)/i);
    const improvement = improvementMatch
      ? improvementMatch[1].trim()
      : "明確な改善点が検出されませんでした。";

    const titleMatch = analysisText.match(/suggestedTitle[：: ]?(.+)/i);
    const suggestedTitle = titleMatch ? titleMatch[1].trim() : "提案タイトル未記載";

    const outlineMatch = analysisText.match(/suggestedOutline[：: ]?\[(.*?)\]/s);
    const suggestedOutline = outlineMatch ? JSON.parse(`[${outlineMatch[1]}]`) : [];

    const updateData = {
      analysis: {
        analyzedAt: new Date(),
        score,
        improvement,
        suggestedTitle,
        suggestedOutline,
      },
      analysisHistory: {
        updatedAt: new Date(),
        score,
        title: suggestedTitle,
        content,
      },
    };

    await db.collection("blogs").doc(slug).set(updateData, { merge: true });

    return {
      message: "✅ 分析が完了しました",
      ...updateData.analysis,
    };
  }
);
