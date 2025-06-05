import { Router } from "express";
import { getPeleaById, getPeleas } from "../controller/box";

const router = Router();

router.get('',getPeleas);
router.get('/:id', getPeleaById);

export default router;