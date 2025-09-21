
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const journalAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    reflection: {
      type: Type.STRING,
      description: "A short, gentle, and encouraging reflection (2-3 sentences max). Acknowledge feelings, perhaps notice a recurring theme, and end with an open-ended, supportive question."
    },
    moodScore: {
      type: Type.INTEGER,
      description: "A numerical score from 1 (very negative) to 10 (very positive) based on the sentiment of the entry."
    },
  },
  required: ["reflection", "moodScore"]
};

export const analyzeJournalEntry = async (entryText: string): Promise<{ reflection: string; moodScore: number }> => {
  if (!API_KEY) {
    // Return a mock response if API key is not available
    return {
      reflection: "This is a mock reflection as the API key is not configured. It's great that you're taking the time to write down your thoughts. What's one small thing you could do for yourself today?",
      moodScore: Math.floor(Math.random() * 5) + 3,
    };
  }
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please analyze the following journal entry: "${entryText}"`,
      config: {
        systemInstruction: `You are a supportive, empathetic AI journaling companion named 'Kai'. Your role is to help users reflect on their thoughts and feelings without being clinical or judgmental. Analyze the user's journal entry. Your response MUST be a JSON object matching the provided schema.`,
        responseMimeType: "application/json",
        responseSchema: journalAnalysisSchema,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (typeof result.reflection === 'string' && typeof result.moodScore === 'number') {
      return result;
    } else {
      throw new Error("Invalid JSON structure in Gemini response.");
    }
  } catch (error) {
    console.error("Error analyzing journal entry:", error);
    throw new Error("Failed to get analysis from AI companion.");
  }
};
