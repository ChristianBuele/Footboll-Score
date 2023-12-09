import { Router } from "express";
import { getTeamMatch } from "../controller/matchData";
import { getTeamMatches, getTeamMatchesByCategorie, postTeamMatch } from "../controller/matchTeam";

const router = Router();

router.get('/:id',getTeamMatch);
router.get('',getTeamMatches);
router.post('',postTeamMatch);
router.get('/category/:id',getTeamMatchesByCategorie)

export default router;
