import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
} from '@/modules/api/models/auth/user-responses';
import type { User } from '@/models/user';
import type { CreateUserRequest, GetUserRequest, UpdateUserRequest } from '@/modules/api/models/auth/user-requests';

export interface UserApiInterface {
  getUsersRaw(): Promise<AxiosResponse>;
  getUsers(): Promise<GetUsersResponse>;
  getUserRaw(request: GetUserRequest): Promise<AxiosResponse>;
  getUser(request: GetUserRequest): Promise<GetUserResponse>;
  createUserRaw(request: CreateUserRequest): Promise<AxiosResponse>;
  createUser(request: CreateUserRequest): Promise<CreateUserResponse>;
  updateUserRaw(request: UpdateUserRequest): Promise<AxiosResponse>;
  updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse>;
}

class UserApi extends BaseApi implements UserApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getUsersRaw(): Promise<AxiosResponse> {
    return this.axios.get('/users');
  }

  async getUsers(): Promise<GetUsersResponse> {
    const response = await this.getUsersRaw();
    return { data: response.data };
  }

  async getUserRaw(request: GetUserRequest): Promise<AxiosResponse> {
    return this.axios.get(`/users/${request.id}`);
  }

  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const response = await this.getUserRaw(request);
    return { data: response.data };
  }

  async createUserRaw(request: CreateUserRequest): Promise<AxiosResponse> {
    const user = _.cloneDeep(request.user);
    return this.axios.post(`/users`, { ..._.omitBy(request.user, _.isNil) });
  }

  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    const response = await this.createUserRaw(request);
    const user: User = response.data;
    return { data: user };
  }

  async updateUserRaw(request: UpdateUserRequest): Promise<AxiosResponse> {
    return this.axios.put(`/users`, { ..._.omitBy(request.user, _.isNil) });
  }

  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const response = await this.updateUserRaw(request);
    const user: User = response.data;
    return { data: user };
  }
}

export default UserApi;
