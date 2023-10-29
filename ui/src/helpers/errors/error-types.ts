enum ErrorType {
  STRING_EMPTY = 'string.empty',
  STRING_MIN = 'string.min',
  EMAIL = 'string.email',

  PASSWORDS_MATCH = 'passwordsmatch',
  REQUIRED = 'required',
  REQUIRED_IF = 'required_if',
  CHECK_RPM = 'check_rpm',
  INHERIT_WITH_RESERVED_QUOTA = 'inherit_with_reserved_quota',
  URL = 'url',
  INVALID_URL = 'invalid_url',
  GTE = 'gte',
  ONE_OF = 'oneof',
  ALPHA_NUM = 'alphanum',
  START_DATE_AFTER_END_DATE = 'start_date_after_end_date',
  START_DATE_EQUAL_END_DATE = 'start_date_equal_to_end_date',
  SUBDOMAIN_UNIQUE = 'subdomain_unique',
  INCORRECT_FLOAT = 'INCORRECT_FLOAT',
  FORBIDDEN_NEGATIVE_NUMBER = 'FORBIDDEN_NEGATIVE_NUMBER',
  OUT_OF_RANGE = 'OUT_OF_RANGE',
  INVALID_IPS = 'invalid_ips',
  INCORRECT_INT = 'incorrect_int',
  VALUE_TOO_SMALL = 'value_too_small',
  VALUE_LESS_THEN_ANOTHER_FIELD = 'gtefield',
  INVALID_FORMAT = 'invalid_format',
  IP_GT = 'ip_gt',
  IP_CIDR = 'ip|cidr',
  MIN = 'min',
}

export default ErrorType;