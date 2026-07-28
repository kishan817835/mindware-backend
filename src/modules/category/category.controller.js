import catchAsync from "../../utils/catchAsync.js";
import { sendSuccessResponse } from "../../utils/response.js";
import * as categoryService from "./category.service.js";

export const addCategory = catchAsync(async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    sendSuccessResponse(res, 201, "Category created successfully", category);
});

export const fetchCategories = catchAsync(async (req, res) => {
    const categories = await categoryService.getCategories();
    sendSuccessResponse(res, 200, "Categories fetched successfully", categories);
});
