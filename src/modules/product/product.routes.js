import { Router } from "express";
import { addProduct, fetchProducts } from "./product.controller.js";
import { upload } from "../../helpers/upload/upload.helper.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", fetchProducts);
router.post("/", authenticate, authorize('CUSTOMER'), upload.array("images", 5), addProduct);

export default router;