import { Request, Response } from 'express';
import { FuelStatisticsService } from '../services/fuelStatisticsService';
import { FuelStatisticsDto } from '../dto/fuelStatisticsDto.js';

const fuelStatisticsService = new FuelStatisticsService();

const fuelStatisticsController = {
  getStatistics: async (req: Request, res: Response) => {
    try {
        
       // Set "All Time" as the default if no timePeriod is provided
       const timePeriod = (req.query.timePeriod as string) || 'All Time';

       // Get statistics from the service
       const statistics = await fuelStatisticsService.getStatistics(timePeriod);
 

      // Create the DTO to format and structure the data
      const dto: FuelStatisticsDto = {
        averageFuelEfficiency: statistics.averageEfficiency,
        averageDistanceBetweenFillups: statistics.averageDistanceBetweenFillups,
        averageDistancePerDay: statistics.averageDistancePerDay,
        averageLitersPerFillup: statistics.averageLitersPerFill,
        averageTotalCostPerFillup: statistics.averageCostPerFill,
        averagePricePerLiter: statistics.averagePricePerLiter,
        totalFuelCost: statistics.totalCost,
        totalDistance: statistics.totalDistance,
        totalLiters: statistics.totalLiters,
        frequentRefuelingStations: [], // This will be populated later in the service layer
        averageTimeBetweenRefuels: statistics.averageTimeBetweenRefuels, // This could be computed from the data
      };

      // Get frequent stations with correct typing
      const frequentStations = await fuelStatisticsService.getFrequentStations();
      
      // Ensure that the data returned is of the correct shape (e.g., { station: string, count: number })
      dto.frequentRefuelingStations = frequentStations.map((station: { station: string; count: unknown }) => ({
        station: station.station,
        count: typeof station.count === 'number' ? station.count : Number(station.count), // Cast to number if necessary
      }));
      
      // Send the DTO as the response
      res.json(dto);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving fuel statistics', error: error.message });
    }
  },
  
  getGraphData: async (req: Request, res: Response) => {
    try {
      const timePeriod = (req.query.timePeriod as string) || 'All Time';//set all time as default
      const graphData = await fuelStatisticsService.getGraphData(timePeriod);
      res.json(graphData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving graph data', error: error.message });
    }
  },
  

  getFrequentRefuelingStations: async (req: Request, res: Response) => {
    try {
      const stationData = await fuelStatisticsService.getFrequentStations();
      res.json(stationData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving station data', error: error.message });
    }
  }
};

export default fuelStatisticsController;
