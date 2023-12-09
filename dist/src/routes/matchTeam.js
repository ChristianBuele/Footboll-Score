"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matchData_1 = require("../controller/matchData");
const matchTeam_1 = require("../controller/matchTeam");
const router = (0, express_1.Router)();
router.get('/:id', matchData_1.getTeamMatch);
router.get('', matchTeam_1.getTeamMatches);
router.post('', matchTeam_1.postTeamMatch);
router.get('/category/:id', matchTeam_1.getTeamMatchesByCategorie);
exports.default = router;
//# sourceMappingURL=matchTeam.js.map