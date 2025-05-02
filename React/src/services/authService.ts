// // frontend/src/services/authService.ts
// import axios from 'axios';

// interface AxiosResponse<T = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: any;
//   config: any;
// }

// const API_URL = 'http://localhost:3000';

// // Configure axios to include credentials
// axios.defaults.withCredentials = true;

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface RegisterRequest {
//   email: string;
//   password: string;
//   name?: string;
// }

// export interface SSOLoginRequest {
//   email: string;
// }

// export interface User {
//   id: number;
//   email: string;
//   name?: string;
// }

// export interface MessageResponse {
//   message: string;
// }

// export const login = async (email: string, password: string): Promise<User> => {
//   try {
//     const response: AxiosResponse<User> = await axios.post(`${API_URL}/auth/login`, { email, password });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Login failed');
//   }
// };

// export const register = async (data: RegisterRequest): Promise<User> => {
//   try {
//     const response: AxiosResponse<User> = await axios.post(`${API_URL}/auth/register`, data);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Registration failed');
//   }
// };

// // for Google authentication
// export const loginWithGoogle = async (idToken: string): Promise<User> => {
//   try {
//     const response: AxiosResponse<User> = await axios.post(`${API_URL}/auth/google`, { token: idToken });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Google login failed');
//   }
// };

// export const loginWithSSO = async (email: string): Promise<MessageResponse> => {
//   try {
//     const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/sso`, { email });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'SSO login failed');
//   }
// };

// export const validateSSOToken = async (token: string): Promise<User> => {
//   try {
//     const response: AxiosResponse<User> = await axios.get(`${API_URL}/auth/sso/validate?token=${token}`);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'SSO validation failed');
//   }
// };

// export const logout = async (): Promise<MessageResponse> => {
//   try {
//     const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/logout`);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Logout failed');
//   }
// };

// export const getCurrentUser = async (): Promise<User> => {
//   try {
//     const response: AxiosResponse<User> = await axios.get(`${API_URL}/auth/me`);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Failed to get current user');
//   }
// };

// // export const requestPasswordReset = async (email: string): Promise<MessageResponse> => {
// //   try {
// //     const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/forgot-password`, { email });
// //     return response.data;
// //   } catch (error: any) {
// //     throw new Error(error.response?.data?.message || 'Failed to request password reset');
// //   }
// // };
// export const requestPasswordReset = async (email: string): Promise<MessageResponse> => {
//   try {
//     const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/forgot-password`, { email });
//     return response.data;
//   } catch (error: any) {
//     console.error('Password reset error:', error);
//     if (error.response && error.response.data && error.response.data.message) {
//       throw new Error(error.response.data.message);
//     } else {
//       throw new Error('Failed to request password reset. Please try again later.');
//     }
//   }
// };

// export const resetPassword = async (token: string, newPassword: string): Promise<MessageResponse> => {
//   try {
//     const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/reset-password`, {
//       token,
//       newPassword
//     });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Failed to reset password');
//   }
// };

// frontend/src/services/authService.ts
import axios from 'axios';

interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

const API_URL = 'http://localhost:3000';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface SSOLoginRequest {
  email: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface MessageResponse {
  message: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (data: RegisterRequest): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// for Google authentication
export const loginWithGoogle = async (idToken: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.post(`${API_URL}/auth/google`, { token: idToken });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Google login failed');
  }
};

export const loginWithSSO = async (email: string): Promise<MessageResponse> => {
  try {
    const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/sso`, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'SSO login failed');
  }
};

export const validateSSOToken = async (token: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get(`${API_URL}/auth/sso/validate?token=${token}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'SSO validation failed');
  }
};

export const logout = async (): Promise<MessageResponse> => {
  try {
    // Make the API call to logout
    const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/logout`);
    
    // Clean up Google auth state if it exists
    // The disableAutoSelect method might not be available in all versions of the Google API
    // so we'll try multiple approaches
    if (window.google?.accounts?.id) {
      try {
        // Try to revoke the token if that method exists
        if (typeof window.google.accounts.id.revoke === 'function') {
          window.google.accounts.id.revoke();
        }
        
        // Try to cancel the One Tap UI if prompt exists
        if (typeof window.google.accounts.id.cancel === 'function') {
          window.google.accounts.id.cancel();
        }
        
        console.log('Google auth state cleared');
      } catch (googleError) {
        console.error('Failed to clear Google auth state:', googleError);
        // Non-fatal error, continue with logout
      }
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get current user');
  }
};

export const requestPasswordReset = async (email: string): Promise<MessageResponse> => {
  try {
    const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error: any) {
    console.error('Password reset error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to request password reset. Please try again later.');
    }
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<MessageResponse> => {
  try {
    const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
};

// Update the Google type definition in your GoogleLoginButton.tsx
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
          disableAutoSelect?: () => void; // Optional method
          revoke?: (callback?: () => void) => void; // Optional method
          cancel?: () => void; // Optional method
        }
      }
    }
  }
}