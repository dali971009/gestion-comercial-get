export interface LoginRequest {
  email: string;
  password: string;
}

export interface RemoveTokenRequest {
  accessToken: string;
  refreshToken: string;
}