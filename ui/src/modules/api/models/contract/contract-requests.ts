import type { Contract } from '@/models/contract';

export interface GetContractRequest {
  id: string;
}

export interface CreateContractRequest {
  contract: Contract;
}

export interface UpdateContractRequest {
  contract: Contract;
}
