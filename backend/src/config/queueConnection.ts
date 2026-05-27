import { env } from './env';

const rawUrl = env.REDIS_URL;
const isRestUrl = rawUrl?.startsWith('http');
const redisUrl = isRestUrl ? 'redis://127.0.0.1:6379' : (rawUrl || 'redis://127.0.0.1:6379');

export const queueConnection = {
  url: redisUrl,
  maxRetriesPerRequest: null,
};
