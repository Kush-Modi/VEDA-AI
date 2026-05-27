import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
  try {
    if (!env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message || error);
    console.error('\n--- MONGODB STARTUP VALIDATION FAILED ---');
    console.error('Please verify the following in MongoDB Atlas:');
    console.error('1. Database user is created and assigned to this cluster.');
    console.error('2. Password is correct (ensure no special characters break the connection string).');
    console.error('3. Network Access (Whitelist) is set to allow connections from anywhere (0.0.0.0/0).');
    console.error('------------------------------------------\n');
    process.exit(1);
  }
};
