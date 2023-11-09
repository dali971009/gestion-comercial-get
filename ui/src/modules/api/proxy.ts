import axios from 'axios';
import AuthApi, { type AuthApiInterface } from './auth';
import BaseApi from './base';
import type RequestType from '@/modules/api/models/auth/request-type';
import lodash from 'lodash';
import ClientApi, { type ClientApiInterface } from '@/modules/api/clients';
import type {UserApiInterface} from "@/modules/api/users";
import UserApi from "@/modules/api/users";

// @ts-ignore
const basePath: string = import.meta.env.VITE_API_BASE_PATH;
const makeApiInstance = (ApiClass: typeof BaseApi, headers?: object): any => {
  const instance = axios.create({
    baseURL: basePath,
    headers: {
      ...lodash.pickBy(headers ?? {}, lodash.identity),
    },
  });
  return new ApiClass(instance);
};

const makeAuthApi = (requestType?: RequestType, token?: string): AuthApiInterface =>
  makeApiInstance(AuthApi, {
    'X-Api-Key': token,
    'Request-Type': requestType,
  });

const makeClientApi = (): ClientApiInterface => makeApiInstance(ClientApi);

const makeUserApi = (): UserApiInterface => makeApiInstance(UserApi);

export { makeAuthApi, makeClientApi, makeUserApi };
