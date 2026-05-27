"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toolkitController_1 = require("../controllers/toolkitController");
const router = (0, express_1.Router)();
router.post('/lesson-plan', toolkitController_1.toolkitController.generateLessonPlan);
exports.default = router;
//# sourceMappingURL=toolkitRoutes.js.map