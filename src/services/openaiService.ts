import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getGenresFromMood(mood: string): Promise<string[]> {
  const prompt = `
You are a helpful movie recommendation assistant.

Given the user's mood: "${mood}", suggest exactly 3 movies or relevant keywords/genres that match this mood.  
- Provide the response as a comma-separated list without extra explanation.  
- Keep each item short (1-3 words).  
- Avoid phrases, just titles or keywords.  
- Examples: "romantic comedy", "thriller", "The Shawshank Redemption".

Return only the list, no additional text.
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [{ role: "user", content: prompt }],
  });

  const text = completion.choices[0]?.message?.content ?? "";
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
