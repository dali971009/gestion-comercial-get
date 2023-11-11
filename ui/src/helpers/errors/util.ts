import ErrorType from '@/helpers/errors/error-types';
import { type ErrorResponse } from '@/helpers/errors/error-response';

export function makeErrorMessage(errorResponse: ErrorResponse): string {
  switch (errorResponse.type) {
    case ErrorType.REQUIRED:
      return 'Este campo es obligatorio';
    case ErrorType.STRING_EMPTY:
      return 'Este campo no puede estar vacío';
    case ErrorType.STRING_MIN:
      return `Este campo debe contener al menos ${errorResponse.params?.min} caracteres`;
    case ErrorType.EMAIL:
      return 'El correo no es válido';
    case ErrorType.PASSWORDS_MATCH:
      return 'Las contraseñas no coinciden';
    case ErrorType.INVALID_UUID:
      return 'Uuid inválido';
    case ErrorType.NOT_EXIST:
      return 'El elemento seleccionado no existe';

    case ErrorType.REQUIRED_IF:
      return 'This field is required';
    case ErrorType.URL:
    case ErrorType.INVALID_URL:
      return 'This is not a valid URL';
    case ErrorType.GTE:
      return `Should be greater than or equal to ${errorResponse.param}.`;
    case ErrorType.ONE_OF:
      return `Should be one of: ${errorResponse.param}`;
    case ErrorType.ALPHA_NUM:
      return 'Should be alphanumeric';
    case ErrorType.START_DATE_AFTER_END_DATE:
    case ErrorType.START_DATE_EQUAL_END_DATE:
      return 'Start date has to be before end date';
    case ErrorType.SUBDOMAIN_UNIQUE:
      return 'This is not a unique subdomain';
    case ErrorType.INVALID_IPS:
      return `The IPs: ${errorResponse.param} are invalid.`;
    case ErrorType.FORBIDDEN_NEGATIVE_NUMBER:
      return 'This value cannot be less than zero.';
    case ErrorType.INCORRECT_INT:
      return 'Required format is integer (e.g. 10)';
    case ErrorType.INCORRECT_FLOAT:
      return errorResponse.param
        ? `The required format is a number with up to ${errorResponse.param} decimal places (e.g. 10.23)`
        : 'Required format is number (e.g. 10.23)';
    case ErrorType.VALUE_TOO_SMALL:
      return 'The value is too small.';
    case ErrorType.VALUE_LESS_THEN_ANOTHER_FIELD:
      return `This value should not be less than '${errorResponse.param}'`;
    case ErrorType.CHECK_RPM:
      return errorResponse.param ?? 'This field is invalid.';
    case ErrorType.INHERIT_WITH_RESERVED_QUOTA:
      return 'If a reserved publisher budget or cap is set, the inheritance from advertiser is no longer possible.';
    case ErrorType.INVALID_FORMAT:
      return 'Invalid value format';
    case ErrorType.IP_GT:
      return 'End IP should be greater than Start IP';
    case ErrorType.IP_CIDR:
      return 'This is not a valid IP address according to CIDR notation. Please check';
    case ErrorType.OUT_OF_RANGE:
      return `Out of range (min: ${errorResponse.param.min}, max: ${errorResponse.param.max})`;
    case ErrorType.MIN:
      return `Select at least ${errorResponse.param} ${errorResponse.param === '1' ? 'element' : 'elements'}`;
    default:
      return `This field is invalid.`;
  }
}
