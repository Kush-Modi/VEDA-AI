"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.redisConnection = void 0;
const env_1 = require("./env");
// BullMQ requires standard Redis protocol (redis:// or rediss://).
// If an https:// REST URL is provided, it won't work for BullMQ connections.
const redis_1 = require("redis");
// We fallback to local redis in case of invalid protocol to prevent crashing on boot.
const rawUrl = env_1.env.REDIS_URL;
const isRestUrl = rawUrl?.startsWith('http');
const redisUrl = isRestUrl ? 'redis://127.0.0.1:6379' : (rawUrl || 'redis://127.0.0.1:6379');
exports.redisConnection = {
    url: redisUrl,
    tls: redisUrl.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
};
// Create a redis client for manual caching
exports.redisClient = (0, redis_1.createClient)({
    url: redisUrl
});
exports.redisClient.on('error', (err) => {
    console.error('Redis Connection Error:', err.message || err);
});
exports.redisClient.on('connect', () => {
    console.log('Redis connected successfully');
    console.log('WARNING: If using Upstash, ensure Eviction Policy is set to "noeviction" in the Upstash Dashboard Settings.');
});
exports.redisClient.connect().catch(err => {
    console.error('Failed to connect to Redis:', err.message || err);
});
//# sourceMappingURL=redis.js.map