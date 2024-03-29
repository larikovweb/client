import { type FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GlobalStyles } from '../styled/GlobalStyles';
import { setupStore } from '../redux/store';
import { ProtectedRoute } from '../components/route/ProtectedRoute';
import useAuth from '../hooks/useAuth';
import { privateRoutes, publicRoutes } from './routes';
import { Layout } from './Layout/Layout';

const Application: FC = () => {
  const store = setupStore();

  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <BrowserRouter>
          <RouteSelect />
        </BrowserRouter>
      </Provider>
    </>
  );
};

const RouteSelect: FC = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        {publicRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
        <Route element={<ProtectedRoute auth={isAuth} />}>
          {privateRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default Application;
