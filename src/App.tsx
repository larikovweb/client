import { useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './interfaces/data';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (store.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>
          {user.email} <b>{user.isActivated ? 'Активирован' : 'Не aктивирован'}</b>
        </div>
      ))}
    </div>
  );
}

export default observer(App);
