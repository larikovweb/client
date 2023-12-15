import React, { FC, useContext } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const LoginForm: FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { store } = useContext(Context);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.register(email, password)}>Register</button>
    </div>
  );
};

export default observer(LoginForm);
