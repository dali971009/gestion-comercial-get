import type { ServiceType } from '@/models/service-type';

export interface GetServiceTypeRequest {
  id: string;
}

export interface CreateServiceTypeRequest {
  serviceType: ServiceType;
}

export interface UpdateServiceTypeRequest {
  serviceType: ServiceType;
}
