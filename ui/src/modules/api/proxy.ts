import axios from 'axios';
import AuthApi, { type AuthApiInterface } from './auth';
import BaseApi from './base';
import type RequestType from '@/modules/api/models/auth/request-type';
import lodash from 'lodash';
import ClientApi, { type ClientApiInterface } from '@/modules/api/clients';
import type { UserApiInterface } from '@/modules/api/users';
import UserApi from '@/modules/api/users';
import type { ServiceTypeApiInterface } from '@/modules/api/service-types';
import ServiceTypeApi from '@/modules/api/service-types';
import type { ServiceApiInterface } from '@/modules/api/services';
import ServiceApi from '@/modules/api/services';
import type { ServiceRequestApiInterface } from '@/modules/api/service-requests';
import ServiceRequestApi from '@/modules/api/service-requests';
import type { CommercialOfferApiInterface } from '@/modules/api/commercial-offers';
import CommercialOfferApi from '@/modules/api/commercial-offers';
import type { ContractApiInterface } from '@/modules/api/contracts';
import ContractApi from '@/modules/api/contracts';
import type {ProductionReportApiInterface} from "@/modules/api/production-reports";
import ProductionReportApi from "@/modules/api/production-reports";

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

const makeServiceTypeApi = (): ServiceTypeApiInterface => makeApiInstance(ServiceTypeApi);

const makeServiceApi = (): ServiceApiInterface => makeApiInstance(ServiceApi);

const makeServiceRequestApi = (): ServiceRequestApiInterface => makeApiInstance(ServiceRequestApi);

const makeCommercialOfferApi = (): CommercialOfferApiInterface => makeApiInstance(CommercialOfferApi);

const makeContractApi = (): ContractApiInterface => makeApiInstance(ContractApi);

const makeProductionReportApi = (): ProductionReportApiInterface => makeApiInstance(ProductionReportApi);

export {
  makeAuthApi,
  makeClientApi,
  makeUserApi,
  makeServiceTypeApi,
  makeServiceApi,
  makeServiceRequestApi,
  makeCommercialOfferApi,
  makeContractApi,
  makeProductionReportApi,
};
