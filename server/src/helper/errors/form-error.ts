import httpStatus from 'http-status';

export interface FormValidationError {
  type: string;
  params?: {
    [key: string]: any;
  };
}

export class FormError extends Error {
  public readonly statusCode: number;
  public readonly errors: { [attribute: string]: FormValidationError };
  constructor(errors: { [attribute: string]: FormValidationError }) {
    super(JSON.stringify({ errors }));
    this.statusCode = httpStatus.UNPROCESSABLE_ENTITY;
    this.errors = errors;
  }
}
