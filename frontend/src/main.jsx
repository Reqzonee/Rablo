// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root for React

root.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);
