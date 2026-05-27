"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const socketManager_1 = require("./socket/socketManager");
const assignmentWorker_1 = require("./workers/assignmentWorker");
const startServer = async () => {
    try {
        // 1. Connect to Database
        await (0, database_1.connectDB)();
        // 2. Create HTTP Server
        const server = http_1.default.createServer(app_1.default);
        // 3. Initialize Socket.io
        (0, socketManager_1.initializeSocket)(server);
        // 4. Start Worker
        const worker = (0, assignmentWorker_1.startAssignmentWorker)();
        worker.on('ready', () => {
            console.log('Worker ready and listening for jobs');
        });
        // 5. Start listening
        server.listen(env_1.env.PORT, () => {
            console.log(`Server is running on port ${env_1.env.PORT} in ${env_1.env.NODE_ENV} mode`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map