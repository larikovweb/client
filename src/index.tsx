import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import { createContext } from 'react';

interface IContext {
  store: Store;
}

const store = new Store();

export const Context = createContext<IContext>({
  store,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>,
);
