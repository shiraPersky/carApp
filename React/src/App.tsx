// import { Route, Routes, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { theme } from './theme';
// import React from 'react';
// import './app.css';
// import './styles/auth.css'; // Import the auth styles


// // Auth imports
// import { AuthProvider, useAuth } from './Context/AuthContext';
// import Login from './pages/Login/Login';
// import Register from './pages/Login/Register';
// import ForgotPassword from './pages/Login/ForgotPassword';
// import ResetPassword from './pages/Login/ResetPassword';

// // Service imports
// import ServicesPage from './pages/Service/ServicePage';
// import AddServicePage from './pages/Service/AddServicePage';
// import EditServicePage from './pages/Service/EditServicePage';

// // Refueling imports
// import RefuelingPage from './pages/Refueling/RefuelingPage';
// import AddRefuelingPage from './pages/Refueling/AddRefuelingPage';
// import EditRefuelingPage from './pages/Refueling/EditRefuelingPage';

// // Car imports
// import CarPage from './pages/Cars/CarsPage';
// import AddCarPage from './pages/Cars/AddCarPage';
// import EditCarPage from './pages/Cars/EditCarPage';


// // Other imports
// import FuelStatisticsPage from './pages/FuelStatisticsPage';
// import OdometerUpdatePage from './pages/Cars/OdometerUpdatedPage';

// // Reminder imports
// import AddReminderPage from './pages/Reminders/AddReminderPage';
// import EditReminderPage from './pages/Reminders/EditReminderPage';
// import ReminderPage from './pages/Reminders/ReminderPage';

// // Protected route component
// const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
//   const { user, loading } = useAuth();
  
//   if (loading) {
//     return <div className="loading-screen">Loading...</div>;
//   }
  
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return <>{children}</>;
// };

// function AppRoutes() {
//   return (
//     <div className="app-container">
//       <Routes>
//         {/* Auth Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* Protected Routes */}
//         {/* Service Routes */}
//         <Route path="/services" element={
//           <ProtectedRoute>
//             <ServicesPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/services/add" element={
//           <ProtectedRoute>
//             <AddServicePage />
//           </ProtectedRoute>
//         } />
//         <Route path="/services/edit/:id" element={
//           <ProtectedRoute>
//             <EditServicePage />
//           </ProtectedRoute>
//         } />

//         {/* Refueling Routes */}
//         <Route path="/refuels" element={
//           <ProtectedRoute>
//             <RefuelingPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/refuels/add" element={
//           <ProtectedRoute>
//             <AddRefuelingPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/refuels/edit/:id" element={
//           <ProtectedRoute>
//             <EditRefuelingPage />
//           </ProtectedRoute>
//         } />

//         {/* Car Routes */}
//         <Route path="/cars" element={
//           <ProtectedRoute>
//             <CarPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/cars/add" element={
//           <ProtectedRoute>
//             <AddCarPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/cars/edit/:id" element={
//           <ProtectedRoute>
//             <EditCarPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/cars/odometer/:licensePlate" element={
//           <ProtectedRoute>
//             <OdometerUpdatePage />
//           </ProtectedRoute>
//         } />

//         {/* Fuel Statistics Page */}
//         <Route path="/fuel-statistics" element={
//           <ProtectedRoute>
//             <FuelStatisticsPage />
//           </ProtectedRoute>
//         } />

//         {/* Reminder Routes */}
//         <Route path="/reminders" element={
//           <ProtectedRoute>
//             <ReminderPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/reminders/add" element={
//           <ProtectedRoute>
//             <AddReminderPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/reminders/edit/:id" element={
//           <ProtectedRoute>
//             <EditReminderPage />
//           </ProtectedRoute>
//         } />

//         {/* Default route - redirect to login if not authenticated, services if authenticated */}
//         <Route path="/" element={<Navigate to="/services" />} />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }



// export default App;


import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import React from 'react';
import './app.css';
import './styles/auth.css'; // Import the auth styles

// Auth imports
import { AuthProvider, useAuth } from './Context/AuthContext';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetPassword from './pages/Login/ResetPassword';

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

// Homepage import
import HomePage from './pages/HomePage';

// Layout component import
import Layout from './components/Layout';

// Protected route component
const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <div className="app-container">
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Home Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/home/:carId" element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Protected Routes */}
        {/* Service Routes */}
        <Route path="/services" element={
          <ProtectedRoute>
            <Layout>
              <ServicesPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/services/add" element={
          <ProtectedRoute>
            <Layout>
              <AddServicePage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/services/edit/:id" element={
          <ProtectedRoute>
            <Layout>
              <EditServicePage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Refueling Routes */}
        <Route path="/refuels" element={
          <ProtectedRoute>
            <Layout>
              <RefuelingPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/refuels/add" element={
          <ProtectedRoute>
            <Layout>
              <AddRefuelingPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/refuels/edit/:id" element={
          <ProtectedRoute>
            <Layout>
              <EditRefuelingPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Car Routes */}
        <Route path="/cars" element={
          <ProtectedRoute>
            <Layout>
              <CarPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/cars/add" element={
          <ProtectedRoute>
            <Layout>
              <AddCarPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/cars/edit/:id" element={
          <ProtectedRoute>
            <Layout>
              <EditCarPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/cars/odometer/:licensePlate" element={
          <ProtectedRoute>
            <Layout>
              <OdometerUpdatePage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Fuel Statistics Page */}
        <Route path="/fuel-statistics" element={
          <ProtectedRoute>
            <Layout>
              <FuelStatisticsPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Reminder Routes */}
        <Route path="/reminders" element={
          <ProtectedRoute>
            <Layout>
              <ReminderPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/reminders/add" element={
          <ProtectedRoute>
            <Layout>
              <AddReminderPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/reminders/edit/:id" element={
          <ProtectedRoute>
            <Layout>
              <EditReminderPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Default route - redirect to home if authenticated */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;