import axios from 'axios';//Axios simplifies making GET, POST, PUT, and DELETE requests to interact with APIs.

export interface Service {
  id: number;
  license_plate: string;
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
  license_plate: string;
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
  model_number: string;a
  created_at: string;
  updated_at: string;
  odometer: number;
}


// Add new interface for Odometer
export interface OdometerUpdate {
  licensePlate: string;
  odometer: number;
}

const API_URL = 'http://localhost:3000/services';//service API
const REFUEL_API_URL = 'http://localhost:3000/refuels';//refuel API
const CAR_API_URL = 'http://localhost:3000/cars'; // Car API
const FUEL_STATISTICS_API_URL = 'http://localhost:3000/fuel-statistics';  // API URL for fuel statistics
//const ODOMETER_API_URL = 'http://localhost:3000/api/cars';




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


export const getFuelStatistics = async (timePeriod: string, startDate?: string, endDate?: string) => {
  let url = `http://localhost:3000/fuel-statistics?timePeriod=${encodeURIComponent(timePeriod)}`;

  if (timePeriod === 'customDates' && startDate && endDate) {
    url = `http://localhost:3000/fuel-statistics?timePeriod=Custom Dates|${encodeURIComponent(startDate)}|${encodeURIComponent(endDate)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch fuel statistics');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching fuel statistics:", error);
    throw error;
  }
};



// Function to fetch graph data
export const getGraphData = async (timePeriod: string = 'All Time') => {
  try {
    const response = await axios.get(`${FUEL_STATISTICS_API_URL}/graph-data?timePeriod=${timePeriod}`);
    return response.data;  // Return the response data from backend
  } catch (error) {
    throw new Error('Error fetching graph data');
  }
};

// Function to fetch frequent refueling stations
export const getFrequentRefuelingStations = async () => {
  try {
    const response = await axios.get(`${FUEL_STATISTICS_API_URL}/frequent-stations`);
    return response.data;  // Return the response data from backend
  } catch (error) {
    throw new Error('Error fetching frequent refueling stations');
  }
};


export const updateOdometer = async (licensePlate: string, odometer: number) => {
  try {
    const response = await axios.put('http://localhost:3000/api/cars/update-odometer', {
      licensePlate,
      odometer,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating odometer:', error);
    throw error;
  }
};
