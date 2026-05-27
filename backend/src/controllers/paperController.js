"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaperByAssignmentId = void 0;
const GeneratedPaper_1 = require("../models/GeneratedPaper");
const getPaperByAssignmentId = async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        if (!assignmentId) {
            return res.status(400).json({ success: false, error: 'Assignment ID is required' });
        }
        const paper = await GeneratedPaper_1.GeneratedPaper.findOne({ assignmentId });
        if (!paper) {
            return res.status(404).json({ success: false, error: 'Paper not found' });
        }
        res.json({ success: true, paper });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getPaperByAssignmentId = getPaperByAssignmentId;
//# sourceMappingURL=paperController.js.map