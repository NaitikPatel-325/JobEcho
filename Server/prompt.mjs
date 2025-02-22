import { GoogleGenerativeAI } from "@google/generative-ai";

// Set your API key
const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to generate a response
async function generatePromptResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  console.log(response);
}

const ex = generatePromptResponse("how to mak a human fly.");
console.log(ex);