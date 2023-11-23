import Joi from 'joi';
import httpStatus from 'http-status';
import { FormError, FormValidationError } from '../helper/errors/form-error';
import ApiError from '../helper/errors/api-error';
import { ContractType } from '../config/enums/contract-type';
import { WayToPay } from '../config/enums/way-to-pay';
import { useClientService } from '../services/client-service';

export const useContractValidator = () => {
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

  async function contractCreateValidator(req: any, res: any, next: any) {
    let clientIds = (await clientService.getClientIds()).map(it => it.id);

    // create schema object
    const schema = Joi.object({
      clientId: Joi.string()
        .uuid()
        .valid(...clientIds),
      identificationOfTheParts: Joi.string().required(),
      object: Joi.string().required(),
      value: Joi.number().required(),
      type: Joi.number()
        .required()
        .valid(
          ContractType.CONTRACT_OF_SERVICE,
          ContractType.LOAN_AGREEMENT,
          ContractType.PROJECT_DOCUMENTATION,
          ContractType.EXECUTION_OF_WORK,
          ContractType.LEASING_CONTRACT
        ),
      includeCL: Joi.boolean().default(false),
      agreedAdvance: Joi.number(),
      wayToPay: Joi.number().required().valid(WayToPay.CASH, WayToPay.TRANSFER, WayToPay.MIXED),
      signatureDate: req.body.isPreform ? Joi.date() : Joi.date().required(),
      validity: req.body.isPreform ? Joi.date() : Joi.date().required(),
      legalOpinion: Joi.string().required(),
      agreement: Joi.string(),
      observations: Joi.string(),
      isPreform: Joi.boolean().required(),
    });
    validate(schema, req, res, next);
  }

  async function updateContractValidator(req: any, res: any, next: any) {
    let clientIds = (await clientService.getClientIds()).map(it => it.id);

    // create schema object
    const schema = Joi.object({
      id: Joi.string().uuid().required(),
      clientId: Joi.string()
        .uuid()
        .valid(...clientIds),
      identificationOfTheParts: Joi.string().required(),
      object: Joi.string().required(),
      value: Joi.number().required(),
      type: Joi.number()
        .required()
        .valid(
          ContractType.CONTRACT_OF_SERVICE,
          ContractType.LOAN_AGREEMENT,
          ContractType.PROJECT_DOCUMENTATION,
          ContractType.EXECUTION_OF_WORK,
          ContractType.LEASING_CONTRACT
        ),
      includeCL: Joi.boolean().default(false),
      agreedAdvance: Joi.number().required(),
      wayToPay: Joi.number().required().valid(WayToPay.CASH, WayToPay.TRANSFER, WayToPay.MIXED),
      signatureDate: req.body.isPreform ? Joi.date() : Joi.date().required(),
      validity: req.body.isPreform ? Joi.date() : Joi.date().required(),
      legalOpinion: Joi.string(),
      agreement: Joi.string(),
      observations: Joi.string(),
      isPreform: Joi.boolean().required(),
    });
    validate(schema, req, res, next);
  }

  async function getContractValidator(req: any, res: any, next: any) {
    const { error, value } = Joi.string().uuid().validate(req.params.id);
    if (error) {
      next(new ApiError(httpStatus.BAD_REQUEST, 'uuid.incorrect'));
    } else {
      next();
    }
  }

  async function printContractValidator(req: any, res: any, next: any) {
    const { error, value } = Joi.string().uuid().validate(req.params.id);
    if (error) {
      next(new ApiError(httpStatus.BAD_REQUEST, 'uuid.incorrect'));
    } else {
      next();
    }
  }

  return { contractCreateValidator, getContractValidator, updateContractValidator, printContractValidator };
};
