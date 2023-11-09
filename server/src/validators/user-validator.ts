import Joi from "joi";
import httpStatus from "http-status";
import {FormError, FormValidationError} from "../helper/errors/form-error";
import ApiError from "../helper/errors/api-error";
import {UserStatus} from "../config/enums/user-status";

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
                    if (details.context.key === 'password2' && details.type === 'any.only') {
                        errorMessages[details.context.key] = {
                            type: 'password.match'
                        }
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
            console.log(value);
            req.body = value;
            return next();
        }
    }

    async function userCreateValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            status: Joi.number().valid(UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.REMOVED),
            phoneNumber: Joi.string(),
            address: Joi.string(),
            password: Joi.string().min(6),
        });
        validate(schema, req, res, next);
    }

    async function updateUserValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            id: Joi.string().uuid().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            status: Joi.number().valid(UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.REMOVED),
            phoneNumber: Joi.string(),
            address: Joi.string(),
            password: Joi.string().min(6),
            password2: Joi.string().valid(Joi.ref('password')),
        });
        validate(schema, req, res, next);
    }

    async function getUserValidator(req: any, res: any, next: any) {
        const { error, value } = Joi.string().uuid().validate(req.params.id);
        if (error) {
            next(new ApiError(httpStatus.BAD_REQUEST, 'invalid_id'))
        } else {
            next()
        }
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

    return { userCreateValidator, userLoginValidator, checkEmailValidator, changePasswordValidator, getUserValidator, updateUserValidator }
}
