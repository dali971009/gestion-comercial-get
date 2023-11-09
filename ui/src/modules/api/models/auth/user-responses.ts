import type { User } from '@/models/user';

export interface GetUsersResponse {
  data: User[];
}

export interface GetUserResponse {
  data: User;
}

export interface CreateUserResponse {
  data: User;
}

export interface UpdateUserResponse {
  data: User;
}
