import { Router } from "express";
import { getCategories, postCategorie } from "../controller/categories";

const router = Router();

router.get('',getCategories);
router.post('',postCategorie)

export default router;