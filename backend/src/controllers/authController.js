"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.updateProfile = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const signup = async (req, res) => {
    try {
        const { name, email, password, school } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already in use' });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await User_1.User.create({
            name,
            email,
            password: hashedPassword,
            school,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.env.JWT_SECRET || 'fallback_secret', {
            expiresIn: '7d',
        });
        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, school: user.school, role: user.role }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.env.JWT_SECRET || 'fallback_secret', {
            expiresIn: '7d',
        });
        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, school: user.school, role: user.role }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.login = login;
const updateProfile = async (req, res) => {
    try {
        // Requires auth middleware to set req.user
        const userId = req.user.id;
        const { name, school, email, password } = req.body;
        const updates = { name, school, email };
        if (password) {
            const salt = await bcryptjs_1.default.genSalt(10);
            updates.password = await bcryptjs_1.default.hash(password, salt);
        }
        const user = await User_1.User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user)
            return res.status(404).json({ success: false, error: 'User not found' });
        res.json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email, school: user.school, role: user.role }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateProfile = updateProfile;
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email, school: user.school, role: user.role }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=authController.js.map