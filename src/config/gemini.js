import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });
const modelName = "gemini-2.5-flash";

const MAX_WORDS = 30;
const MAX_INPUT_CHARS = 300;

// Layer 1: rules for the model
const SYSTEM_INSTRUCTION = `
You are a concise assistant for a UI card.
Rules:
- Reply in ONE short paragraph, maximum ${MAX_WORDS} words.
- Use simple, plain language.
- Plain text only: no markdown, no bullet points, no headings, no asterisks, no emojis.
- Always finish with a complete sentence.
`;

// Layer 3: enforce the limit in code
function formatOutput(text, maxWords = MAX_WORDS) {
  // strip markdown symbols and extra whitespace
  let clean = text
    .replace(/[*_#`>~-]{1,}/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const words = clean.split(" ");
  if (words.length <= maxWords) return clean;

  // cut to the limit, then end at the last full sentence if there is one
  let trimmed = words.slice(0, maxWords).join(" ");
  const lastStop = Math.max(
    trimmed.lastIndexOf("."),
    trimmed.lastIndexOf("!"),
    trimmed.lastIndexOf("?")
  );

  if (lastStop > trimmed.length * 0.5) {
    return trimmed.slice(0, lastStop + 1);
  }
  return trimmed.replace(/[,;:]$/, "") + "…";
}

async function run(prompt) {
  // Input validation
  const userPrompt = (prompt || "").trim();
  if (!userPrompt) throw new Error("Please enter a prompt.");
  if (userPrompt.length > MAX_INPUT_CHARS) {
    throw new Error(`Prompt is too long (max ${MAX_INPUT_CHARS} characters).`);
  }

  try {
    const result = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
        maxOutputTokens: 200, // safety cap, a bit above 30 words
        thinkingConfig: { thinkingBudget: 0 }, // see note below
      },
    });

    const raw = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error("No response received. Try again.");

    return formatOutput(raw);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export default run;