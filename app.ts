

import dotenv from 'dotenv';
dotenv.config();  // This will load the environment variables from the .env file

import express from 'express';

import cors from 'cors';
import cron from 'node-cron'; // Import node-cron for scheduling tasks

import serviceController from './Backend/controller/serviceController'; // Import the controller
import refuelingController from './Backend/controller/refuelController';
import carController from './Backend/controller/add_carController'; 

import csvImportController from './Backend/controller/csvImportController';
import fuelStatisticsController from './Backend/controller/fuelStatisticsController'; // Import the fuel statistics controller

import emailController from './Backend/controller/emailController'; // Import the emailController
import odometerRouter from './Backend/controller/odometerController';  // Import the odometer controller router
import { router as reminderRouter, initializeReminders, reminderService } from './Backend/controller/reminderController'; 

import refuelingScanController from './Backend/controller/refuelingScanController';

// Import authentication related modules
import authRoutes from './Backend/Routes/authRoutes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from './Backend/Config/passportConfig';


const app = express();

// app.use(cors());  // This allows requests from any origin
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());// Middleware to parse incoming JSON requests


// Add middleware for authentication
app.use(cookieParser()); // Parse cookies
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport for SSO
app.use(passport.initialize());
app.use(passport.session());

// Use authentication routes
console.log('Registering auth routes...');
app.use('/auth', authRoutes);


app.use('/services', serviceController);// Use serviceController for any requests to /services
app.use('/refuels', refuelingController); // Use refuelingController for any requests to /refuels
app.use('/cars', carController);
app.use('/csv', csvImportController);
app.use('/api/cars', odometerRouter);
app.use('/reminders', reminderRouter); 
console.log('Loading refuelingScanController...');

app.use('/api/refueling-scan', refuelingScanController);


app.get('/fuel-statistics', fuelStatisticsController.getStatistics);
app.get('/fuel-statistics/graph-data', fuelStatisticsController.getGraphData);
app.get('/fuel-statistics/frequent-stations', fuelStatisticsController.getFrequentRefuelingStations);



app.post('/send-monthly-statistics', emailController.sendMonthlyStatistics);

// // Schedule to run on the 1st day of every month at midnight (00:00)
// //cron.schedule('0 0 1 * *', async () => {
// cron.schedule('05 9 8 * *', async () => {//test
//   try {
//     console.log('Sending monthly statistics email...');
//     // Mock request and response objects
//     const mockReq = {};  // Request object (can stay empty if not used)
//     const mockRes = {
//       status: function(statusCode: number) {
//         console.log(`Response status: ${statusCode}`);
//         return this;  // Return mockRes to allow chaining
//       },
//       json: function(message: any) {
//         console.log('Response:', message);
//       },
//       send: function(message: any) {
//         console.log('Sent:', message);
//       }
//     };
//     await emailController.sendMonthlyStatistics(mockReq as any, mockRes as any);
//     console.log('Monthly statistics email sent successfully!');
//   } catch (error) {
//     console.error('Error sending monthly statistics email:', error);
//   }
// });


// // Initialize reminders
// initializeReminders().catch(console.error);//when the application starts, all pending reminders are properly loaded and scheduled into memory
// // Schedule daily reminder checks (runs at 8:00 AM every day)
// cron.schedule('0 8 * * *', async () => {
// //cron.schedule('* * * * *', async () => {  // runs every minute-for testing
//   try {
//     console.log('Running daily reminder checks...');
//     await reminderService.checkDailyReminders();
//     console.log('Daily reminder checks completed');
//   } catch (error) {
//     console.error('Error running daily reminder checks:', error);
//   }
// });

const PORT = process.env.PORT || 3000;// Define the port

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});
