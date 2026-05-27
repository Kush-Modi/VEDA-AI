import dotenv from 'dotenv';
dotenv.config();

interface Env {
  PORT: number;
  MONGODB_URI: string;
  REDIS_URL: string;
  CLIENT_URL: string;
  NODE_ENV: string;
  GEMINI_API_KEY: string;
  JWT_SECRET: string;
}

const getEnv = (): Env => {
  const env = {
    PORT: parseInt(process.env.PORT || '5000', 10),
    MONGODB_URI: process.env.MONGODB_URI || '',
    REDIS_URL: process.env.REDIS_URL || '',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    JWT_SECRET: process.env.JWT_SECRET as string,
  };

  if (!env.JWT_SECRET) {
    console.error('\nJWT_SECRET missing in env\n');
    process.exit(1);
  }

  if (!env.MONGODB_URI) {
    console.warn('Warning: MONGODB_URI is not set');
  }

  return env;
};

export const env = getEnv();
