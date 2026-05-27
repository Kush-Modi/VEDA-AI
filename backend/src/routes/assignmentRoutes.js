"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const assignmentController_1 = require("../controllers/assignmentController");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = (0, express_1.Router)();
router.post('/', upload.single('file'), assignmentController_1.assignmentController.createAssignment);
router.get('/', assignmentController_1.assignmentController.getAssignments);
router.delete('/:id', assignmentController_1.assignmentController.deleteAssignment);
exports.default = router;
//# sourceMappingURL=assignmentRoutes.js.map