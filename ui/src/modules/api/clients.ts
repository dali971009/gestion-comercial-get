import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateClientResponse,
  GetClientResponse,
  GetClientsResponse,
  UpdateClientResponse,
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

  async getClient(request: GetClientRequest): Promise<GetClientResponse> {
    const response = await this.getClientRaw(request);
    return { data: response.data };
  }

  async createClientRaw(request: CreateClientRequest): Promise<AxiosResponse> {
    const client = _.cloneDeep(request.client);
    return this.axios.post(`/clients`, client);
  }

  async createClient(request: CreateClientRequest): Promise<CreateClientResponse> {
    const response = await this.createClientRaw(request);
    const client: Client = response.data;
    return { data: client };
  }

  async updateClientRaw(request: UpdateClientRequest): Promise<AxiosResponse> {
    const client = _.pickBy(request.client);
    return this.axios.put(`/clients/${request.clientId}`, client);
  }

  async updateClient(request: UpdateClientRequest): Promise<UpdateClientResponse> {
    const response = await this.updateClientRaw(request);
    const client: Client = response.data;
    return { data: client };
  }
}

export default ClientApi;
