export async function verifyInformation(input: string, locale: string = "en-US") {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, locale }),
  });

  if (!response.ok) {
    throw new Error("Verification failed");
  }

  return response.json();
}
