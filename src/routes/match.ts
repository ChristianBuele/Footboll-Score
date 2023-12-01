import { Router } from "express";
import {check} from 'express-validator';
import { getMatch, getMatchs, postShowBoard, postMatch, postMatchScore, postPenal, postTimeEvents, putMatch, postStatistics } from "../controller/match";
import { validateFields } from "../middlewares/fields";

const router=Router();

router.get('/',     getMatchs);
router.get('/:id',  getMatch);
router.post('/',[check('name','name is required').not().isEmpty(),validateFields],    postMatch);
router.post('/score',postMatchScore);
router.post('/time',postTimeEvents);
router.put('/:id',  putMatch);
router.post('/penales',postPenal);
router.post('/showDisableBoard',postShowBoard);
router.post('/statistics/add',postStatistics);

export default router;