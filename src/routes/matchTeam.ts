import { Router } from "express";
import { getTeamMatch } from "../controller/matchData";
import { getTeamMatches, postTeamMatch } from "../controller/matchTeam";

const router = Router();

router.get('/:id',getTeamMatch);
router.get('',getTeamMatches);
router.post('',postTeamMatch);

export default router;
