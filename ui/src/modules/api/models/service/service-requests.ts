import { type Service } from '@/models/service';

export interface GetServiceRequest {
  id: string;
}

export interface CreateServiceRequest {
  service: Service;
}

export interface UpdateServiceRequest {
  service: Service;
}
