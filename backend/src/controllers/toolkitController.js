"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolkitController = void 0;
const geminiService_1 = require("../services/geminiService");
const parseGemini_1 = require("../utils/parseGemini");
exports.toolkitController = {
    generateLessonPlan: async (req, res, next) => {
        try {
            const { subject, chapter, class: className } = req.body;
            if (!subject || !chapter || !className) {
                res.status(400).json({ success: false, error: 'Subject, chapter, and class are required' });
                return;
            }
            const prompt = `
Generate only a simple lesson outline for Class ${className} on the subject "${subject}", specifically for the chapter "${chapter}".

Return a strict JSON object with this EXACT structure:
{
  "title": "Lesson Title Here",
  "subtopics": [
    "Subtopic 1",
    "Subtopic 2",
    "Subtopic 3"
  ]
}

No extra explanations, no paragraphs, no markdown outside of the JSON block.
      `;
            const rawResponse = await (0, geminiService_1.generateQuestionPaperText)(prompt);
            const parsedData = (0, parseGemini_1.parseGeminiJSON)(rawResponse);
            if (!parsedData || !parsedData.title || !parsedData.subtopics) {
                throw new Error('Invalid JSON format received from Gemini');
            }
            res.status(200).json({ success: true, data: parsedData });
        }
        catch (error) {
            console.error('Lesson Plan Generation Error:', error);
            res.status(500).json({ success: false, error: 'Failed to generate lesson plan' });
        }
    }
};
//# sourceMappingURL=toolkitController.js.map