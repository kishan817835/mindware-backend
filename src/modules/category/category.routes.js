import { Router } from "express";
import { addCategory, fetchCategories } from "./category.controller.js";

const router = Router();

router.get("/", fetchCategories);
router.post("/", addCategory);

export default router;
