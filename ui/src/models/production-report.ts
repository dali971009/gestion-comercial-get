import type { Client } from './client';
import type { Service } from './service';
import type { Contract } from './contract';

enum ServiceProvidedModalityType {
  EQUAL = 1,
  PUNCTUAL = 2,
}

enum ServiceProvidedPeriodType {
  MONTH = 1,
  QUARTER = 2,
  SEMESTER = 3,
  YEAR = 4,
}

export interface ServiceProvided {
  id: string;
  number: number;
  code: string;
  client: Client;
  service: Service;
  contract: Contract;
  quantity: number;
  amount: number;
  costCenter: number;
  modalityType: ServiceProvidedModality;
  periodType: ServiceProvidedPeriodType;
  invoiceNumber: string;
}

export interface PersonInvolved {
  id: string;
  fullName: string;
  position: string;
  date: Date;
}

export interface ProductionReport {
  id: string;
  area: string;
  month: number;
  incomePlan: number;
  totalAmount: number;
  services: ServiceProvided[];
  madeBy: PersonInvolved;
  reconciledWith: PersonInvolved;
  approvedBy: PersonInvolved;
}
