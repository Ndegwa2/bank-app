import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
console.log(App);//test

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// To measure performance in your app, pass a function
// to log results (e.g., reportWebVitals(console.log))
// or send them to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

