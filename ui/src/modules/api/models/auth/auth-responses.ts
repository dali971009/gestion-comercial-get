export interface LoginResponse {
  user: any;
  tokens: {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  };
}

export interface RefreshTokenResponse {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}
