import http from 'http';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/database';
import { initializeSocket } from './socket/socketManager';
import { startAssignmentWorker } from './workers/assignmentWorker';
import { QueueEvents } from 'bullmq';
import { queueConnection } from './config/queueConnection';
import { Assignment } from './models/Assignment';
import { Notification } from './models/Notification';
import cron from 'node-cron';

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Create HTTP Server
    const server = http.createServer(app);

    // 3. Initialize Socket.io
    initializeSocket(server);

    // 4. Start Worker
    const worker = startAssignmentWorker();
    worker.on('ready', () => {
      console.log('Worker ready and listening for jobs');
    });

    // 4.5. Monitor Queue Events for Notifications
    const { Queue, QueueEvents } = await import('bullmq');
    const generationQueue = new Queue('question-generation', { connection: queueConnection });
    const queueEvents = new QueueEvents('question-generation', { connection: queueConnection });
    
    queueEvents.on('completed', async ({ jobId, returnvalue }) => {
      try {
        // We can find the assignment by looking it up. JobID might not be assignmentId directly, 
        // but we can query Assignment that just got completed. 
        // A better way is to query Assignment where status is completed recently, or we can just fetch the job from queue.
        // Actually, we can fetch the job:
        const { Job } = await import('bullmq');
        const job = await Job.fromId(generationQueue as any, jobId);
        if (job && job.data && job.data.assignmentId) {
          const assignment = await Assignment.findById(job.data.assignmentId);
          if (assignment && assignment.createdBy) {
            await Notification.create({
              userId: assignment.createdBy,
              title: 'Generation Complete',
              message: `Your paper for "${assignment.title || 'Assignment'}" has been successfully generated.`,
              type: 'success'
            });
          }
        }
      } catch (err) {
        console.error('Error creating completion notification:', err);
      }
    });

    queueEvents.on('failed', async ({ jobId, failedReason }) => {
      try {
        const { Job } = await import('bullmq');
        const job = await Job.fromId(generationQueue as any, jobId);
        if (job && job.data && job.data.assignmentId) {
          const assignment = await Assignment.findById(job.data.assignmentId);
          if (assignment && assignment.createdBy) {
            await Notification.create({
              userId: assignment.createdBy,
              title: 'Generation Failed',
              message: `Failed to generate paper for "${assignment.title || 'Assignment'}". ${failedReason}`,
              type: 'error'
            });
          }
        }
      } catch (err) {
        console.error('Error creating failure notification:', err);
      }
    });

    // 4.6 Schedule Cron Job for Due Date Reminders (Runs every day at midnight)
    cron.schedule('0 0 * * *', async () => {
      console.log('Running daily due date check...');
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);

        // Find assignments due tomorrow
        const assignmentsDueTomorrow = await Assignment.find({
          dueDate: { $gte: tomorrow, $lt: dayAfterTomorrow },
          status: { $ne: 'completed' }
        });

        for (const assignment of assignmentsDueTomorrow) {
          if (assignment.createdBy) {
            await Notification.create({
              userId: assignment.createdBy,
              title: 'Assignment Due Tomorrow',
              message: `Reminder: "${assignment.title || 'Assignment'}" is due tomorrow!`,
              type: 'warning'
            });
          }
        }
        
        // Find assignments due today
        const assignmentsDueToday = await Assignment.find({
          dueDate: { $gte: today, $lt: tomorrow },
          status: { $ne: 'completed' }
        });

        for (const assignment of assignmentsDueToday) {
          if (assignment.createdBy) {
            await Notification.create({
              userId: assignment.createdBy,
              title: 'Assignment Due Today',
              message: `Urgent: "${assignment.title || 'Assignment'}" is due today!`,
              type: 'warning'
            });
          }
        }
      } catch (err) {
        console.error('Error in daily due date cron job:', err);
      }
    });

    // 5. Start listening
    server.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
