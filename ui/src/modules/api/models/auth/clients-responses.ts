import type { Client } from '@/models/client';

export interface GetClientsResponse {
  data: Client[];
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
