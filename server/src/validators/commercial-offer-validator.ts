import Joi from "joi";
import httpStatus from "http-status";
import {FormError, FormValidationError} from "../helper/errors/form-error";
import ApiError from "../helper/errors/api-error";
import {useClientService} from "../services/client-service";
import {useServiceRequestService} from "../services/service-request-service";
import {WayToPay} from "../config/enums/way-to-pay";

export const useCommercialOfferValidator = () => {
    const clientService = useClientService();
    const serviceRequestService = useServiceRequestService();

    function validate(schema: Joi.ObjectSchema, object: any, prefix: string = '') {
        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(object, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessages: {[attribute: string]: FormValidationError} = {};
            error.details.forEach((details) => {
                if (details.context?.key !== undefined) {
                    errorMessages[prefix + details.context.key] = {
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
            return { errorMessages, value };
        } else {
            return { errorMessages: {}, value };
        }
    }

    async function createCommercialOfferValidator(req: any, res: any, next: any) {
        let serviceRequestIds = (await serviceRequestService.getServiceRequestIds()).map(it => it.id);
        let clientIds = (await clientService.getClientIds()).map(it => it.id);

        // create schema object
        const schema = Joi.object({
            serviceRequestId: Joi.string().uuid().valid(...serviceRequestIds),
            clientId: Joi.string().uuid().required().valid(...clientIds),
            wayToPay: Joi.number().valid(
                WayToPay.CASH,
                WayToPay.TRANSFER,
                WayToPay.MIXED,
            ).required(),
            minimumRequirements: Joi.string(),
            services: Joi.array().items(),
        });

        const serviceSchema = Joi.object({
            serviceId: Joi.string().uuid().required(),
            quantity: Joi.number().integer().required(),
            price: Joi.number().required(),
        });

        let { errorMessages, value } = validate(schema, req.body);
        req.body = value;

        if (req.body.services) {
            for (let i = 0; i < req.body.services.length; i++) {
                const { errorMessages: serviceErrorMessages, value: serviceValue } =
                    validate(serviceSchema, req.body.services[i], `services[${i}].`);
                errorMessages = { ...errorMessages, ...serviceErrorMessages };
                req.body.services[i] = serviceValue;
            }
        }
        if (Object.keys(errorMessages).length > 0) {
            // @ts-ignore
            next(new FormError(errorMessages));
        } else {
            next();
        }
    }

    async function updateCommercialOfferValidator(req: any, res: any, next: any) {
        let serviceRequestIds = (await serviceRequestService.getServiceRequestIds()).map(it => it.id);
        let clientIds = (await clientService.getClientIds()).map(it => it.id);

        // update schema object
        const schema = Joi.object({
            id: Joi.string().uuid().required(),
            serviceRequestId: Joi.string().uuid().valid(...serviceRequestIds),
            clientId: Joi.string().uuid().valid(...clientIds),
            wayToPay: Joi.number().valid(
                WayToPay.CASH,
                WayToPay.TRANSFER,
                WayToPay.MIXED,
            ),
            minimumRequirements: Joi.string(),
            services: Joi.array().items(),
        });

        const serviceSchema = Joi.object({
            serviceId: Joi.string().uuid().required(),
            quantity: Joi.number().integer().required(),
            price: Joi.number().required(),
        });

        let { errorMessages, value } = validate(schema, req.body);
        req.body = value;

        if (req.body.services) {
            for (let i = 0; i < req.body.services.length; i++) {
                const { errorMessages: serviceErrorMessages, value: serviceValue } =
                    validate(serviceSchema, req.body.services[i], `services[${i}].`);
                errorMessages = { ...errorMessages, ...serviceErrorMessages };
                req.body.services[i] = serviceValue;
            }
        }
        if (Object.keys(errorMessages).length > 0) {
            // @ts-ignore
            next(new FormError(errorMessages));
        } else {
            next();
        }
    }

    async function getCommercialOfferValidator(req: any, res: any, next: any) {
        const { error, value } = Joi.string().uuid().validate(req.params.id);
        if (error) {
            next(new ApiError(httpStatus.BAD_REQUEST, 'uuid.incorrect'))
        } else {
            next()
        }
    }

    return { createCommercialOfferValidator, getCommercialOfferValidator, updateCommercialOfferValidator }
}
