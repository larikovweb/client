import { Outlet } from 'react-router-dom';
import { FC } from 'react';
import { DialogLayout } from '../dialog';
import LoginForm from '../LoginForm';

interface IProtectedRoute {
  auth: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = (props: IProtectedRoute) => {
  const { auth } = props;
  if (!auth) {
    return (
      <DialogLayout>
        <LoginForm />
      </DialogLayout>
    );
  }
  return <Outlet />;
};
