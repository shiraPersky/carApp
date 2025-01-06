export interface FuelStatisticsDto {
    averageFuelEfficiency: number; // kilometers per liter
    averageDistanceBetweenFillups: number; // kilometers
    averageDistancePerDay: number; // kilometers
    averageLitersPerFillup: number; // liters
    averageTotalCostPerFillup: number; // NIS
    averagePricePerLiter: number; // NIS per liter
    totalFuelCost: number; // NIS
    totalDistance: number; // kilometers
    totalLiters: number; // liters
    frequentRefuelingStations: { station: string; count: number }[];
    averageTimeBetweenRefuels: string; // formatted time ("2 days, 3 hours")
  }
  