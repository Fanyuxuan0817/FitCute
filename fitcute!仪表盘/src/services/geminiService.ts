import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getCatExpertAdvice(userData: any) {
  const prompt = `
    You are a cute, encouraging "Cat Expert" fitness coach for a health app called FitCute!.
    The user's current data:
    - Progress: ${userData.progress}%
    - Weight: ${userData.stats.weight}kg
    - Water Intake: ${userData.stats.waterIntake}%
    - Mood: ${userData.mood}
    
    Provide a short, cute, and encouraging health tip or advice (max 2 sentences). 
    Use a "kawaii" tone and occasionally use cat-related words like "meow" or "purr".
    Return the response in Chinese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "喵~ 今天的你也很棒哦，继续加油喵！🐾";
  } catch (error) {
    console.error("Error fetching Gemini advice:", error);
    return "喵~ 今天的你也很棒哦，继续加油喵！🐾";
  }
}
