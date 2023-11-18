import Joi from 'joi';
import httpStatus from 'http-status';
import { FormError, FormValidationError } from '../helper/errors/form-error';
import ApiError from '../helper/errors/api-error';
import { useServiceTypeService } from '../services/service-type-service';
import { InvoiceFrequency } from '../config/enums/service-invoice-frequency';

export const useServiceValidator = () => {
  const serviceTypeService = useServiceTypeService();

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
          if (details.context.key === 'typeId' && details.type === 'any.only') {
            errorMessages[details.context.key] = { type: 'any.exist' };
          } else {
            errorMessages[details.context.key] = {
              type: details.type,
            };
          }
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

  async function createServiceValidator(req: any, res: any, next: any) {
    let serviceTypeIds = (await serviceTypeService.getServiceTypeIds()).map(it => it.id);
    // create schema object
    const schema = Joi.object({
      description: Joi.string().required(),
      typeId: Joi.string()
        .uuid()
        .valid(...serviceTypeIds),
      unit: Joi.string(),
      price: Joi.number(),
      frequency: Joi.number().valid(
        InvoiceFrequency.OCCASIONALLY,
        InvoiceFrequency.MONTHLY,
        InvoiceFrequency.EVERY_THREE_MONTHS,
        InvoiceFrequency.EVERY_SIX_MONTHS,
        InvoiceFrequency.YEARLY
      ),
    });
    validate(schema, req, res, next);
  }

  async function updateServiceValidator(req: any, res: any, next: any) {
    let serviceTypeIds = (await serviceTypeService.getServiceTypeIds()).map(it => it.id);

    // create schema object
    const schema = Joi.object({
      id: Joi.string().uuid().required(),
      description: Joi.string().required(),
      typeId: Joi.string()
        .uuid()
        .valid(...serviceTypeIds),
      unit: Joi.string(),
      price: Joi.number(),
      frequency: Joi.number().valid(
        InvoiceFrequency.OCCASIONALLY,
        InvoiceFrequency.MONTHLY,
        InvoiceFrequency.EVERY_THREE_MONTHS,
        InvoiceFrequency.EVERY_SIX_MONTHS,
        InvoiceFrequency.YEARLY
      ),
    });
    validate(schema, req, res, next);
  }

  async function getServiceValidator(req: any, res: any, next: any) {
    const { error, value } = Joi.string().uuid().validate(req.params.id);
    if (error) {
      next(new ApiError(httpStatus.BAD_REQUEST, 'uuid.incorrect'));
    } else {
      next();
    }
  }

  return { createServiceValidator, getServiceValidator, updateServiceValidator };
};
