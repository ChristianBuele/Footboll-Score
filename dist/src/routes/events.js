"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_1 = require("../controller/events");
const router = (0, express_1.Router)();
router.post('/board', events_1.postEventBoard);
exports.default = router;
//# sourceMappingURL=events.js.map