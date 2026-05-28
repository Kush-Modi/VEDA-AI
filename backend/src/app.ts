import express from 'express';
import cors from 'cors';
import assignmentRoutes from './routes/assignmentRoutes';
import authRoutes from './routes/authRoutes';
import paperRoutes from './routes/paperRoutes';
import toolkitRoutes from './routes/toolkitRoutes';
import groupRoutes from './routes/groupRoutes';
import notificationRoutes from './routes/notificationRoutes';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

const app = express();

// Middleware
app.use(cors({ 
  origin: [env.CLIENT_URL, 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/paper', paperRoutes);
app.use('/api/toolkit', toolkitRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/notifications', notificationRoutes);

// Error Handling
app.use(errorHandler);

export default app;
