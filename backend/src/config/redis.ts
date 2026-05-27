import { env } from './env';

// BullMQ requires standard Redis protocol (redis:// or rediss://).
// If an https:// REST URL is provided, it won't work for BullMQ connections.
import { createClient } from 'redis';

// We fallback to local redis in case of invalid protocol to prevent crashing on boot.
const rawUrl = env.REDIS_URL;
const isRestUrl = rawUrl?.startsWith('http');
const redisUrl = isRestUrl ? 'redis://127.0.0.1:6379' : (rawUrl || 'redis://127.0.0.1:6379');

export const redisConnection = {
  url: redisUrl,
  tls: redisUrl.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
};

// Create a redis client for manual caching
export const redisClient = createClient({
  url: redisUrl
});

redisClient.on('error', (err) => {
  console.error('Redis Connection Error:', err.message || err);
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully');
  console.log('WARNING: If using Upstash, ensure Eviction Policy is set to "noeviction" in the Upstash Dashboard Settings.');
});

redisClient.connect().catch(err => {
  console.error('Failed to connect to Redis:', err.message || err);
});
