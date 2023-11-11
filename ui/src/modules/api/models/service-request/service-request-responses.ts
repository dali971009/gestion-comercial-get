import type { ServiceRequest } from '@/models/service-request';
import type { LabelResult } from '@/models/label-result';

export interface GetServiceRequestsResponse {
  data: ServiceRequest[];
}

export interface GetServiceRequestLabelsResponse {
  data: LabelResult[];
}

export interface GetServiceRequestResponse {
  data: ServiceRequest;
}

export interface CreateServiceRequestResponse {
  data: ServiceRequest;
}

export interface UpdateServiceRequestResponse {
  data: ServiceRequest;
}
