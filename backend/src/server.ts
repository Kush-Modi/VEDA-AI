import http from 'http';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/database';
import { initializeSocket } from './socket/socketManager';
import { startAssignmentWorker } from './workers/assignmentWorker';

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
