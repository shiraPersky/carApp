"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // This will load the environment variables from the .env file
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const serviceController_1 = __importDefault(require("./Backend/controller/serviceController")); // Import the controller
const refuelController_1 = __importDefault(require("./Backend/controller/refuelController"));
const add_carController_1 = __importDefault(require("./Backend/controller/add_carController"));
const csvImportController_1 = __importDefault(require("./Backend/controller/csvImportController"));
const fuelStatisticsController_1 = __importDefault(require("./Backend/controller/fuelStatisticsController")); // Import the fuel statistics controller
const emailController_1 = __importDefault(require("./Backend/controller/emailController")); // Import the emailController
const odometerController_1 = __importDefault(require("./Backend/controller/odometerController")); // Import the odometer controller router
const reminderController_1 = require("./Backend/controller/reminderController");
const refuelingScanController_1 = __importDefault(require("./Backend/controller/refuelingScanController"));
// Import authentication related modules
const authRoutes_1 = __importDefault(require("./Backend/Routes/authRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passportConfig_1 = __importDefault(require("./Backend/Config/passportConfig"));
const app = (0, express_1.default)();
// app.use(cors());  // This allows requests from any origin
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json()); // Middleware to parse incoming JSON requests
// Add middleware for authentication
app.use((0, cookie_parser_1.default)()); // Parse cookies
app.use((0, express_session_1.default)({
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
app.use(passportConfig_1.default.initialize());
app.use(passportConfig_1.default.session());
// Use authentication routes
console.log('Registering auth routes...');
app.use('/auth', authRoutes_1.default);
app.use('/services', serviceController_1.default); // Use serviceController for any requests to /services
app.use('/refuels', refuelController_1.default); // Use refuelingController for any requests to /refuels
app.use('/cars', add_carController_1.default);
app.use('/csv', csvImportController_1.default);
app.use('/api/cars', odometerController_1.default);
app.use('/reminders', reminderController_1.router);
console.log('Loading refuelingScanController...');
app.use('/api/refueling-scan', refuelingScanController_1.default);
app.get('/fuel-statistics', fuelStatisticsController_1.default.getStatistics);
app.get('/fuel-statistics/graph-data', fuelStatisticsController_1.default.getGraphData);
app.get('/fuel-statistics/frequent-stations', fuelStatisticsController_1.default.getFrequentRefuelingStations);
app.post('/send-monthly-statistics', emailController_1.default.sendMonthlyStatistics);
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
const PORT = process.env.PORT || 3000; // Define the port
// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});
