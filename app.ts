import dotenv from 'dotenv';
dotenv.config();  // This will load the environment variables from the .env file


import express from 'express';
import cors from 'cors';
import serviceController from './controller/serviceController.js'; // Import the controller
import refuelingController from './controller/refuelController.js';
import carController from './controller/add_carController.js'; 


const app = express();

app.use(cors());  // This allows requests from any origin

app.use(express.json());// Middleware to parse incoming JSON requests

app.use('/services', serviceController);// Use serviceController for any requests to /services
app.use('/refuelings', refuelingController); // Use refuelingController for any requests to /refuelings
app.use('/cars', carController);

const PORT = process.env.PORT || 3000;// Define the port

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000}`);
});
