import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input, locale } = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Verify this: ${input}`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const result = JSON.parse(response.text || "{}");

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Gemini failed" });
  }
}
