export default async function handler(req, res) {
  const API_KEY = process.env.GEMINI_API_KEY;

  const { input, locale } = req.body;

  const languageName =
    new Intl.DisplayNames(["en"], { type: "language" }).of(
      locale.split("-")[0]
    ) || "English";

  const systemInstruction = `You are an elite fact-checker.
Respond ONLY in JSON format.

{
  "veracity": "True" | "False" | "Misleading" | "Unverified" | "Partially True",
  "confidence": number,
  "summary": "1 sentence verdict in ${languageName}.",
  "analysis": "Short markdown analysis in ${languageName}.",
  "sources": []
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Verify this: ${input}` }] }],
        generationConfig: { response_mime_type: "application/json" },
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  res.status(200).json(JSON.parse(text));
}
