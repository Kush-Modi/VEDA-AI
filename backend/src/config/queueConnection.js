"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueConnection = void 0;
const env_1 = require("./env");
const rawUrl = env_1.env.REDIS_URL;
const isRestUrl = rawUrl?.startsWith('http');
const redisUrl = isRestUrl ? 'redis://127.0.0.1:6379' : (rawUrl || 'redis://127.0.0.1:6379');
exports.queueConnection = {
    url: redisUrl,
    maxRetriesPerRequest: null,
};
//# sourceMappingURL=queueConnection.js.map