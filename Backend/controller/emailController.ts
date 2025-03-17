import { Request, Response } from 'express';
import { FuelStatisticsService } from '../services/fuelStatisticsService';
import { EmailService } from '../services/emailService'; // Import the EmailService

const fuelStatisticsService = new FuelStatisticsService();
const emailService = new EmailService(); // Create an instance of EmailService

const emailController = {
  sendMonthlyStatistics: async (req: Request, res: Response) => {
    try {
      // Fetch statistics for the last month
      const lastMonthStats = await fuelStatisticsService.getStatistics('Last Month');

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
      await emailService.sendEmail('shira.persky@gmail.com', 'Monthly Summary-Fuel Statistics', htmlContent);

      // Respond with a success message
      res.status(200).json({ message: 'Monthly statistics email sent successfully!' });
    } catch (error) {
      console.error('Error sending monthly statistics email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  },
};

export default emailController;
