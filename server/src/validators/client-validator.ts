import Joi from "joi";
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
        const clientContactSchema = Joi.object({
            fullName: Joi.string(),
            ci: Joi.string(),
            position: Joi.string(),
            email: Joi.string().email(),
            phone: Joi.string(),
            isMainStaff: Joi.boolean(),
        });
        // create schema object
        const schema = Joi.object({
          code: Joi.string().required(),
          officialName: Joi.string().required(),
          acronym: Joi.string(),
          creationDate: Joi.date(),
          organism: Joi.string(),
          osdeGroupUnion: Joi.string(),
          company: Joi.string(),
          codeREEUP: Joi.string(),
          nit: Joi.string(),
          commercialRegister: Joi.string(),
          address: Joi.string(),
          municipality: Joi.string(),
          province: Joi.string(),
          /* TODO staff: Joi.object({
              director: Joi.valid(clientContactSchema),
              economic: Joi.valid(clientContactSchema),
              itPerson: Joi.valid(clientContactSchema),
              authorizedPeople: Joi.array().items((
                Joi.object(Joi.valid(clientContactSchema))
              )),
          }), */
          // TODO authorizedPeople: Joi.string(),
          status: Joi.number().integer(),
          bankAccount: Joi.string(),
          accountName: Joi.string(),
          bank: Joi.string(),
        });
        validate(schema, req, res, next);
    }

    async function updateClientValidator(req: any, res: any, next: any) {
      Joi.string().uuid().validate(req.params.id);
      // TODO validate id in url match id in body
        // create schema object
        const schema = Joi.object({
          code: Joi.string(),
          officialName: Joi.string(),
          acronym: Joi.string(),
          creationDate: Joi.date(),
          organism: Joi.string(),
          osdeGroupUnion: Joi.string(),
          company: Joi.string(),
          codeREEUP: Joi.string(),
          nit: Joi.string(),
          commercialRegister: Joi.string(),
          address: Joi.string(),
          municipality: Joi.string(),
          province: Joi.string(),
          // TODO authorizedPeople: Joi.string(),
          status: Joi.number().integer(),
          bankAccount: Joi.string(),
          accountName: Joi.string(),
          bank: Joi.string(),
        });
        validate(schema, req, res, next);
    }

    async function getClientValidator(req: any, res: any, next: any) {
        Joi.string().uuid().validate(req.params.id);
        // create schema object
        const schema = Joi.object({
            // id: Joi.string().uuid().required(),
        });
        validate(schema, req, res, next);
    }

    return { createClientValidator, updateClientValidator, getClientValidator }
}
