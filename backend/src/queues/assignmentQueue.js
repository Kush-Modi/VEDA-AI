"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentQueue = void 0;
const bullmq_1 = require("bullmq");
const queueConnection_1 = require("../config/queueConnection");
exports.assignmentQueue = new bullmq_1.Queue('question-generation', {
    connection: queueConnection_1.queueConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2000,
        },
    },
});
//# sourceMappingURL=assignmentQueue.js.map