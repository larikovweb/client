import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuth: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuth = true;
      localStorage.setItem('accessToken', action.payload);
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuth = false;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setAuth, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
