import type { Contract } from '@/models/contract';

export interface GetContractsResponse {
  data: Contract[];
}

export interface GetContractResponse {
  data: Contract;
}

export interface CreateContractResponse {
  data: Contract;
}

export interface UpdateContractResponse {
  data: Contract;
}

export interface PrintContractResponse {
  data: string;
}
