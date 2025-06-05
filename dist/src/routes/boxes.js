"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const box_1 = require("../controller/box");
const router = (0, express_1.Router)();
router.get('', box_1.getPeleas);
router.get('/:id', box_1.getPeleaById);
exports.default = router;
//# sourceMappingURL=boxes.js.map