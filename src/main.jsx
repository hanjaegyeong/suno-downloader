import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getLang } from './i18n';
import './styles.css';

document.documentElement.lang = getLang();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
