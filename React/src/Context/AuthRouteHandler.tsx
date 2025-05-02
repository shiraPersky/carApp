// src/components/AuthRouteHandler.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AuthRouteHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // List of public routes (no authentication needed)
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  
  // List of routes that should redirect to /cars if user is logged in
  const authRedirectRoutes = ['/login', '/register'];
  
  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => location.pathname === route);
  
  // Check if current path should redirect when authenticated
  const shouldRedirectWhenAuth = authRedirectRoutes.some(route => location.pathname === route);

  useEffect(() => {
    if (!loading) {
      // If user is logged in and tries to access a route that should redirect when authenticated
      if (user && shouldRedirectWhenAuth) {
        // Get the previous page from history state if available (for back button handling)
        const previousPage = location.state?.from || '/cars';
        
        // Check if we're trying to go back to login from somewhere else
        // This handles the case where user is already logged in and clicks "back" to login
        if (location.key && previousPage !== '/login') {
          navigate(previousPage);
        } else {
          navigate('/cars');
        }
      }
      
      // If user is not logged in and tries to access a protected route
      else if (!user && !isPublicRoute) {
        // Save the current location so we can redirect back after login
        navigate('/login', { state: { from: location.pathname } });
      }
    }
  }, [user, loading, location.pathname, shouldRedirectWhenAuth, isPublicRoute, navigate, location]);

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthRouteHandler;