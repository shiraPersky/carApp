import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your global CSS
import App from './App'; // Importing App component
import { BrowserRouter as Router } from 'react-router-dom'; // Router for navigation

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Router>
      <App />
    </Router>
);
