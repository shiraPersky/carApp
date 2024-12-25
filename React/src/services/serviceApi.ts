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

export interface Refueling {
  id: number;
  date: string;
  time: string;
  odometer: number;
  kindOfFuel: String;
  pricePerLiter: GLfloat;
  totalCost: GLfloat;
  liters: GLfloat;
  gasStation: string;
  driver: string;
  file_attachment?: string;
  notes?: string;
}

export interface Car {
  id: number;
  license_plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  emission_group?: string;
  valid_until: string;
  trim_level?: string;
  last_test: string;
  model_type: string;
  model_number: string;
  created_at: string;
  updated_at: string;
}

const API_URL = 'http://localhost:3000/services';//service API
const REFUEL_API_URL = 'http://localhost:3000/refuels';//refuel API
const CAR_API_URL = 'http://localhost:3000/cars'; // Car API



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

// Refuel API Functions (Added)
export const getRefuels = async () => {
  try {
    const response = await axios.get(REFUEL_API_URL); // GET request for refuels
    return response.data; // Return the actual data
  } catch (error) {
    throw new Error('Error fetching refuels');
  }
};

export const createRefuel = async (refuelData: any) => {
  try {
    const response = await axios.post(REFUEL_API_URL, refuelData); // POST request for refuels
    return response.data;
  } catch (error) {
    throw new Error('Error creating refuel');
  }
};

export const updateRefuel = async (id: number, refuelData: any) => {
  try {
    const response = await axios.put(`${REFUEL_API_URL}/${id}`, refuelData); // PUT request for refuels
    return response.data;
  } catch (error) {
    throw new Error('Error updating refuel');
  }
};

export const deleteRefuel = async (id: number) => {
  try {
    await axios.delete(`${REFUEL_API_URL}/${id}`); // DELETE request for refuels
  } catch (error) {
    throw new Error('Error deleting refuel');
  }
};

// Car API Functions
export const getCars = async () => {
  try {
    const response = await axios.get(CAR_API_URL); // GET request for cars
    return response.data; // Return the actual data
  } catch (error) {
    throw new Error('Error fetching cars');
  }
};

export const createCar = async (carData: Car) => {
  try {
    const response = await axios.post(CAR_API_URL, carData); // POST request for cars
    return response.data;
  } catch (error) {
    throw new Error('Error creating car');
  }
};

export const updateCar = async (id: number, carData: Car) => {
  try {
    const response = await axios.put(`${CAR_API_URL}/${id}`, carData); // PUT request for cars
    return response.data;
  } catch (error) {
    throw new Error('Error updating car');
  }
};

export const deleteCar = async (id: number) => {
  try {
    await axios.delete(`${CAR_API_URL}/${id}`); // DELETE request for cars
  } catch (error) {
    throw new Error('Error deleting car');
  }
};
