import { Router } from "express";
import { createUser, loginUser } from "./user.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../../validations/userValidator.js";

const router = Router();

router.post("/register",validate(registerSchema), createUser);
router.post("/login",validate(loginSchema), loginUser);

export default router;

