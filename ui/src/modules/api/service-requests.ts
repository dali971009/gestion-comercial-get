import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateServiceRequestResponse,
  GetServiceRequestLabelsResponse,
  GetServiceRequestResponse,
  GetServiceRequestsResponse,
  UpdateServiceRequestResponse,
} from '@/modules/api/models/service-request/service-request-responses';
import type {
  CreateServiceRequestRequest,
  GetServiceRequestRequest,
  UpdateServiceRequestRequest,
} from '@/modules/api/models/service-request/service-request-requests';

export interface ServiceRequestApiInterface {
  getServiceRequestsRaw(): Promise<AxiosResponse>;
  getServiceRequests(): Promise<GetServiceRequestsResponse>;
  getServiceRequestLabelsRaw(): Promise<AxiosResponse>;
  getServiceRequestLabels(): Promise<GetServiceRequestLabelsResponse>;
  getServiceRequestRaw(request: GetServiceRequestRequest): Promise<AxiosResponse>;
  getServiceRequest(request: GetServiceRequestRequest): Promise<GetServiceRequestResponse>;
  createServiceRequestRaw(request: CreateServiceRequestRequest): Promise<AxiosResponse>;
  createServiceRequest(request: CreateServiceRequestRequest): Promise<CreateServiceRequestResponse>;
  updateServiceRequestRaw(request: UpdateServiceRequestRequest): Promise<AxiosResponse>;
  updateServiceRequest(request: UpdateServiceRequestRequest): Promise<UpdateServiceRequestResponse>;
}

class ServiceRequestApi extends BaseApi implements ServiceRequestApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getServiceRequestsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/service-requests');
  }

  async getServiceRequests(): Promise<GetServiceRequestsResponse> {
    const response = await this.getServiceRequestsRaw();
    return { data: response.data };
  }

  async getServiceRequestLabelsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/service-requests/labels');
  }

  async getServiceRequestLabels(): Promise<GetServiceRequestLabelsResponse> {
    const response = await this.getServiceRequestLabelsRaw();
    return { data: response.data };
  }

  async getServiceRequestRaw(request: GetServiceRequestRequest): Promise<AxiosResponse> {
    return this.axios.get(`/service-requests/${request.id}`);
  }

  async getServiceRequest(request: GetServiceRequestRequest): Promise<GetServiceRequestResponse> {
    const response = await this.getServiceRequestRaw(request);
    return { data: response.data };
  }

  async createServiceRequestRaw(request: CreateServiceRequestRequest): Promise<AxiosResponse> {
    return this.axios.post(`/service-requests`, { ..._.pickBy(request.serviceRequest) });
  }

  async createServiceRequest(request: CreateServiceRequestRequest): Promise<CreateServiceRequestResponse> {
    const response = await this.createServiceRequestRaw(request);
    return { data: response.data };
  }

  async updateServiceRequestRaw(request: UpdateServiceRequestRequest): Promise<AxiosResponse> {
    return this.axios.put(`/service-requests`, { ..._.pickBy(request.serviceRequest) });
  }

  async updateServiceRequest(request: UpdateServiceRequestRequest): Promise<UpdateServiceRequestResponse> {
    const response = await this.updateServiceRequestRaw(request);
    return { data: response.data };
  }
}

export default ServiceRequestApi;
