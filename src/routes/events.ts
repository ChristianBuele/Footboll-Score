import { Router } from "express";
import { postEventBoard } from "../controller/events";

const router=Router();
router.post('/board',postEventBoard);

export default router;
