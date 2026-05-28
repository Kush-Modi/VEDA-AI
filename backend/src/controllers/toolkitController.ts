import { Request, Response } from 'express';
import { generateQuestionPaperText } from '../services/geminiService';

export const toolkitController = {
  generateLessonPlan: async (req: Request, res: Response) => {
    try {
      const { chapterName, className, subject, duration } = req.body;

      if (!chapterName || !className || !subject || !duration) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const prompt = `
Act as an expert teacher and curriculum designer. 
Create a detailed, engaging lesson plan for a class with the following details:
Chapter Name: ${chapterName}
Class: ${className}
Subject: ${subject}
Duration: ${duration}

Return the response STRICTLY as a JSON object matching this structure exactly (do not include any markdown formatting around the JSON, just the JSON string itself):

{
  "subtopics": ["Subtopic 1", "Subtopic 2", "Subtopic 3"],
  "learningObjectives": ["Objective 1", "Objective 2", "Objective 3"],
  "teachingFlow": [
    { "time": "0-10 mins", "activity": "Introduction and Hook" },
    { "time": "10-30 mins", "activity": "Main Concept Delivery" }
  ],
  "recapTopics": ["Recap 1", "Recap 2"],
  "homeworkSuggestions": ["Homework 1", "Homework 2"]
}
      `;

      const rawResponse = await generateQuestionPaperText(prompt);
      
      let parsedData;
      try {
        const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedData = JSON.parse(cleanJson);
      } catch (err) {
        throw new Error('Failed to parse Gemini output into JSON');
      }

      res.json({ success: true, data: parsedData });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
