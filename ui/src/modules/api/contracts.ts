import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateContractResponse,
  GetContractResponse,
  GetContractsResponse,
  UpdateContractResponse,
} from '@/modules/api/models/contract/contract-responses';
import type {
  CreateContractRequest,
  GetContractRequest,
  UpdateContractRequest,
} from '@/modules/api/models/contract/contract-requests';

export interface ContractApiInterface {
  getContractsRaw(): Promise<AxiosResponse>;
  getContracts(): Promise<GetContractsResponse>;
  getContractRaw(request: GetContractRequest): Promise<AxiosResponse>;
  getContract(request: GetContractRequest): Promise<GetContractResponse>;
  createContractRaw(request: CreateContractRequest): Promise<AxiosResponse>;
  createContract(request: CreateContractRequest): Promise<CreateContractResponse>;
  updateContractRaw(request: UpdateContractRequest): Promise<AxiosResponse>;
  updateContract(request: UpdateContractRequest): Promise<UpdateContractResponse>;
}

class ContractApi extends BaseApi implements ContractApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getContractsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/contracts');
  }

  async getContracts(): Promise<GetContractsResponse> {
    const response = await this.getContractsRaw();
    return { data: response.data };
  }

  async getContractRaw(request: GetContractRequest): Promise<AxiosResponse> {
    return this.axios.get(`/contracts/${request.id}`);
  }

  async getContract(request: GetContractRequest): Promise<GetContractResponse> {
    const response = await this.getContractRaw(request);
    return { data: response.data };
  }

  async createContractRaw(request: CreateContractRequest): Promise<AxiosResponse> {
    return this.axios.post(`/contracts`, { ..._.omitBy(request.contract, _.isNil) });
  }

  async createContract(request: CreateContractRequest): Promise<CreateContractResponse> {
    const response = await this.createContractRaw(request);
    return { data: response.data };
  }

  async updateContractRaw(request: UpdateContractRequest): Promise<AxiosResponse> {
    return this.axios.put(`/contracts`, { ..._.omitBy(request.contract, _.isNil) });
  }

  async updateContract(request: UpdateContractRequest): Promise<UpdateContractResponse> {
    const response = await this.updateContractRaw(request);
    return { data: response.data };
  }
}

export default ContractApi;
