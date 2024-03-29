import React, { FC } from 'react';
import { authAPI } from '../redux/service/authService';
import { useAppDispatch } from '../redux/store';
import { setAuth } from '../redux/slice/authSlice';

const LoginForm: FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useAppDispatch();
  const [register] = authAPI.useRegisterMutation();
  const [login] = authAPI.useLoginMutation();

  const onLogin = async (email: string, password: string) => {
    const { accessToken } = await login({ email, password }).unwrap();
    dispatch(setAuth(accessToken));
  };

  const onRegister = async (email: string, password: string) => {
    const { accessToken } = await register({ email, password }).unwrap();
    dispatch(setAuth(accessToken));
  };

  return (
    <div>
      <input
        style={{ color: '#000' }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        style={{ color: '#000' }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        style={{ color: '#fff', backgroundColor: 'red' }}
        onClick={() => onLogin(email, password)}>
        Login
      </button>
      <button
        style={{ color: '#fff', backgroundColor: 'red' }}
        onClick={() => onRegister(email, password)}>
        Register
      </button>
    </div>
  );
};

export default LoginForm;
