  import jwt from "jsonwebtoken";
  import AppError from "../../errors/AppError.js";


// this is to genrate access token
  const accessToken = (user) => {
    return jwt.sign(
      {
        userId: user.user_id,
        roleId: user.role_id,
        email: user.email,
      },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: process.env.JWT_EXPIRES_IN_ACCESS_TOKEN,
      }
    );
  };
// this to generate refresh token
  const refreshToken = (user) => {
    return jwt.sign(
      {
        userId: user.user_id,
      },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
      }
    );
  };


//this is to verify access token
  const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        throw new AppError("Access token expired", 401);

      case "JsonWebTokenError":
        throw new AppError("Invalid access token", 401);

      default:
        throw new AppError("Token verification failed", 401);
    }
  }
};

  const verifyRefreshToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Refresh token has expired", 401);
      }

      if (error.name === "JsonWebTokenError") {
        throw new AppError("Invalid refresh token", 401);
      }

      throw new AppError("Token verification failed", 401);
    }
  };

  export {
    accessToken,
    refreshToken,
    verifyAccessToken,
    verifyRefreshToken,
  };