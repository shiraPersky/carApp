//BrowserRouter-component that provides the routing functionality
//Route - Defines a single route in the application. It specifies which component should be rendered when the URL matches a specific path.
//Routes - A container for all the Route components. It manages the routing logic and renders the correct Route based on the current path.
import { Route, Routes ,Navigate } from 'react-router-dom'; // No need to import Router here
import ServicesPage from './pages/ServicePage';
import AddServicePage from './pages/AddServicePage';
import EditServicePage from './pages/EditServicePage';
import React from 'react';
import './app.css';

function App() {
  return (
    <Routes>
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/add" element={<AddServicePage />} />
      <Route path="/services/edit/:id" element={<EditServicePage />} />

      {/* Add a default route */}
      <Route path="/" element={<Navigate to="/services" />} /> 

    </Routes>
  );
}

export default App;
