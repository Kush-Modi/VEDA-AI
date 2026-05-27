"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDB = async () => {
    try {
        if (!env_1.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }
        await mongoose_1.default.connect(env_1.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
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
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map