import * as userService from "./user.service.js";
import { sendSuccessResponse } from "../../utils/response.js";
import catchAsync from "../../utils/catchAsync.js";


const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    sendSuccessResponse(res, 201,"User registered Successfully", user);
});

const loginUser = catchAsync(async (req, res) => {
    const user = await userService.loginUser(req.body);
    sendSuccessResponse(res, 200,"User logged in Successfully", user);
});

export {
    createUser,
    loginUser
};