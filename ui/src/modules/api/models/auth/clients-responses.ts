import type { Client } from '@/models/client';
import { LabelResult } from '@/models/label-result';

export interface GetClientsResponse {
  data: Client[];
}

export interface GetClientLabelsResponse {
  data: LabelResult[];
}

export interface GetClientResponse {
  data: Client;
}

export interface CreateClientResponse {
  data: Client;
}

export interface UpdateClientResponse {
  data: Client;
}
