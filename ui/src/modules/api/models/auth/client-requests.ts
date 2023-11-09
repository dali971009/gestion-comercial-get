import type { Client } from '@/models/client';

export interface GetClientRequest {
  clientId: string;
}

export interface CreateClientRequest {
  client: Client;
}

export interface UpdateClientRequest {
  clientId: string;
  client: Client;
}
