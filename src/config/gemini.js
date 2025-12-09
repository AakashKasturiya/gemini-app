

import { GoogleGenAI } from "@google/genai";

// Load API Key from .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


// Create AI client
const ai = new GoogleGenAI({ apiKey });

// Model selection (new stable version)
const modelName = "gemini-2.5-flash";

async function run(prompt) {
  try {
    const result = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    // result.text is now a FUNCTION, not a string
    const output = result.candidates[0].content.parts[0].text;


    return output;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export default run;
