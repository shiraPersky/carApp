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
import cron from 'node-cron'; // Import node-cron for scheduling tasks

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
// Schedule to run on the 1st day of every month at midnight (00:00)
//cron.schedule('0 0 1 * *', async () => {
cron.schedule('39 11 7 * *', async () => {//test
  try {
    console.log('Sending monthly statistics email...');
    // Mock request and response objects
    const mockReq = {};  // Request object (can stay empty if not used)
    const mockRes = {
      status: function(statusCode: number) {
        console.log(`Response status: ${statusCode}`);
        return this;  // Return mockRes to allow chaining
      },
      json: function(message: any) {
        console.log('Response:', message);
      },
      send: function(message: any) {
        console.log('Sent:', message);
      }
    };
    await emailController.sendMonthlyStatistics(mockReq as any, mockRes as any);
    console.log('Monthly statistics email sent successfully!');
  } catch (error) {
    console.error('Error sending monthly statistics email:', error);
  }
});


const PORT = process.env.PORT || 3000;// Define the port

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000}`);
});
