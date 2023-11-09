import type { ServiceType } from '@/models/service-type';

export interface GetServiceTypesResponse {
  data: ServiceType[];
}

export interface GetServiceTypeResponse {
  data: ServiceType;
}

export interface CreateServiceTypeResponse {
  data: ServiceType;
}

export interface UpdateServiceTypeResponse {
  data: ServiceType;
}
