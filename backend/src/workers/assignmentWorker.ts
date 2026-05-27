import { Worker } from 'bullmq';
import { queueConnection } from '../config/queueConnection';
import { redisClient } from '../config/redis';
import { Assignment } from '../models/Assignment';
import { GeneratedPaper } from '../models/GeneratedPaper';
import { generateQuestionPaperText } from '../services/geminiService';
import { parseGeminiJSON } from '../utils/parseGemini';
import { getSocketIO } from '../socket/socketManager';
import { parseFile } from '../services/fileParser';

export const startAssignmentWorker = () => {
  const worker = new Worker(
    'question-generation',
    async (job) => {
      console.log(`Processing job ${job.id} for assignment ${job.data.assignmentId}`);
      const io = getSocketIO();
      
      try {
        const assignment = await Assignment.findById(job.data.assignmentId);
        if (!assignment) throw new Error('Assignment not found');

        // Emit start
        io.emit('generation-started', { assignmentId: assignment._id });
        io.emit('generation-progress', { assignmentId: assignment._id, progress: 20 });
        
        await Assignment.findByIdAndUpdate(assignment._id, { status: 'processing' });

        const cacheKey = `paper:${assignment._id}`;
        const cachedPaper = await redisClient.get(cacheKey);

        let parsedData: any;

        if (cachedPaper) {
          console.log(`Found cached paper for assignment ${assignment._id}`);
          parsedData = JSON.parse(cachedPaper);
          io.emit('generation-progress', { assignmentId: assignment._id, progress: 80 });
        } else {
          let content = '';
          if (assignment.filePath) {
            content = await parseFile(assignment.filePath, assignment.fileName);
            if (!content || content.trim() === '') {
              throw new Error('Extracted content is empty');
            }
            console.log("Extracted content:");
            console.log(content.slice(0, 500));
          }

          // Build prompt
          const prompt = `
Generate a structured JSON output for an assignment ONLY from this material:

${content}

Additional instructions:
${assignment.instructions}

Question Types:
${assignment.questionTypes.map((q: any) => `- ${q.count} questions of type ${q.type} (${q.marks} marks each)`).join('\n')}

Rules:
1. use supplied material only
2. do not invent topics
3. create sections
4. include difficulty
5. output strict JSON

Output format MUST be EXACTLY this JSON structure. Never return raw text or markdown outside of the JSON block:
{
  "sections": [
    {
      "title": "Section Title",
      "instruction": "Section instructions",
      "questions": [
        {
          "text": "Question text",
          "difficulty": "Moderate",
          "marks": 2
        }
      ]
    }
  ]
}
          `;

          io.emit('generation-progress', { assignmentId: assignment._id, progress: 50 });

          // Gemini API call
          console.log("Sending prompt");
          const geminiResponse = await generateQuestionPaperText(prompt);
          console.log("Gemini raw:", geminiResponse);
          io.emit('generation-progress', { assignmentId: assignment._id, progress: 80 });

          // Parse JSON
          parsedData = parseGeminiJSON(geminiResponse);
          console.log("Parsed:", parsedData);
          if (!parsedData || !parsedData.sections) {
            throw new Error("Invalid output format from Gemini");
          }

          // Cache for 3600 seconds
          await redisClient.setEx(cacheKey, 3600, JSON.stringify(parsedData));
        }

        // Store
        console.log("Saving paper");
        await GeneratedPaper.create({
          assignmentId: assignment._id,
          sections: parsedData.sections,
        });

        await Assignment.findByIdAndUpdate(assignment._id, { status: 'completed' });
        
        io.emit('generation-progress', { assignmentId: assignment._id, progress: 100 });
        io.emit('generation-completed', { assignmentId: assignment._id });
        
      } catch (error: any) {
        console.error(`Failed to process job ${job.id}:`, error);
        await Assignment.findByIdAndUpdate(job.data.assignmentId, { status: 'failed' });
        io.emit('generation-failed', { assignmentId: job.data.assignmentId, error: error.message });
        throw error;
      }
    },
    { connection: queueConnection }
  );

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
  });

  worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} has failed with ${err.message}`);
  });

  return worker;
};
