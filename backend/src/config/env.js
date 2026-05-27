"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = () => {
    const env = {
        PORT: parseInt(process.env.PORT || '5000', 10),
        MONGODB_URI: process.env.MONGODB_URI || '',
        REDIS_URL: process.env.REDIS_URL || '',
        CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
        NODE_ENV: process.env.NODE_ENV || 'development',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
        JWT_SECRET: process.env.JWT_SECRET,
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
exports.env = getEnv();
//# sourceMappingURL=env.js.map