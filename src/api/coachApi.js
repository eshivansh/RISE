import { CONFIG } from "../config.js";

export async function askCoach(question) {
  if (!CONFIG.geminiApiKey) {
    return "Add VITE_GEMINI_API_KEY to .env to talk to the coach.";
  }
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    CONFIG.geminiModel +
    ":generateContent?key=" +
    CONFIG.geminiApiKey;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: "You are a short, friendly stock trading coach for beginners. This is a demo with virtual money; never give personal financial advice. Answer in plain text without markdown, in under 120 words." }] },
      contents: [{ parts: [{ text: question }] }],
    }),
  });
  const data = await res.json();
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text;
  }
  return "The coach could not answer right now. Please try again.";
}
