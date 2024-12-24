import axios from 'axios';//Axios simplifies making GET, POST, PUT, and DELETE requests to interact with APIs.

export interface Service {
  id: number;
  service_type: string;
  date: string;
  cost: number;
  car_id: number;
  time: string;
  odometer: number;
  place: string;
  driver: string;
  paymentMethod: string;
  file_attachment?: string;
  notes?: string;
}

const API_URL = 'http://localhost:3000/services';

export const getServices = async () => {
  try {
    const response = await axios.get(API_URL);//This makes a GET request to the backend API at http://localhost:3000/services.
    return response.data;//return the actual data
  } catch (error) {
    throw new Error('Error fetching services');
  }
};


export const createService = async (serviceData: any) => {
  try {
    const response = await axios.post(API_URL, serviceData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating service');
  }
};

export const updateService = async (id: number, serviceData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating service');
  }
};

export const deleteService = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Error deleting service');
  }
};
