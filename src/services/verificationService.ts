export interface VerificationResult {
  veracity: 'True' | 'False' | 'Misleading' | 'Unverified' | 'Partially True';
  confidence: number;
  summary: string;
  analysis: string;
  sources: Array<{ title: string; url: string }>;
}

export async function verifyInformation(
  input: string,
  locale: string = 'en-US'
): Promise<VerificationResult> {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, locale }),
  });

  if (!response.ok) {
    throw new Error("Failed to verify information.");
  }

  return response.json();
}
