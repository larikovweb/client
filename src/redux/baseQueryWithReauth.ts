import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { SERVER_URL } from '../utils';
import { RootState } from './store';
import { setAuth } from './slice/authSlice';

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && 'status' in result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/refresh',
        method: 'PUT',
        body: {
          accessToken: (api.getState() as RootState).auth.accessToken,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as RefreshTokenResponse;
      api.dispatch(setAuth(accessToken));

      if (!args.headers) {
        args.headers = new Headers();
      }
      if (args.headers instanceof Headers) {
        args.headers.set('Authorization', `Bearer ${accessToken}`);
      } else {
        args.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
