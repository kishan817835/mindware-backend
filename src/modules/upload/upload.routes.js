import { Router } from "express";
import { uploadImage } from "./upload.controller.js";
import { upload } from "../../helpers/upload/upload.helper.js";
import {authenticate} from '../../middlewares/auth.middleware.js'
import {authorize}  from  '../../middlewares/authorize.middleware.js';

const router = Router();

router.post("/",authenticate,authorize('CUSTOMER'), upload.array("images", 5), uploadImage);

export default router;