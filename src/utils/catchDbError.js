import AppError from "../errors/AppError.js";

const catchDbError = (fn) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            console.log("DB Error:", error.code, "-", error.message);

            if (error.code) {
                switch (error.code) {
                    case "P2002":
                        const target = error.meta?.target;
                        let fieldName = "This record";
                        if (target) {
                            if (Array.isArray(target)) {
                                fieldName = target.map(t => t.replace(/_key$/, '').replace(/_/g, ' ')).join(', ');
                            } else {
                                fieldName = target.replace(/_key$/, '').replace(/_/g, ' ');
                            }
                        }
                        throw new AppError(`${fieldName} already exists`, 409);
                    
                    case "P2003":
                        throw new AppError("Operation violates a related data constraint", 400);
                    
                    case "P2025":
                        throw new AppError("Record not found or cannot be modified", 404);
                    
                    case "P2014":
                        throw new AppError("This record is linked to other data and cannot be modified/deleted", 400);

                    case "P2000":
                        throw new AppError("One of the fields exceeds the allowed length", 400);
                    
                    case "P2011":
                    case "P2012":
                        throw new AppError("Required field is missing", 400);
                    
                    case "P2001":
                    case "P2005":
                    case "P2006":
                        throw new AppError("Invalid value provided for one of the fields", 400);
                    
                    case "P2033":
                    case "P2034":
                        throw new AppError("Request conflicted with another operation, please try again", 409);

                    case "P1001":
                    case "P1008":
                        throw new AppError("Unable to connect to database or server is busy", 503);

                    default:
                        throw new AppError("Some technical error occurred", 500);
                }
            }

            if (error.name === 'TimeoutError') {
                throw new AppError("Database request timed out, please try again", 504);
            }

            throw new AppError("Some technical error occurred", 500);
        }
    };
};

export default catchDbError;