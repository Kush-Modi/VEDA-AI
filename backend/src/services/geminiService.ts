import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';

let genAI: GoogleGenerativeAI;
let model: any;

if (env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
} else {
  console.warn('GEMINI_API_KEY is not set. Gemini Service will fail if called.');
}

export const generateQuestionPaperText = async (prompt: string): Promise<string> => {
  if (!model) {
    throw new Error('Gemini API is not initialized. Please set GEMINI_API_KEY.');
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
