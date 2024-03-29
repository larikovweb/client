import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { IUser } from '../../interfaces/user';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    users: build.query<IUser[], undefined>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
  }),
});
