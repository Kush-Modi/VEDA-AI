"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuestionPaperText = void 0;
const generative_ai_1 = require("@google/generative-ai");
const env_1 = require("../config/env");
let genAI;
let model;
if (env_1.env.GEMINI_API_KEY) {
    genAI = new generative_ai_1.GoogleGenerativeAI(env_1.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
}
else {
    console.warn('GEMINI_API_KEY is not set. Gemini Service will fail if called.');
}
const generateQuestionPaperText = async (prompt) => {
    if (!model) {
        throw new Error('Gemini API is not initialized. Please set GEMINI_API_KEY.');
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};
exports.generateQuestionPaperText = generateQuestionPaperText;
//# sourceMappingURL=geminiService.js.map