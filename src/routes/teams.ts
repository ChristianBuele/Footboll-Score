import { Router } from "express";
import { getTeams, getTeamsByCategoryId, postTeam, putTeam } from "../controller/team";
import { check } from "express-validator";
import { validateFields } from "../middlewares/fields";

const router=Router();

router.get('/', getTeams);
router.post('/',[check('name','name is required').not().isEmpty(),check('color','Color is required').not().isEmpty(),validateFields],postTeam);
router.put('/:id',putTeam);
router.get('/:id',getTeamsByCategoryId);

export default router;