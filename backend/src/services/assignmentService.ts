import { Assignment, IAssignment } from '../models/Assignment';
import { assignmentQueue } from '../queues/assignmentQueue';

export const assignmentService = {
  createAssignment: async (data: Partial<IAssignment>) => {
    // Store assignment
    const assignment = new Assignment({
      ...data,
      status: 'pending'
    });
    const savedAssignment = await assignment.save();

    // Add queue job
    const job = await assignmentQueue.add('generate-paper', {
      assignmentId: savedAssignment._id,
    });

    return {
      success: true,
      jobId: job.id,
      assignment: savedAssignment,
    };
  },

  getAssignments: async (createdBy: string) => {
    return await Assignment.find({ createdBy }).sort({ createdAt: -1 });
  },

  deleteAssignment: async (id: string, createdBy: string) => {
    return await Assignment.findOneAndDelete({ _id: id, createdBy });
  }
};
