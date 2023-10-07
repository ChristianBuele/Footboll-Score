import { Router } from "express";
import {check} from 'express-validator';
import { getMatch, getMatchs, postMatch, postMatchScore, putMatch } from "../controller/match";
import { validateFields } from "../middlewares/fields";

const router=Router();

router.get('/',     getMatchs);
router.get('/:id',  getMatch);
router.post('/',[check('name','name is required').not().isEmpty(),validateFields],    postMatch);
router.post('/score',postMatchScore);
router.put('/:id',  putMatch);

export default router;