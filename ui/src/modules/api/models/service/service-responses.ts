import { type Service, type ServiceGroup } from '@/models/service';

export interface GetServicesResponse {
  data: ServiceGroup[];
}

export interface GetServiceLabelsResponse {
  data: Service[];
}

export interface GetServiceResponse {
  data: Service;
}

export interface CreateServiceResponse {
  data: Service;
}

export interface UpdateServiceResponse {
  data: Service;
}
