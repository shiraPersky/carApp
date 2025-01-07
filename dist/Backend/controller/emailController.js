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
Object.defineProperty(exports, "__esModule", { value: true });
const fuelStatisticsService_js_1 = require("../services/fuelStatisticsService.js");
const emailService_js_1 = require("../services/emailService.js"); // Import the EmailService
const fuelStatisticsService = new fuelStatisticsService_js_1.FuelStatisticsService();
const emailService = new emailService_js_1.EmailService(); // Create an instance of EmailService
const emailController = {
    sendMonthlyStatistics: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Fetch statistics for the last month
            const lastMonthStats = yield fuelStatisticsService.getStatistics('Last Month');
            // Prepare HTML content for the email
            const htmlContent = `
        <h1>Fuel Statistics for Last Month</h1>
        <p>Average Fuel Efficiency: ${lastMonthStats.averageEfficiency} km/L</p>
        <p>Average Distance Between Fill-ups: ${lastMonthStats.averageDistanceBetweenFillups} km</p>
        <p>Average Distance Per Day: ${lastMonthStats.averageDistancePerDay} km</p>
        <p>Average Liters Per Fill-up: ${lastMonthStats.averageLitersPerFill} liters</p>
        <p>Average Total Cost Per Fill-up: ${lastMonthStats.averageCostPerFill} NIS</p>
        <p>Average Price Per Liter: ${lastMonthStats.averagePricePerLiter} NIS</p>
        <p>Total Fuel Cost: ${lastMonthStats.totalCost} NIS</p>
        <p>Total Distance: ${lastMonthStats.totalDistance} km</p>
        <p>Total Liters: ${lastMonthStats.totalLiters}</p>
      `;
            // Send the email using the emailService
            yield emailService.sendEmail('shira.persky@gmail.com', 'Monthly Summary-Fuel Statistics', htmlContent);
            // Respond with a success message
            res.status(200).json({ message: 'Monthly statistics email sent successfully!' });
        }
        catch (error) {
            console.error('Error sending monthly statistics email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    }),
};
exports.default = emailController;
