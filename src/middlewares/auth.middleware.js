//writtern by kishan singh 2026

import catchAsync from "../utils/catchAsync.js";
import AppError from "../errors/AppError.js";
import { verifyAccessToken } from "../helpers/jwt/jwt.helper.js";
import {prisma} from "../utils/prismaClient.js";

const authenticate = catchAsync(async (req, res, next) => {

    console.log("======= Authenticate Middleware =======");

    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Token is not present",401);
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    console.log("JWT Payload :", payload);

    const user = await prisma.user.findUnique({
        where: {
            id: payload.userId
        }
    });

    console.log("DB User :", user);

    req.user = user;

    next();
});

const optionalAuthenticate = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next();
    }
    try {
        const token = authHeader.split(" ")[1];
        const payload = verifyAccessToken(token);
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        });
        
        if (user) {
            req.user = user;
        }
    } catch (error) {
        console.log("Optional Auth - Token Invalid/Expired, continuing as Guest");
    }

    next();
});
export { authenticate,optionalAuthenticate };