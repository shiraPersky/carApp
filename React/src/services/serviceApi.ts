//API calls to interact with the backend

import api from './api';
import { ServiceDto } from './serviceDto';  // Define this DTO interface based on your service data

// Get all services
export const getAllServices = async (): Promise<ServiceDto[]> => {
  const response = await api.get('/');
  return response.data;
};

// Create a new service
export const createService = async (service: ServiceDto): Promise<ServiceDto> => {
  const response = await api.post('/', service);
  return response.data;
};

// Update a service by ID
export const updateService = async (id: number, service: ServiceDto): Promise<ServiceDto> => {
  const response = await api.put(`/${id}`, service);
  return response.data;
};

// Delete a service by ID
export const deleteService = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
