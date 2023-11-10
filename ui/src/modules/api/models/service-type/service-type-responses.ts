import type { ServiceType } from '@/models/service-type';
import type { LabelResult } from '@/models/label-result';

export interface GetServiceTypesResponse {
  data: ServiceType[];
}

export interface GetServiceTypeLabelsResponse {
  data: LabelResult[];
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
