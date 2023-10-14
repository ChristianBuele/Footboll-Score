import { Router } from "express";
import { deletePlayer, getPlayersByMatch, getPlayersByTeamId, postChange, postLineupByTeam, postMatchPlayer, postPlayer, postTarget, putPlayer } from "../controller/players";
import { validateFields } from "../middlewares/fields";
import { check } from "express-validator";

const router=Router();

router.get('/:id',getPlayersByTeamId);
router.post('',[check('name','Name is required').not().isEmpty(),check('number','number is required').not().isEmpty(),check('titular','titular is required').not().isEmpty(),check('idTeam','idTeam is required').not().isEmpty(),validateFields],postPlayer)
router.post('/target',postTarget);
router.post("/change",postChange);
router.post("/lineup",postLineupByTeam);
router.put("/:id",putPlayer)
router.get("/match/:id",getPlayersByMatch);
router.post("/matchPlayer",postMatchPlayer);
router.delete("/:id",deletePlayer)
export default router;