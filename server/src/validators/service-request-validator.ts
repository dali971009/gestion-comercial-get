import Joi from 'joi';
import httpStatus from 'http-status';
import { FormError, FormValidationError } from '../helper/errors/form-error';
import ApiError from '../helper/errors/api-error';
import { useClientService } from '../services/client-service';
import { ServiceRequestStatus } from '../config/enums/service-request-status';

export const useServiceRequestValidator = () => {
  const clientService = useClientService();

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
      const errorMessages: { [attribute: string]: FormValidationError } = {};
      error.details.forEach(details => {
        if (details.context?.key !== undefined) {
          errorMessages[details.context.key] = {
            type: details.type,
          };
        } else {
          errorMessages.extra = {
            type: details.type,
            params: {
              message: details.message,
            },
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

  async function serviceRequestCreateValidator(req: any, res: any, next: any) {
    let clientIds = (await clientService.getClientIds()).map(it => it.id);

    // create schema object
    const schema = Joi.object({
      applicationDate: Joi.date().required(),
      requestingEntityId: Joi.string()
        .uuid()
        .valid(...clientIds),
      contactName: Joi.string().required(),
      contactPosition: Joi.string().required(),
      contactEmail: Joi.string().email(),
      contactPhoneNumber: Joi.string(),
      scope: Joi.string().required(),
      status: Joi.number().valid(
        ServiceRequestStatus.UNDER_EVALUATION_BY_THE_CORRESPONDING_AREA,
        ServiceRequestStatus.NOT_ACCEPTED_BY_GET,
        ServiceRequestStatus.OFFER_OR_CONTRACT_PRESENTATION_PENDING,
        ServiceRequestStatus.IN_NEGOTIATION_PROCESS,
        ServiceRequestStatus.NOT_ACCEPTED_BY_CLIENT,
        ServiceRequestStatus.SIGNED_CONTRACT
      ),
    });
    validate(schema, req, res, next);
  }

  async function updateServiceRequestValidator(req: any, res: any, next: any) {
    let clientIds = (await clientService.getClientIds()).map(it => it.id);

    // create schema object
    const schema = Joi.object({
      id: Joi.string().uuid().required(),
      applicationDate: Joi.date().required(),
      requestingEntityId: Joi.string()
        .uuid()
        .valid(...clientIds),
      contactName: Joi.string().required(),
      contactPosition: Joi.string().required(),
      contactEmail: Joi.string(),
      contactPhoneNumber: Joi.string(),
      scope: Joi.string().required(),
      status: Joi.number().valid(
        ServiceRequestStatus.UNDER_EVALUATION_BY_THE_CORRESPONDING_AREA,
        ServiceRequestStatus.NOT_ACCEPTED_BY_GET,
        ServiceRequestStatus.OFFER_OR_CONTRACT_PRESENTATION_PENDING,
        ServiceRequestStatus.IN_NEGOTIATION_PROCESS,
        ServiceRequestStatus.NOT_ACCEPTED_BY_CLIENT,
        ServiceRequestStatus.SIGNED_CONTRACT
      ),
    });
    validate(schema, req, res, next);
  }

  async function getServiceRequestValidator(req: any, res: any, next: any) {
    const { error, value } = Joi.string().uuid().validate(req.params.id);
    if (error) {
      next(new ApiError(httpStatus.BAD_REQUEST, 'uuid.incorrect'));
    } else {
      next();
    }
  }

  return { serviceRequestCreateValidator, getServiceRequestValidator, updateServiceRequestValidator };
};
