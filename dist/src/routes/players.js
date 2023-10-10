"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const players_1 = require("../controller/players");
const fields_1 = require("../middlewares/fields");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/:id', players_1.getPlayersByTeamId);
router.post('', [(0, express_validator_1.check)('name', 'Name is required').not().isEmpty(), (0, express_validator_1.check)('number', 'number is required').not().isEmpty(), (0, express_validator_1.check)('titular', 'titular is required').not().isEmpty(), (0, express_validator_1.check)('idTeam', 'idTeam is required').not().isEmpty(), fields_1.validateFields], players_1.postPlayer);
router.post('/target', players_1.postTarget);
router.post("/change", players_1.postChange);
router.post("/lineup", players_1.postLineupByTeam);
router.put("/:id", players_1.putPlayer);
router.get("/match/:id", players_1.getPlayersByMatch);
router.post("/matchPlayer", players_1.postMatchPlayer);
exports.default = router;
//# sourceMappingURL=players.js.map