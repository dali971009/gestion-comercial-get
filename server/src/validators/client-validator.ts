import Joi from "joi";
import httpStatus from "http-status";
import {FormError, FormValidationError} from "../helper/errors/form-error";

export const useClientValidator = () => {

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

    async function createClientValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            // TODO add all validation
        });
        validate(schema, req, res, next);
    }

    async function updateClientValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            // TODO add all validation
        });
        validate(schema, req, res, next);
    }

    async function getClientValidator(req: any, res: any, next: any) {
        // create schema object
        const schema = Joi.object({
            id: Joi.string().uuid().required(),
        });
        validate(schema, req, res, next);
    }

    return { createClientValidator, updateClientValidator, getClientValidator }
}
