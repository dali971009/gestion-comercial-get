import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateClientResponse,
  GetClientResponse,
  GetClientsResponse,
  UpdateClientResponse,
  GetClientLabelsResponse,
} from '@/modules/api/models/auth/clients-responses';
import type { Client } from '@/models/client';
import type {
  CreateClientRequest,
  GetClientRequest,
  UpdateClientRequest,
} from '@/modules/api/models/auth/client-requests';

export interface ClientApiInterface {
  getClientsRaw(): Promise<AxiosResponse>;
  getClients(): Promise<GetClientsResponse>;
  getClientRaw(request: GetClientRequest): Promise<AxiosResponse>;
  getClientLabelsRaw(): Promise<AxiosResponse>;
  getClientLabels(): Promise<GetClientLabelsResponse>;
  getClient(request: GetClientRequest): Promise<GetClientResponse>;
  createClientRaw(request: CreateClientRequest): Promise<AxiosResponse>;
  createClient(request: CreateClientRequest): Promise<CreateClientResponse>;
  updateClientRaw(request: UpdateClientRequest): Promise<AxiosResponse>;
  updateClient(request: UpdateClientRequest): Promise<UpdateClientResponse>;
}

class ClientApi extends BaseApi implements ClientApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getClientsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/clients');
  }

  async getClients(): Promise<GetClientsResponse> {
    const response = await this.getClientsRaw();
    return { data: response.data };
  }

  async getClientRaw(request: GetClientRequest): Promise<AxiosResponse> {
    return this.axios.get(`/clients/${request.clientId}`);
  }

  async getClientLabelsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/clients/labels');
  }

  async getClientLabels(): Promise<GetClientLabelsResponse> {
    const response = await this.getClientLabelsRaw();
    return { data: response.data };
  }

  async getClient(request: GetClientRequest): Promise<GetClientResponse> {
    const response = await this.getClientRaw(request);
    return { data: response.data };
  }

  async createClientRaw(request: CreateClientRequest): Promise<AxiosResponse> {
    return this.axios.post(`/clients`, { ..._.omitBy(request.client, _.isNil) });
  }

  async createClient(request: CreateClientRequest): Promise<CreateClientResponse> {
    const response = await this.createClientRaw(request);
    return { data: response.data };
  }

  async updateClientRaw(request: UpdateClientRequest): Promise<AxiosResponse> {
    return this.axios.put(`/clients/${request.clientId}`, { ..._.omitBy(request.client, _.isNil) });
  }

  async updateClient(request: UpdateClientRequest): Promise<UpdateClientResponse> {
    const response = await this.updateClientRaw(request);
    const client: Client = response.data;
    return { data: client };
  }
}

export default ClientApi;
