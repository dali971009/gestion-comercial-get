import type { ServiceRequest } from '@/models/service-request';

export interface GetServiceRequestRequest {
  id: string;
}

export interface CreateServiceRequestRequest {
  serviceRequest: ServiceRequest;
}

export interface UpdateServiceRequestRequest {
  serviceRequest: ServiceRequest;
}
