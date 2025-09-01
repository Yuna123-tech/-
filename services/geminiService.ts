
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export const generateIdea = async (heritageName: string): Promise<string> => {
  if (!heritageName) {
    throw new Error("Heritage name is required to generate an idea.");
  }

  const prompt = `저는 한국의 초등학교 4학년 학생입니다. 우리나라의 소중한 국가유산인 '${heritageName}'을 친구들에게 쉽고 재미있게 알리고 싶어요. 초등학생 눈높이에 맞는 홍보 아이디어 한 가지를 100자 이내로 간단하게 제안해주세요.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
          temperature: 0.8,
          topP: 1,
          topK: 32,
          maxOutputTokens: 200,
          thinkingConfig: { thinkingBudget: 100 }
      },
    });

    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("No response text from Gemini API.");
    }
  } catch (error) {
    console.error("Error generating idea from Gemini API:", error);
    throw new Error("Failed to generate an idea. Please try again later.");
  }
};
