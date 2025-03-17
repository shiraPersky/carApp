//for managing authentication state
// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, loginWithSSO, logout, getCurrentUser } from '../services/authService.ts';

interface User {
  id: number;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithSSO: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        // Not authenticated, that's okay
        console.error('Not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await loginWithSSO(email);
      // Just show success message, actual login happens when user clicks email link
    } catch (err) {
      setError(err.message || 'SSO login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    loginWithSSO: handleSSOLogin,
    logout: handleLogout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};