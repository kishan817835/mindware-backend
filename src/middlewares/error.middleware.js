    import { sendErrorResponse } from "../utils/response.js";

    const errorHandler = (err, req, res, next) => {

        const statusCode = err.statusCode || 500;

        return sendErrorResponse(
            res,
            statusCode,
            err.message
        );
    };

    export default errorHandler;