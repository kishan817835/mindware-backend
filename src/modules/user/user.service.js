import AppError from "../../errors/AppError.js";
import { prisma } from '../../utils/prismaClient.js';
import catchDbError from "../../utils/catchDbError.js";
import { accessToken } from "../../helpers/jwt/jwt.helper.js";

const createUser = catchDbError(async (userData) => {
    if(!userData){
        throw new AppError("User data is required", 400);
    }
    if(!userData.username){
        throw new AppError("Username is required", 400);
    }
    if(!userData.email){
        throw new AppError("Email is required", 400);
    }
    if(!userData.password){
        throw new AppError("Password is required", 400);
    }
    
    const user = await prisma.user.create({
        data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            username: userData.username,
            password_hash: userData.password
        }
    });
    return user;
});

const loginUser = catchDbError(async(userData)=>{


    if(!userData){
        throw new AppError("User data is required", 400);
    }
    if(!userData.username && !userData.email){
        throw new AppError("Atleast username or email is required", 400);
    }
    if(!userData.password){
        throw new AppError("Password is required", 400);
    }

    const user = userData.email ? await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    }) : await prisma.user.findUnique({
        where: {
            username: userData.username
        }
    });
    if(!user){
        throw new AppError("User not found", 404);
    }
    if(user.password_hash !== userData.password){
        throw new AppError("Invalid password", 401);
    }
    const token = accessToken(user);
    user.token= token
    return {user};
})

export {
    createUser,
    loginUser
};


