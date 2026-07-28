import AppError from "../errors/AppError.js";
import Joi from "joi";

const validate = (schema) => {
    return (req, res, next) => {
        const object = {
            body: req.body,
            query: req.query,
            params: req.params,
        };

        const validSchema = Joi.object({
            body: schema,
            query: Joi.object(),
            params: Joi.object(),
        });

        const { value, error } = validSchema.validate(object, {
            abortEarly: false,
            stripUnknown: true, 
        });

        if (error) {
            const errorMessage = error.details
                .map((details) => details.message.replace(/"/g, '').replace(/(body\.|query\.|params\.)/g, ''))
                .join(', ');
            throw new AppError(errorMessage, 400);
        }

        if (value.body) {
            req.body = value.body;
        }
        
        if (value.params) {
            Object.keys(req.params).forEach(key => delete req.params[key]);
            Object.assign(req.params, value.params);
        }
        
        if (value.query) {
            Object.keys(req.query).forEach(key => delete req.query[key]);
            Object.assign(req.query, value.query);
        }

        return next();
    };
};

export default validate;