import Joi from "joi";
import httpStatus from "http-status";
import {FormError, FormValidationError} from "../helper/errors/form-error";

export const useUserValidator = () => {

    function validate(schema: Joi.ObjectSchema, req: any, res: any, next: any) {
        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessages: {[attribute: string]: FormValidationError} = {};
            error.details.forEach((details) => {
                if (details.context?.key !== undefined) {
                    errorMessages[details.context.key] = {
                        type: details.type
                    };
                    if (details.type === 'string.min') {
                        errorMessages[details.context.key].params = {
                            min: details.context.limit,
                        };
                    }
                } else {
                    errorMessages.extra = {
                        type: details.type,
                        params: {
                            message: details.message,
                        }
                    };
                }
            });
            next(new FormError(errorMessages));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }

    async function userCreateValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().valid(Joi.ref('password')).required(),
            first_name: Joi.string(),
            last_name: Joi.string(),
        });
        validate(schema, req, res, next);
    }

    async function userLoginValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        validate(schema, req, res, next);
    }

    async function checkEmailValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
        });
        validate(schema, req, res, next);
    }

    async function changePasswordValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            old_password: Joi.string().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().min(6).required(),
        });
        validate(schema, req, res, next);
    }

    return { userCreateValidator, userLoginValidator, checkEmailValidator, changePasswordValidator }
}
