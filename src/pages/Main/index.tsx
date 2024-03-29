import { FC } from 'react';
import { isDefined } from '@bunt/is';
import { userAPI } from '../../redux/service/userService';
import useAuth from '../../hooks/useAuth';
import LoginForm from '../../components/LoginForm';

const Main: FC = () => {
  const { isAuth, logout } = useAuth();
  const { data: users, isLoading } = userAPI.useUsersQuery(undefined);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>{isAuth ? `Пользователь авторизован ` : 'Авторизуйтесь'}</h1>
      <button onClick={() => logout()}>Выйти</button>
      {isDefined(users) &&
        users.map((user) => (
          <div key={user.email}>
            {user.email} <b>{user.isActivated ? 'Активирован' : 'Не aктивирован'}</b>
          </div>
        ))}
    </div>
  );
};

export default Main;
