import type { User } from '@/models/user';

export interface GetUserRequest {
  clientId: string;
}

export interface CreateUserRequest {
  user: User;
}

export interface UpdateUserRequest {
  user: User;
}
