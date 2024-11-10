import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import LoginPage from './LoginPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);
