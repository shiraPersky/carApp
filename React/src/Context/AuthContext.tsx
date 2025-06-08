
// // frontend/src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { login, loginWithGoogle, logout, getCurrentUser } from '../services/authService';
// import { useNavigate } from 'react-router-dom';


// interface User {
//   id: number;
//   email: string;
//   name?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   loginWithGoogle: (idToken: string) => Promise<void>; // Add Google login
//   logout: () => Promise<void>;
//   clearError: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Replace your entire AuthProvider component in AuthContext.tsx
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate(); // Add this

//   useEffect(() => {
//     // Check if user is already logged in
//     const checkAuthStatus = async () => {
//       try {
//         const userData = await getCurrentUser();
//         setUser(userData);
//       } catch (err) {
//         // Not authenticated, that's okay
//         console.log('Not authenticated or session expired');
        
//         // Force clear local state when not authenticated
//         setUser(null);
        
//         // If we're on a protected route, redirect to login
//         const path = window.location.pathname;
//         const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].includes(path);
//         if (!isAuthRoute && path !== '/') {
//           navigate('/login', { replace: true });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, [navigate]);

//   const handleLogin = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await login(email, password);
//       setUser(userData);
//       navigate('/home', { replace: true });
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add handler for Google login
//   const handleGoogleLogin = async (idToken: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await loginWithGoogle(idToken);
//       setUser(userData);
//       navigate('/home', { replace: true });
//     } catch (err: any) {
//       setError(err.message || 'Google login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       await logout();
//       setUser(null);
      
//       // Clean up Google auth state
//       if (window.google?.accounts?.id) {
//         try {
//           if (typeof window.google.accounts.id.revoke === 'function') {
//             window.google.accounts.id.revoke();
//           }
//           if (typeof window.google.accounts.id.cancel === 'function') {
//             window.google.accounts.id.cancel();
//           }
//         } catch (googleError) {
//           console.error('Error clearing Google auth state:', googleError);
//         }
//       }
      
//       // Force navigation to login page
//       window.location.href = '/login'; // Using window.location for a full refresh
//     } catch (err: any) {
//       setError(err.message || 'Logout failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login: handleLogin,
//     loginWithGoogle: handleGoogleLogin,
//     logout: handleLogout,
//     clearError
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // frontend/src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { login, loginWithGoogle, logout, getCurrentUser } from '../services/authService';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   id: number;
//   email: string;
//   name?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   loginWithGoogle: (idToken: string) => Promise<void>;
//   logout: () => Promise<void>;
//   clearError: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//   const checkAuthStatus = async () => {
//     try {
//       const userData = await getCurrentUser();
//       setUser(userData);
//     } catch (err) {
//       console.log('Not authenticated or session expired');
//       setUser(null); // חשוב!
//     } finally {
//       setLoading(false);
//     }
//   };

//   checkAuthStatus();
// }, []);


//   const handleLogin = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await login(email, password);
//       setUser(userData);
//       navigate('/home', { replace: true });
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async (idToken: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await loginWithGoogle(idToken);
//       setUser(userData);
//       navigate('/home', { replace: true });
//     } catch (err: any) {
//       setError(err.message || 'Google login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       await logout();
//       setUser(null);

//       if (window.google?.accounts?.id) {
//         try {
//           if (typeof window.google.accounts.id.revoke === 'function') {
//             window.google.accounts.id.revoke();
//           }
//           if (typeof window.google.accounts.id.cancel === 'function') {
//             window.google.accounts.id.cancel();
//           }
//         } catch (googleError) {
//           console.error('Error clearing Google auth state:', googleError);
//         }
//       }

//       window.location.href = '/login';
//     } catch (err: any) {
//       setError(err.message || 'Logout failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login: handleLogin,
//     loginWithGoogle: handleGoogleLogin,
//     logout: handleLogout,
//     clearError
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, loginWithGoogle, logout, getCurrentUser } from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';

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
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        setUser(null);
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

      // 🧭 go to last attempted page, or to /cars
      const from = location.state?.from || '/cars';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginWithGoogle(idToken);
      setUser(userData);

      const from = location.state?.from || '/cars';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      navigate('/login', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login: handleLogin,
        loginWithGoogle: handleGoogleLogin,
        logout: handleLogout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
