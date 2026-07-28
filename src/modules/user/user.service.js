import AppError from "../../errors/AppError.js";
import { prisma } from '../../utils/prismaClient.js';
import catchDbError from "../../utils/catchDbError.js";
import { accessToken } from "../../helpers/jwt/jwt.helper.js";

const createUser = catchDbError(async (userData) => {
    if(!userData.username) throw new AppError("Username is required", 400);
    if(!userData.email) throw new AppError("Email is required", 400);
    if(!userData.password) throw new AppError("Password is required", 400);
    
    const user = await prisma.user.create({
        data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            username: userData.username,
            password_hash: userData.password,
            profile_image: userData["profile image"] || null 
        }
    });
    return user;
});

const loginUser = catchDbError(async (userData) => {
    let user;

    if (userData.email) {
        user = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (!user) throw new AppError("Is email se koi account registered nahi hai", 404);
    } else if (userData.username) {
        user = await prisma.user.findUnique({
            where: { username: userData.username }
        });

        if (!user) throw new AppError("There is no account with this username", 404);
    } else {
        throw new AppError("Email or username is required", 400);
    }

    if (user.password_hash !== userData.password) {
        throw new AppError("Invalid password", 401);
    }

    const token = accessToken(user);
    
    return {
        user: {
            user_id: user.user_id,
            first_name: user.first_name,
            email: user.email,
            username: user.username,
            role: user.role
        },
        token
    };
});

export {
    createUser,
    loginUser
};