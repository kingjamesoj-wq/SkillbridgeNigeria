import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeResume(resumeText: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this resume and provide feedback. Also suggest 3 job roles from this list that match: Web Developer, Data Scientist, UI/UX Designer, Digital Marketer, Content Writer.
      Resume: ${resumeText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING },
            suggestedRoles: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            score: { type: Type.NUMBER }
          },
          required: ["feedback", "suggestedRoles", "score"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      feedback: "Unable to analyze resume at this time. Please try again later.",
      suggestedRoles: [],
      score: 0
    };
  }
}

export async function getJobRecommendations(skills: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these skills: ${skills.join(", ")}, recommend 3 specific job titles and why they fit.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["title", "reason"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
