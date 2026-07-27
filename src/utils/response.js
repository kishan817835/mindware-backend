const sendSuccessResponse = (
    res,
    statusCode = 200,
    returnMessage = "Success",
    data = null
) => {
    return res.status(statusCode).json({
        success: true,
        returnMessage,
        data
    });
};

const sendErrorResponse = (
    res,
    statusCode = 500,
    returnMessage = "Something went wrong",
    error = null
) => {
    return res.status(statusCode).json({
        success: false,
        returnMessage,
        error
    });
};

export {
    sendSuccessResponse,
    sendErrorResponse
};