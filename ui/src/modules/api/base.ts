import type { AxiosInstance } from 'axios';

class BaseApi {
  protected axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
}

export default BaseApi;
