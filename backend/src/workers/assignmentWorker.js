"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAssignmentWorker = void 0;
const bullmq_1 = require("bullmq");
const queueConnection_1 = require("../config/queueConnection");
const redis_1 = require("../config/redis");
const Assignment_1 = require("../models/Assignment");
const GeneratedPaper_1 = require("../models/GeneratedPaper");
const geminiService_1 = require("../services/geminiService");
const parseGemini_1 = require("../utils/parseGemini");
const socketManager_1 = require("../socket/socketManager");
const fileParser_1 = require("../services/fileParser");
const startAssignmentWorker = () => {
    const worker = new bullmq_1.Worker('question-generation', async (job) => {
        console.log(`Processing job ${job.id} for assignment ${job.data.assignmentId}`);
        const io = (0, socketManager_1.getSocketIO)();
        try {
            const assignment = await Assignment_1.Assignment.findById(job.data.assignmentId);
            if (!assignment)
                throw new Error('Assignment not found');
            // Emit start
            io.emit('generation-started', { assignmentId: assignment._id });
            io.emit('generation-progress', { assignmentId: assignment._id, progress: 20 });
            await Assignment_1.Assignment.findByIdAndUpdate(assignment._id, { status: 'processing' });
            const cacheKey = `paper:${assignment._id}`;
            const cachedPaper = await redis_1.redisClient.get(cacheKey);
            let parsedData;
            if (cachedPaper) {
                console.log(`Found cached paper for assignment ${assignment._id}`);
                parsedData = JSON.parse(cachedPaper);
                io.emit('generation-progress', { assignmentId: assignment._id, progress: 80 });
            }
            else {
                let content = '';
                if (assignment.filePath) {
                    content = await (0, fileParser_1.parseFile)(assignment.filePath, assignment.fileName);
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
${assignment.questionTypes.map((q) => `- ${q.count} questions of type ${q.type} (${q.marks} marks each)`).join('\n')}

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
                const geminiResponse = await (0, geminiService_1.generateQuestionPaperText)(prompt);
                console.log("Gemini raw:", geminiResponse);
                io.emit('generation-progress', { assignmentId: assignment._id, progress: 80 });
                // Parse JSON
                parsedData = (0, parseGemini_1.parseGeminiJSON)(geminiResponse);
                console.log("Parsed:", parsedData);
                if (!parsedData || !parsedData.sections) {
                    throw new Error("Invalid output format from Gemini");
                }
                // Cache for 3600 seconds
                await redis_1.redisClient.setEx(cacheKey, 3600, JSON.stringify(parsedData));
            }
            // Store
            console.log("Saving paper");
            await GeneratedPaper_1.GeneratedPaper.create({
                assignmentId: assignment._id,
                sections: parsedData.sections,
            });
            await Assignment_1.Assignment.findByIdAndUpdate(assignment._id, { status: 'completed' });
            io.emit('generation-progress', { assignmentId: assignment._id, progress: 100 });
            io.emit('generation-completed', { assignmentId: assignment._id });
        }
        catch (error) {
            console.error(`Failed to process job ${job.id}:`, error);
            await Assignment_1.Assignment.findByIdAndUpdate(job.data.assignmentId, { status: 'failed' });
            io.emit('generation-failed', { assignmentId: job.data.assignmentId, error: error.message });
            throw error;
        }
    }, { connection: queueConnection_1.queueConnection });
    worker.on('completed', (job) => {
        console.log(`Job ${job.id} has completed!`);
    });
    worker.on('failed', (job, err) => {
        console.log(`Job ${job?.id} has failed with ${err.message}`);
    });
    return worker;
};
exports.startAssignmentWorker = startAssignmentWorker;
//# sourceMappingURL=assignmentWorker.js.map