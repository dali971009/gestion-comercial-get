import type { ServiceType } from '@/models/service-type';

export interface GetServiceTypeRequest {
  clientId: string;
}

export interface CreateServiceTypeRequest {
  serviceType: ServiceType;
}

export interface UpdateServiceTypeRequest {
  serviceType: ServiceType;
}
