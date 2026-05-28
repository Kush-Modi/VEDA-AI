import { Request, Response, NextFunction } from 'express';
import { Group } from '../models/Group';
import { Assignment } from '../models/Assignment';

export const groupController = {
  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { className, section, subject, description } = req.body;
      const createdBy = (req as any).user.id;

      if (!className || !section || !subject) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const group = await Group.create({
        className,
        section,
        subject,
        description,
        createdBy,
      });

      res.status(201).json({ success: true, data: group });
    } catch (error) {
      next(error);
    }
  },

  getGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdBy = (req as any).user.id;
      const groups = await Group.find({ createdBy }).sort({ createdAt: -1 }).lean();

      // For each group, get the assignment count
      const groupData = await Promise.all(groups.map(async (g) => {
        const assignmentsCount = await Assignment.countDocuments({ groupId: g._id });
        return {
          ...g,
          assignmentsCount
        };
      }));

      res.status(200).json({ success: true, data: groupData });
    } catch (error) {
      next(error);
    }
  },

  deleteGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdBy = (req as any).user.id;
      const groupId = req.params.id as string;

      const group = await Group.findOneAndDelete({ _id: groupId, createdBy });
      
      if (!group) {
        return res.status(404).json({ success: false, error: 'Group not found or not authorized' });
      }

      // Delete associated assignments? Or leave them orphaned?
      // Since assignments need a group, we should probably delete them or remove the groupId.
      // For now, let's just delete the group.
      await Assignment.deleteMany({ groupId: group._id });

      res.status(200).json({ success: true, message: 'Group deleted' });
    } catch (error) {
      next(error);
    }
  }
};
