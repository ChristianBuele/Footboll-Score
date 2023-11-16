"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const match_1 = require("../controller/match");
const fields_1 = require("../middlewares/fields");
const router = (0, express_1.Router)();
router.get('/', match_1.getMatchs);
router.get('/:id', match_1.getMatch);
router.post('/', [(0, express_validator_1.check)('name', 'name is required').not().isEmpty(), fields_1.validateFields], match_1.postMatch);
router.post('/score', match_1.postMatchScore);
router.post('/time', match_1.postTimeEvents);
router.put('/:id', match_1.putMatch);
router.post('/penales', match_1.postPenal);
router.post('/showDisableBoard', match_1.postShowBoard);
exports.default = router;
//# sourceMappingURL=match.js.map