import { Router } from "express";
import { getTeamMatch } from "../controller/matchData";
import { getTeamMatches } from "../controller/matchTeam";

const router = Router();

router.get('/:id',getTeamMatch);
router.get('',getTeamMatches);

export default router;
