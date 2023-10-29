import { ErrorResponse } from './error-response';
import { computed, ref } from 'vue';
import { AxiosError } from 'axios';
import { makeErrorMessage } from './util';

export const useErrorHandler = () => {
  const _errors = ref<ErrorResponse[]>([]);

  function handleErrorResponse(error?: any) {
    if (error && error instanceof AxiosError && error.response?.status === 422) {
      const data = error.response?.data?.errors ?? {};
      const errors: ErrorResponse[] = [];
      for (const key of Object.keys(data)) {
        errors.push({
          namespace: key,
          type: data[key].type ?? '',
          params: data[key].params,
        });
      }
      _errors.value = errors;
      return true;
    }
    return false;
  }

  const getErrorObj = computed<{ [key: string]: string }>(() => {
    const messages: { [key: string]: string } = {};
    _errors.value.forEach(it => {
      messages[it.namespace] = makeErrorMessage(it);
    });
    return messages;
  });

  function reset() {
    _errors.value = [];
  }

  return { handleErrorResponse, getErrorObj, reset };
};
