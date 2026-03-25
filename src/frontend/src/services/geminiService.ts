import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface FoodAnalysis {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

export async function analyzeFoodImage(base64Image: string): Promise<FoodAnalysis> {
  const model = "gemini-3-flash-preview";

  const prompt = `Analyze this food image and provide nutritional information.
  Return the result in JSON format with the following fields:
  foodName (string), calories (number), protein (number in grams), carbs (number in grams), fat (number in grams), description (short string).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image.split(",")[1] || base64Image,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as FoodAnalysis;
  } catch (error) {
    console.error("Error analyzing food image:", error);
    throw error;
  }
}

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