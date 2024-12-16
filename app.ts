import express from 'express';
import serviceController from './controller/serviceController.js'; // Import the controller
import refuelingController from './controller/refuelController.js';

const app = express();

app.use(express.json());// Middleware to parse incoming JSON requests

app.use('/services', serviceController);// Use serviceController for any requests to /services
app.use('/refuelings', refuelingController); // Use refuelingController for any requests to /refuelings


const PORT = process.env.PORT || 3000;// Define the port

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000}`);
});
