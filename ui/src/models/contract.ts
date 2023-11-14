import type { Client } from '@/models/client';
import type { WayToPay } from '@/models/commercial-offer';

export enum ContractType {
  CONTRACT_OF_SERVICE = 1,
  LOAN_AGREEMENT = 2,
  PROJECT_DOCUMENTATION = 3,
  EXECUTION_OF_WORK = 4,
  LEASING_CONTRACT = 5,
}

export interface Contract {
  id?: string;
  number?: number;
  createAt?: Date;
  clientId?: string;
  client?: Client;
  identificationOfTheParts?: string;
  object?: string;
  value?: number;
  type?: ContractType;
  includeCL?: boolean;
  agreedAdvance?: number;
  wayToPay?: WayToPay;
  signatureDate?: Date;
  validity?: Date;
  legalOpinion?: string;
  agreement?: string;
  observations?: string;
  isPreform?: boolean;
  oldVersions: ContractOldVersion[];
}

export interface ContractOldVersion {
  id?: string;
  createAt?: Date;
  clientId?: string;
  client?: Client;
  identificationOfTheParts?: string;
  object?: string;
  value?: number;
  type?: ContractType;
  includeCL?: boolean;
  agreedAdvance?: number;
  wayToPay?: WayToPay;
  signatureDate?: Date;
  validity?: Date;
  legalOpinion?: string;
  agreement?: string;
  observations?: string;
}
