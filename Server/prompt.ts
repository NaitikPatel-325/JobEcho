import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); 

const API_KEY = process.env.API_KEY; 

if (!API_KEY) {
  throw new Error("API_KEY is missing. Please set it in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generatePromptResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text(); 
    console.log("Generated Response:", response);
    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error generating response.";
  }
}

