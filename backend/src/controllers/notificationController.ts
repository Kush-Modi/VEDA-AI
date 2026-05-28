import { Request, Response } from 'express';
import { Notification } from '../models/Notification';

export const notificationController = {
  getNotifications: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 })
        .limit(50);
        
      res.json({ success: true, data: notifications });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  markAsRead: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;

      const notification = await Notification.findOneAndUpdate(
        { _id: id as string, userId },
        { read: true },
        { new: true }
      );

      if (!notification) {
        return res.status(404).json({ success: false, error: 'Notification not found' });
      }

      res.json({ success: true, data: notification });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  markAllAsRead: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      await Notification.updateMany({ userId, read: false }, { read: true });
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
