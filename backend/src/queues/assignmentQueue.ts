import { Queue } from 'bullmq';
import { queueConnection } from '../config/queueConnection';

export const assignmentQueue = new Queue('question-generation', {
  connection: queueConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});
