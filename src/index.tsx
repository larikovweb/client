import { createRoot } from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Application from './app/Application';

const rootElement = document.getElementById('root');
if (rootElement) {
  const cache = createCache({ key: 'css', nonce: 'dev' });

  const root = createRoot(rootElement);
  root.render(
    <CacheProvider value={cache}>
      <Application />
    </CacheProvider>,
  );
}
