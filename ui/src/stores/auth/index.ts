import { defineStore } from 'pinia';
import type { User } from '@/models/user';
import CookieNames from '@/helpers/cookies/cookie-names';
import { useLocalStorage } from '@vueuse/core';
import Cookies from 'js-cookie';
import type { LoginRequest } from '@/modules/api/models/auth/auth-requests';
import { makeAuthApi } from '@/modules/api/proxy';
import type { LoginResponse } from '@/modules/api/models/auth/auth-responses';
import RequestType from '@/modules/api/models/auth/request-type';

export default defineStore('auth', {
  state: () => ({
    user: useLocalStorage<User>('user', { firstName: '', lastName: '' }),
  }),
  getters: {
    isLogged() {
      return () => !!Cookies.get(CookieNames.ACCESS_TOKEN);
    },
  },
  actions: {
    async newSession(request: LoginRequest): Promise<LoginResponse> {
      if (this.isLogged()) {
        await this.removeSession();
      }
      try {
        const response = await makeAuthApi(RequestType.NEW_SESSION).login(request);
        const user = response.user;
        const accessToken = response.tokens.access;
        const refreshToken = response.tokens.refresh;
        this.user = user ?? { firstName: 'Test', lastName: 'User' };
        Cookies.set(CookieNames.ACCESS_TOKEN, accessToken.token, {
          sameSite: 'Lax',
        });
        Cookies.set(CookieNames.REFRESH_TOKEN, refreshToken.token, {
          sameSite: 'Lax',
        });
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkSession(): Promise<boolean> {
      const refreshToken = Cookies.get(CookieNames.REFRESH_TOKEN);
      try {
        await makeAuthApi(RequestType.CHECK_SESSION, refreshToken).checkToken();
        return true;
      } catch (error) {
        return false;
      }
    },
    async refreshSession(): Promise<boolean> {
      const refreshToken = Cookies.get(CookieNames.REFRESH_TOKEN);
      try {
        const response = await makeAuthApi(RequestType.CHECK_SESSION, refreshToken).refreshToken();
        const newAccessToken = response.access;
        const newRefreshToken = response.refresh;
        Cookies.set(CookieNames.ACCESS_TOKEN, newAccessToken.token, {
          sameSite: 'Lax',
        });
        Cookies.set(CookieNames.REFRESH_TOKEN, newRefreshToken.token, {
          sameSite: 'Lax',
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    async removeSession(): Promise<boolean> {
      const accessToken = Cookies.get(CookieNames.ACCESS_TOKEN);
      // @ts-ignore
      const refreshToken: string =
        Cookies.get(CookieNames.REFRESH_TOKEN) !== undefined ? Cookies.get(CookieNames.REFRESH_TOKEN) : '';

      if (!accessToken) {
        return true;
      }
      try {
        await makeAuthApi(RequestType.DELETE_SESSION).removeToken({
          accessToken,
          refreshToken,
        });
        return true;
      } catch (error: any) {
        return error.status === 403;
      }
    },
    async logout() {
      Cookies.remove(CookieNames.ACCESS_TOKEN);
      Cookies.remove(CookieNames.REFRESH_TOKEN);
      localStorage.removeItem('user');
    },
  },
});
