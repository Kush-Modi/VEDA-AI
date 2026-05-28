import { Request, Response } from 'express';
import { GeneratedPaper } from '../models/GeneratedPaper';

export const getPaperByAssignmentId = async (req: Request, res: Response) => {
  try {
    const assignmentId = req.params.assignmentId as string;
    
    if (!assignmentId) {
      return res.status(400).json({ success: false, error: 'Assignment ID is required' });
    }

    const paper = await GeneratedPaper.findOne({ assignmentId });

    if (!paper) {
      return res.status(404).json({ success: false, error: 'Paper not found' });
    }

    res.json({ success: true, paper });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getLibrary = async (req: Request, res: Response) => {
  try {
    const createdBy = (req as any).user.id;
    
    // We want to find GeneratedPapers that belong to Assignments created by this user
    // Since GeneratedPaper doesn't have createdBy, we must populate Assignment
    const papers = await GeneratedPaper.find()
      .populate({
        path: 'assignmentId',
        match: { createdBy },
        select: 'title className subject createdAt'
      })
      .sort({ createdAt: -1 })
      .lean();

    // Filter out papers where assignmentId is null (meaning the assignment didn't match the createdBy filter)
    const libraryPapers = papers.filter(p => p.assignmentId !== null);

    res.json({ success: true, data: libraryPapers });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
