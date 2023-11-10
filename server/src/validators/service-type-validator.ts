import Joi from "joi";
import httpStatus from "http-status";
import {FormError, FormValidationError} from "../helper/errors/form-error";
import ApiError from "../helper/errors/api-error";

export const useServiceTypeValidator = () => {

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

    async function serviceTypeCreateValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            serviceDescription: Joi.string(),
        });
        validate(schema, req, res, next);
    }

    async function updateServiceTypeValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            id: Joi.string().uuid().required(),
            name: Joi.string().required(),
            description: Joi.string().allow(''),
            serviceDescription: Joi.string().allow(''),
        });
        validate(schema, req, res, next);
    }

    async function getServiceTypeValidator(req: any, res: any, next: any) {
        const { error, value } = Joi.string().uuid().validate(req.params.id);
        if (error) {
            next(new ApiError(httpStatus.BAD_REQUEST, 'uuid.incorrect'))
        } else {
            next()
        }
    }

    return { serviceTypeCreateValidator, getServiceTypeValidator, updateServiceTypeValidator }
}
