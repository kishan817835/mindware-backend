import catchAsync from "../../utils/catchAsync.js";
import { sendSuccessResponse } from "../../utils/response.js";
import { uploadMultipleFilesToS3 } from "./upload.service.js";

export const uploadImage = catchAsync(async (req, res) => {
    const imageUrls = await uploadMultipleFilesToS3(req.files);
    sendSuccessResponse(res, 200, "Images uploaded successfully", { urls: imageUrls });
});