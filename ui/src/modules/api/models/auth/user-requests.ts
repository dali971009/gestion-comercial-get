import type { User } from '@/models/user';

export interface GetUserRequest {
  id: string;
}

export interface CreateUserRequest {
  user: User;
}

export interface UpdateUserRequest {
  user: User;
}
