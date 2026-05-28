import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { env } from '../config/env';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, school } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      school,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '7d',
    });

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, school: user.school, schoolLocation: user.schoolLocation, avatar: user.avatar, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '7d',
    });

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, school: user.school, schoolLocation: user.schoolLocation, avatar: user.avatar, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // Requires auth middleware to set req.user
    const userId = (req as any).user.id;
    const { name, school, schoolLocation, avatar, email, password } = req.body;

    const updates: any = { name, school, schoolLocation, avatar, email };
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, school: user.school, schoolLocation: user.schoolLocation, avatar: user.avatar, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, school: user.school, schoolLocation: user.schoolLocation, avatar: user.avatar, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
