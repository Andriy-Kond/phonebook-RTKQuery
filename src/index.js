import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

// Для підключення Redux треба огорнути застосунок у Provider:
import { Provider } from 'react-redux';
// Provider приймайє store, тому маємо його теж імпортувати:
import storeRedux from './store/indexStore';

// Дістати зі стору будь-яке значення - хук useSelector
// Для виконання якоїсь дії стору - хук useDispatch

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Огортаємо App в Provider, щоби у App був доступ до store */}
    <Provider store={storeRedux}>
      <App />
    </Provider>
  </React.StrictMode>
);
