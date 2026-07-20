// =========================================================
// main.jsx — Application Entry Point
// Creates the React root and mounts <App /> into #root.
// StrictMode enables extra development-time warnings.
// =========================================================

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';        // Root component
import './index.css';           // Global reset & base styles

// Mount the React app into the <div id="root"> in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);