import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateServiceTypeResponse,
  GetServiceTypeLabelsResponse,
  GetServiceTypeResponse,
  GetServiceTypesResponse,
  UpdateServiceTypeResponse,
} from '@/modules/api/models/service-type/service-type-responses';
import type {
  CreateServiceTypeRequest,
  GetServiceTypeRequest,
  UpdateServiceTypeRequest,
} from '@/modules/api/models/service-type/service-type-requests';

export interface ServiceTypeApiInterface {
  getServiceTypesRaw(): Promise<AxiosResponse>;
  getServiceTypes(): Promise<GetServiceTypesResponse>;
  getServiceTypeLabelsRaw(): Promise<AxiosResponse>;
  getServiceTypeLabels(): Promise<GetServiceTypeLabelsResponse>;
  getServiceTypeRaw(request: GetServiceTypeRequest): Promise<AxiosResponse>;
  getServiceType(request: GetServiceTypeRequest): Promise<GetServiceTypeResponse>;
  createServiceTypeRaw(request: CreateServiceTypeRequest): Promise<AxiosResponse>;
  createServiceType(request: CreateServiceTypeRequest): Promise<CreateServiceTypeResponse>;
  updateServiceTypeRaw(request: UpdateServiceTypeRequest): Promise<AxiosResponse>;
  updateServiceType(request: UpdateServiceTypeRequest): Promise<UpdateServiceTypeResponse>;
}

class ServiceTypeApi extends BaseApi implements ServiceTypeApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getServiceTypesRaw(): Promise<AxiosResponse> {
    return this.axios.get('/service-types');
  }

  async getServiceTypes(): Promise<GetServiceTypesResponse> {
    const response = await this.getServiceTypesRaw();
    return { data: response.data };
  }

  async getServiceTypeLabelsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/service-types/labels');
  }

  async getServiceTypeLabels(): Promise<GetServiceTypeLabelsResponse> {
    const response = await this.getServiceTypeLabelsRaw();
    return { data: response.data };
  }

  async getServiceTypeRaw(request: GetServiceTypeRequest): Promise<AxiosResponse> {
    return this.axios.get(`/service-types/${request.id}`);
  }

  async getServiceType(request: GetServiceTypeRequest): Promise<GetServiceTypeResponse> {
    const response = await this.getServiceTypeRaw(request);
    return { data: response.data };
  }

  async createServiceTypeRaw(request: CreateServiceTypeRequest): Promise<AxiosResponse> {
    return this.axios.post(`/service-types`, { ..._.omitBy(request.serviceType, _.isNil) });
  }

  async createServiceType(request: CreateServiceTypeRequest): Promise<CreateServiceTypeResponse> {
    const response = await this.createServiceTypeRaw(request);
    return { data: response.data };
  }

  async updateServiceTypeRaw(request: UpdateServiceTypeRequest): Promise<AxiosResponse> {
    return this.axios.put(`/service-types`, { ..._.omitBy(request.serviceType, _.isNil) });
  }

  async updateServiceType(request: UpdateServiceTypeRequest): Promise<UpdateServiceTypeResponse> {
    const response = await this.updateServiceTypeRaw(request);
    return { data: response.data };
  }
}

export default ServiceTypeApi;
