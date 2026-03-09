import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY
});

export const AIChatSession = async (prompt) => {
    const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });

    return result.text;
;
};