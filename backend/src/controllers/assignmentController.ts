import { Request, Response, NextFunction } from 'express';
import { assignmentService } from '../services/assignmentService';

export const assignmentController = {
  createAssignment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Handle file if uploaded via multer
      const file = req.file;
      const assignmentData = {
        ...req.body,
        filePath: file ? file.path : undefined,
        fileName: file ? file.originalname : undefined,
      };

      // Since multer sends body as form-data strings, parse questionTypes
      if (typeof assignmentData.questionTypes === 'string') {
        try {
          assignmentData.questionTypes = JSON.parse(assignmentData.questionTypes);
          console.log('Parsed questionTypes:', assignmentData.questionTypes);
        } catch (e) {
          console.error('Failed to parse questionTypes:', assignmentData.questionTypes);
          return next(new Error('Invalid questionTypes JSON string'));
        }
      } else {
        console.log('questionTypes is not a string:', typeof assignmentData.questionTypes, assignmentData.questionTypes);
      }

      // Basic validation
      const { title, dueDate, questionTypes } = assignmentData;
      if (!title || !dueDate || !questionTypes || !Array.isArray(questionTypes)) {
        res.status(400).json({ success: false, error: 'Invalid request data' });
        return;
      }

      const result = await assignmentService.createAssignment(assignmentData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  getAssignments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assignments = await assignmentService.getAssignments();
      res.status(200).json({ success: true, data: assignments });
    } catch (error) {
      next(error);
    }
  },

  deleteAssignment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Assignment ID is required' });
      }
      await assignmentService.deleteAssignment(id);
      res.status(200).json({ success: true, message: 'Assignment deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};
