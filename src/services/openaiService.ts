import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getGenresFromMood(mood: string): Promise<string[]> {
  const prompt = `Given this mood: "${mood}", suggest 3 movies or keywords (comma separated). Keep it short.`;

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
