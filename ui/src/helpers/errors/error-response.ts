import ErrorType from '@/composable/errors/error-types';

export interface ErrorResponse {
  namespace: string;
  type: ErrorType;
  params?: {
    [key: string]: any;
  };
}
