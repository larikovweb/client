import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../redux/slice/authSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { MAIN_ROUTE } from '../utils';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const logout = useCallback(() => {
    navigate(MAIN_ROUTE);
    dispatch(logoutAction());
  }, [dispatch]);

  return { isAuth, logout };
};

export default useAuth;
