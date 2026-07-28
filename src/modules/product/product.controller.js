import catchAsync from "../../utils/catchAsync.js";
import { sendSuccessResponse } from "../../utils/response.js";
import * as productService from "./product.service.js";

export const addProduct = catchAsync(async (req, res) => {
    const product = await productService.createProduct(req.body, req.files);
    sendSuccessResponse(res, 201, "Product created successfully", product);
});

export const fetchProducts = catchAsync(async (req, res) => {
    const products = await productService.getProducts();
    sendSuccessResponse(res, 200, "Products fetched successfully", products);
});