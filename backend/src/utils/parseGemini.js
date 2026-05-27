"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGeminiJSON = void 0;
const parseGeminiJSON = (text) => {
    try {
        let cleanText = text.trim();
        // Remove markdown code blocks if present
        if (cleanText.startsWith('```json')) {
            cleanText = cleanText.substring(7);
        }
        else if (cleanText.startsWith('```')) {
            cleanText = cleanText.substring(3);
        }
        if (cleanText.endsWith('```')) {
            cleanText = cleanText.substring(0, cleanText.length - 3);
        }
        return JSON.parse(cleanText.trim());
    }
    catch (error) {
        console.error('Failed to parse Gemini JSON:', error, 'Raw text:', text);
        throw new Error('Failed to parse AI output into valid JSON.');
    }
};
exports.parseGeminiJSON = parseGeminiJSON;
//# sourceMappingURL=parseGemini.js.map