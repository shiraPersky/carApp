import dotenv from 'dotenv';
dotenv.config();  // This will load the environment variables from the .env file


import express from 'express';
import cors from 'cors';
import serviceController from './Backend/controller/serviceController.js'; // Import the controller
import refuelingController from './Backend/controller/refuelController.js';
import carController from './Backend/controller/add_carController.js'; 

import csvImportController from './Backend/controller/csvImportController.js';
import fuelStatisticsController from './Backend/controller/fuelStatisticsController.js'; // Import the fuel statistics controller

import emailController from './Backend/controller/emailController.js'; // Import the emailController

const app = express();

app.use(cors());  // This allows requests from any origin

app.use(express.json());// Middleware to parse incoming JSON requests

app.use('/services', serviceController);// Use serviceController for any requests to /services
app.use('/refuels', refuelingController); // Use refuelingController for any requests to /refuels
app.use('/cars', carController);
app.use('/csv', csvImportController);

app.get('/fuel-statistics', fuelStatisticsController.getStatistics);
app.get('/fuel-statistics/graph-data', fuelStatisticsController.getGraphData);
app.get('/fuel-statistics/frequent-stations', fuelStatisticsController.getFrequentRefuelingStations);

app.post('/send-monthly-statistics', emailController.sendMonthlyStatistics);



const PORT = process.env.PORT || 3000;// Define the port

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000}`);
});
