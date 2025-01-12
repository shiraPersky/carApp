"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // This will load the environment variables from the .env file
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron")); // Import node-cron for scheduling tasks
const serviceController_js_1 = __importDefault(require("./Backend/controller/serviceController.js")); // Import the controller
const refuelController_js_1 = __importDefault(require("./Backend/controller/refuelController.js"));
const add_carController_js_1 = __importDefault(require("./Backend/controller/add_carController.js"));
const csvImportController_js_1 = __importDefault(require("./Backend/controller/csvImportController.js"));
const fuelStatisticsController_js_1 = __importDefault(require("./Backend/controller/fuelStatisticsController.js")); // Import the fuel statistics controller
const emailController_js_1 = __importDefault(require("./Backend/controller/emailController.js")); // Import the emailController
const odometerController_js_1 = __importDefault(require("./Backend/controller/odometerController.js")); // Import the odometer controller router
const reminderController_js_1 = require("./Backend/controller/reminderController.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // This allows requests from any origin
app.use(express_1.default.json()); // Middleware to parse incoming JSON requests
app.use('/services', serviceController_js_1.default); // Use serviceController for any requests to /services
app.use('/refuels', refuelController_js_1.default); // Use refuelingController for any requests to /refuels
app.use('/cars', add_carController_js_1.default);
app.use('/csv', csvImportController_js_1.default);
app.use('/api/cars', odometerController_js_1.default);
app.use('/reminders', reminderController_js_1.router);
app.get('/fuel-statistics', fuelStatisticsController_js_1.default.getStatistics);
app.get('/fuel-statistics/graph-data', fuelStatisticsController_js_1.default.getGraphData);
app.get('/fuel-statistics/frequent-stations', fuelStatisticsController_js_1.default.getFrequentRefuelingStations);
app.post('/send-monthly-statistics', emailController_js_1.default.sendMonthlyStatistics);
// Schedule to run on the 1st day of every month at midnight (00:00)
node_cron_1.default.schedule('0 0 1 * *', () => __awaiter(void 0, void 0, void 0, function* () {
    //cron.schedule('05 9 8 * *', async () => {//test
    try {
        console.log('Sending monthly statistics email...');
        // Mock request and response objects
        const mockReq = {}; // Request object (can stay empty if not used)
        const mockRes = {
            status: function (statusCode) {
                console.log(`Response status: ${statusCode}`);
                return this; // Return mockRes to allow chaining
            },
            json: function (message) {
                console.log('Response:', message);
            },
            send: function (message) {
                console.log('Sent:', message);
            }
        };
        yield emailController_js_1.default.sendMonthlyStatistics(mockReq, mockRes);
        console.log('Monthly statistics email sent successfully!');
    }
    catch (error) {
        console.error('Error sending monthly statistics email:', error);
    }
}));
// Initialize reminders
(0, reminderController_js_1.initializeReminders)().catch(console.error);
const PORT = process.env.PORT || 3000; // Define the port
// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000}`);
});
