"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../controller/team");
const express_validator_1 = require("express-validator");
const fields_1 = require("../middlewares/fields");
const router = (0, express_1.Router)();
router.get('/', team_1.getTeams);
router.post('/', [
    (0, express_validator_1.check)('name', 'name is required').not().isEmpty(),
    (0, express_validator_1.check)('color', 'Color is required').not().isEmpty(),
    (0, express_validator_1.check)('idcategory', 'Category ID is required').not().isEmpty(),
    (0, express_validator_1.check)('image_path', 'Image path is required').not().isEmpty(),
    fields_1.validateFields
], team_1.postTeam);
router.put('/:id', team_1.putTeam);
router.get('/:id', team_1.getTeamsByCategoryId);
exports.default = router;
//# sourceMappingURL=teams.js.map