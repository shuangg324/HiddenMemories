import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const rootEl = document.getElementById('root');

if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootEl,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
