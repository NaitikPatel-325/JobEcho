import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function generatePromptResponse(prompt: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo", 
      messages: [{ role: "user", content: prompt }],
    });
    const message = response.choices[0]?.message?.content || "No response.";
    console.log("Generated Response:", message);
    return message;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error generating response.";
  }
}
