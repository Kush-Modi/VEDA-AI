"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentService = void 0;
const Assignment_1 = require("../models/Assignment");
const assignmentQueue_1 = require("../queues/assignmentQueue");
exports.assignmentService = {
    createAssignment: async (data) => {
        // Store assignment
        const assignment = new Assignment_1.Assignment({
            ...data,
            status: 'pending'
        });
        const savedAssignment = await assignment.save();
        // Add queue job
        const job = await assignmentQueue_1.assignmentQueue.add('generate-paper', {
            assignmentId: savedAssignment._id,
        });
        return {
            success: true,
            jobId: job.id,
            assignment: savedAssignment,
        };
    },
    getAssignments: async () => {
        return await Assignment_1.Assignment.find().sort({ createdAt: -1 });
    },
    deleteAssignment: async (id) => {
        return await Assignment_1.Assignment.findByIdAndDelete(id);
    }
};
//# sourceMappingURL=assignmentService.js.map