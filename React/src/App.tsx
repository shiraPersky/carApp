// //BrowserRouter-component that provides the routing functionality
// //Route - Defines a single route in the application. It specifies which component should be rendered when the URL matches a specific path.
// //Routes - A container for all the Route components. It manages the routing logic and renders the correct Route based on the current path.
// import { Route, Routes ,Navigate } from 'react-router-dom'; // No need to import Router here
// import ServicesPage from './pages/Service/ServicePage';
// import AddServicePage from './pages/Service/AddServicePage';
// import EditServicePage from './pages/Service/EditServicePage';

// import RefuelingPage from './pages/Refueling/RefuelingPage';  // Import RefuelingPage
// import AddRefuelingPage from './pages/Refueling/AddRefuelingPage';  // Import AddRefuelingPage
// import EditRefuelingPage from './pages/Refueling/EditRefuelingPage';  // Import EditRefuelingPage

// import CarPage from './pages/Cars/CarsPage'; // Import CarsPage
// import AddCarPage from './pages/Cars/AddCarPage'; // Import AddCarPage
// import EditCarPage from './pages/Cars/EditCarPage'; // Import EditCarPage

// import FuelStatisticsPage from './pages/FuelStatisticsPage';  // Import your FuelStatisticsPage
// import OdometerUpdatePage from './pages/Cars/OdometerUpdatedPage';

// import AddReminderPage from './pages/Reminders/AddReminderPage';
// import EditReminderPage from './pages/Reminders/EditReminderPage';
// import ReminderPage from './pages/Reminders/ReminderPage';

// import React from 'react';
// import './app.css';


// function App() {
//   return (
//     <Routes>
//       {/* Service Routes */}
//       <Route path="/services" element={<ServicesPage />} />
//       <Route path="/services/add" element={<AddServicePage />} />
//       <Route path="/services/edit/:id" element={<EditServicePage />} />

//       {/* Refueling Routes */}
//       <Route path="/refuels" element={<RefuelingPage />} />
//       <Route path="/refuels/add" element={<AddRefuelingPage />} />
//       <Route path="/refuels/edit/:id" element={<EditRefuelingPage />} />

//       {/* Car Routes */}
//       <Route path="/cars" element={<CarPage />} /> {/* List of cars */}
//       <Route path="/cars/add" element={<AddCarPage />} /> {/* Add new car */}
//       <Route path="/cars/edit/:id" element={<EditCarPage />} /> {/* Edit car by ID */}
//       <Route path="/cars/odometer/:licensePlate" element={<OdometerUpdatePage />} />


//       {/* Fuel Statistics Page */}
//       <Route path="/fuel-statistics" element={<FuelStatisticsPage />} />

//       {/* Reminder Routes */}
//       <Route path="/reminders" element={<ReminderPage />} /> {/* List of reminders */}
//       <Route path="/reminders/add" element={<AddReminderPage />} /> 
//       <Route path="/reminders/edit/:id" element={<EditReminderPage />} /> 

//       {/*default route */}
//       <Route path="/" element={<Navigate to="/services" />} /> 

//     </Routes>
//   );
// }

// export default App;


import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';


// Service imports
import ServicesPage from './pages/Service/ServicePage';
import AddServicePage from './pages/Service/AddServicePage';
import EditServicePage from './pages/Service/EditServicePage';

// Refueling imports
import RefuelingPage from './pages/Refueling/RefuelingPage';
import AddRefuelingPage from './pages/Refueling/AddRefuelingPage';
import EditRefuelingPage from './pages/Refueling/EditRefuelingPage';

// Car imports
import CarPage from './pages/Cars/CarsPage';
import AddCarPage from './pages/Cars/AddCarPage';
import EditCarPage from './pages/Cars/EditCarPage';

// Other imports
import FuelStatisticsPage from './pages/FuelStatisticsPage';
import OdometerUpdatePage from './pages/Cars/OdometerUpdatedPage';

// Reminder imports
import AddReminderPage from './pages/Reminders/AddReminderPage';
import EditReminderPage from './pages/Reminders/EditReminderPage';
import ReminderPage from './pages/Reminders/ReminderPage';

import React from 'react';
import './app.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Routes>
          {/* Service Routes */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/add" element={<AddServicePage />} />
          <Route path="/services/edit/:id" element={<EditServicePage />} />

          {/* Refueling Routes */}
          <Route path="/refuels" element={<RefuelingPage />} />
          <Route path="/refuels/add" element={<AddRefuelingPage />} />
          <Route path="/refuels/edit/:id" element={<EditRefuelingPage />} />

          {/* Car Routes */}
          <Route path="/cars" element={<CarPage />} />
          <Route path="/cars/add" element={<AddCarPage />} />
          <Route path="/cars/edit/:id" element={<EditCarPage />} />
          <Route path="/cars/odometer/:licensePlate" element={<OdometerUpdatePage />} />

          {/* Fuel Statistics Page */}
          <Route path="/fuel-statistics" element={<FuelStatisticsPage />} />

          {/* Reminder Routes */}
          <Route path="/reminders" element={<ReminderPage />} />
          <Route path="/reminders/add" element={<AddReminderPage />} />
          <Route path="/reminders/edit/:id" element={<EditReminderPage />} />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/services" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;