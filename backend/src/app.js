"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const assignmentRoutes_1 = __importDefault(require("./routes/assignmentRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const paperRoutes_1 = __importDefault(require("./routes/paperRoutes"));
const toolkitRoutes_1 = __importDefault(require("./routes/toolkitRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const env_1 = require("./config/env");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: [env_1.env.CLIENT_URL, 'http://localhost:3000'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/assignment', assignmentRoutes_1.default);
app.use('/api/paper', paperRoutes_1.default);
app.use('/api/toolkit', toolkitRoutes_1.default);
// Error Handling
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map