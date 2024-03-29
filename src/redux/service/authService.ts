import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { IAuthResponse, ILoginRequest, isRegisterRequest } from '../../interfaces/auth';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    register: build.mutation<IAuthResponse, isRegisterRequest>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    refresh: build.mutation<{ accessToken: string; refreshToken: string }, void>({
      query: () => ({
        url: '/refresh',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    login: build.mutation<IAuthResponse, ILoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});
