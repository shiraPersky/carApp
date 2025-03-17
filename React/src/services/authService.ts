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
    const response: AxiosResponse<MessageResponse> = await axios.post(`${API_URL}/auth/logout`);
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
    throw new Error(error.response?.data?.message || 'Failed to request password reset');
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