import AppError from "../errors/AppError.js";


//kishan-- this function is to authorize the roles of token  request it acts like middleware for particular user role access
const authorize = (...roles) => {

    return (req, res, next) => {

        console.log("========== AUTHORIZE ==========");

        console.log("User Role :", req.user.role);

        console.log("Allowed :", roles);

        if (!roles.includes(req.user.role)) {
            console.log(req.user)
            throw new AppError(
                "You do not have permission to perform this action",
                403
            );
        }

        next();

    };

};

export { authorize};