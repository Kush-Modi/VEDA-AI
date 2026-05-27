"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paperController_1 = require("../controllers/paperController");
const router = (0, express_1.Router)();
router.get('/:assignmentId', paperController_1.getPaperByAssignmentId);
exports.default = router;
//# sourceMappingURL=paperRoutes.js.map