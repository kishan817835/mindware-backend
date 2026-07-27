import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { createUser, loginUser } from "./user.controller.js";
// import validate from "../../../middlewares/validate.middleware.js";
// import { userValidation } from "../../../validations/user.validation.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;

