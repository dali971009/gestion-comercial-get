import type { AxiosInstance, AxiosResponse } from 'axios';
import type { LoginResponse, RefreshTokenResponse } from './models/auth/auth-responses';
import type { LoginRequest, RemoveTokenRequest } from './models/auth/auth-requests';
import BaseApi from './base';

export interface AuthApiInterface {
  loginRaw(request: LoginRequest): Promise<AxiosResponse>;
  login(request: LoginRequest): Promise<LoginResponse>;
  checkTokenRaw(): Promise<AxiosResponse>;
  checkToken(): Promise<void>;
  refreshTokenRaw(): Promise<AxiosResponse>;
  refreshToken(): Promise<RefreshTokenResponse>;
  removeTokenRaw(request: RemoveTokenRequest): Promise<AxiosResponse>;
  removeToken(request: RemoveTokenRequest): Promise<void>;
}

class AuthApi extends BaseApi implements AuthApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async loginRaw(request: LoginRequest): Promise<AxiosResponse> {
    return this.axios.post('/auth/login', {
      email: request.email,
      password: request.password,
    });
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await this.loginRaw(request);
    return response.data;
  }

  async refreshTokenRaw(): Promise<AxiosResponse> {
    return this.axios.post('/auth/refresh-token');
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await this.refreshTokenRaw();
    return response.data;
  }

  async checkTokenRaw(): Promise<AxiosResponse> {
    return this.axios.post('/auth/check-token');
  }

  async checkToken(): Promise<void> {
    await this.checkTokenRaw();
  }

  async removeTokenRaw(request: RemoveTokenRequest): Promise<AxiosResponse> {
    return this.axios.post('/auth/remove-token', {
      accessToken: request.accessToken,
      refreshToken: request.refreshToken,
    });
  }

  async removeToken(request: RemoveTokenRequest): Promise<void> {
    await this.removeTokenRaw(request);
  }
}

export default AuthApi;
