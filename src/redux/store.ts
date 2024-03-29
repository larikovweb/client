import { combineReducers, configureStore } from '@reduxjs/toolkit/react';
import { useDispatch } from 'react-redux';
import auth from './slice/authSlice';
import notify from './slice/notificationsSlice';
import { authAPI } from './service/authService';
import { userAPI } from './service/userService';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  auth,
  notify,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware, userAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
