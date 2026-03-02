import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getLang, setLang } from './i18n';
import './styles.css';

setLang(getLang());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
