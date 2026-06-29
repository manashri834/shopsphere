import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './App.tsx';
import './index.css';

// Restore auth state from localStorage when the app first loads
const user = localStorage.getItem('user');
const accessToken = localStorage.getItem('accessToken');

if (user && accessToken) {
  store.dispatch({
    type: 'auth/setCredentials',
    payload: { user: JSON.parse(user), accessToken },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);