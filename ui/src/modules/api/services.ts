import { type AxiosInstance, type AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateServiceResponse,
  GetServiceLabelsResponse,
  GetServiceResponse,
  GetServicesResponse,
  UpdateServiceResponse,
} from '@/modules/api/models/service/service-responses';
import {
  type CreateServiceRequest,
  type GetServiceRequest,
  type UpdateServiceRequest,
} from '@/modules/api/models/service/service-requests';

export interface ServiceApiInterface {
  getServicesRaw(): Promise<AxiosResponse>;
  getServices(): Promise<GetServicesResponse>;
  getServiceLabelsRaw(): Promise<AxiosResponse>;
  getServiceLabels(): Promise<GetServiceLabelsResponse>;
  getServiceRaw(request: GetServiceRequest): Promise<AxiosResponse>;
  getService(request: GetServiceRequest): Promise<GetServiceResponse>;
  createServiceRaw(request: CreateServiceRequest): Promise<AxiosResponse>;
  createService(request: CreateServiceRequest): Promise<CreateServiceResponse>;
  updateServiceRaw(request: UpdateServiceRequest): Promise<AxiosResponse>;
  updateService(request: UpdateServiceRequest): Promise<UpdateServiceResponse>;
}

class ServiceApi extends BaseApi implements ServiceApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getServicesRaw(): Promise<AxiosResponse> {
    return this.axios.get('/services');
  }

  async getServices(): Promise<GetServicesResponse> {
    const response = await this.getServicesRaw();
    return { data: response.data };
  }

  async getServiceLabelsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/services/labels');
  }

  async getServiceLabels(): Promise<GetServiceLabelsResponse> {
    const response = await this.getServiceLabelsRaw();
    return { data: response.data };
  }

  async getServiceRaw(request: GetServiceRequest): Promise<AxiosResponse> {
    return this.axios.get(`/services/${request.id}`);
  }

  async getService(request: GetServiceRequest): Promise<GetServiceResponse> {
    const response = await this.getServiceRaw(request);
    return { data: response.data };
  }

  async createServiceRaw(request: CreateServiceRequest): Promise<AxiosResponse> {
    return this.axios.post(`/services`, { ..._.omitBy(request.service, _.isNil) });
  }

  async createService(request: CreateServiceRequest): Promise<CreateServiceResponse> {
    const response = await this.createServiceRaw(request);
    return { data: response.data };
  }

  async updateServiceRaw(request: UpdateServiceRequest): Promise<AxiosResponse> {
    return this.axios.put(`/services`, { ..._.omitBy(request.service, _.isNil) });
  }

  async updateService(request: UpdateServiceRequest): Promise<UpdateServiceResponse> {
    const response = await this.updateServiceRaw(request);
    return { data: response.data };
  }
}

export default ServiceApi;
