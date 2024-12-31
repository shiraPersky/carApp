import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FuelStatisticsService {
  async getStatistics(timePeriod: string) {
    const dateRange = this.getDateRangeForFilter(timePeriod);

    const refuelings = await prisma.refueling.findMany({
      where: dateRange ? { date: { gte: dateRange.startDate, lte: dateRange.endDate } } : undefined,
    });;//to fetch all refueling records from the refueling table

    if (refuelings.length === 0) {
        return {//there are no refuelings
            averageEfficiency: 0,
            averageDistanceBetweenFillups: 0,
            averageDistancePerDay: 0,
            averageLitersPerFill: 0,
            averageCostPerFill: 0,
            averagePricePerLiter: 0,
            totalCost: 0,
            totalDistance: 0,
            totalLiters: 0,
            averageTimeBetweenRefuels: "0 days, 0 hours",
          };
    }

    const totalLiters = refuelings.reduce((sum, ref) => sum + ref.liters, 0);// calculates the total number of liters of fuel

    const totalCost = refuelings.reduce((sum, ref) => sum + ref.totalCost, 0);//calculates the total cost of refueling
    // Calculate total distance based on max and min odometer readings
    const odometerReadings = refuelings.map(ref => ref.odometer);
    const maxOdometer = Math.max(...odometerReadings);
    const minOdometer = Math.min(...odometerReadings);
    const totalDistance = maxOdometer - minOdometer; // Total distance = difference between max and min odometer readings

    const refuelingsWithoutOldest = refuelings.slice(1);
    const totalLitersWithoutOldest = refuelingsWithoutOldest.reduce((sum, ref) => sum + ref.liters, 0);

    const averageEfficiency = totalDistance / totalLitersWithoutOldest;//exclude the oldest-vecause for calculating the efficienty i need all the liters i filled from the first odometer (not include it)
    const averageDistanceBetweenFillups = totalDistance / (refuelings.length - 1);
    const averageDistancePerDay = totalDistance / this.getDateRangeInDays(refuelings);
    const averageLitersPerFill = totalLiters / refuelings.length;
    const averageCostPerFill = totalCost / refuelings.length;
    //const averagePricePerLiter = totalCost / totalLiters;
    // Calculate the average price per liter based on individual refueling prices
    const totalPricePerLiter = refuelings.reduce((sum, ref) => sum + ref.pricePerLiter, 0); // Sum of price per liter for each refuel
    const averagePricePerLiter = totalPricePerLiter / refuelings.length; // Average price per liter

    const averageTimeBetweenRefuels = this.getAverageTimeBetweenRefuels(refuelings);

    return {
      averageEfficiency,
      averageDistanceBetweenFillups,
      averageDistancePerDay,
      averageLitersPerFill,
      averageCostPerFill,
      averagePricePerLiter,
      totalCost,
      totalDistance,
      totalLiters,
      averageTimeBetweenRefuels,
    };
  }

  private getDateRangeForFilter(filter: string) {
    const now = new Date();
    console.log('Calculating date range for filter:', filter); // Log the filter value

    switch (filter) {
      case 'This Month':
        return {
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        };
      case 'Last Month':
        return {
          startDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
          endDate: new Date(now.getFullYear(), now.getMonth(), 0),
        };
      case 'This Year':
        return {
          startDate: new Date(now.getFullYear(), 0, 1),
          endDate: new Date(now.getFullYear(), 11, 31),
        };
      case 'Last Year':
        return {
          startDate: new Date(now.getFullYear() - 1, 0, 1),
          endDate: new Date(now.getFullYear() - 1, 11, 31),
        };
      case 'All Time':
      default:
        return null; // No filtering
    }
  }

  private getAverageTimeBetweenRefuels(refuelings: { date: Date }[]): string {
    if (refuelings.length <= 1) {
      return "0 days, 0 hours"; // If there's only one refuel, no time between refuels
    }

    // Calculate the time differences between consecutive refuels
    let totalTimeDifference = 0;
    for (let i = 1; i < refuelings.length; i++) {
      const timeDiff = refuelings[i].date.getTime() - refuelings[i - 1].date.getTime();
      totalTimeDifference += timeDiff;
    }

    // Calculate the average time difference
    const averageTimeDifference = totalTimeDifference / (refuelings.length - 2);

    // Convert the average time difference from milliseconds to days, hours, minutes
    const days = Math.floor(averageTimeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((averageTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((averageTimeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, ${minutes} minutes`;
  }

  async getGraphData(timePeriod: string) {
    const dateRange = this.getDateRangeForFilter(timePeriod);
  
    const refuelings = await prisma.refueling.findMany({
      where: dateRange ? { date: { gte: dateRange.startDate, lte: dateRange.endDate } } : undefined,
      orderBy: { date: 'asc' }, // Ensure data is sorted by date
    });
  
    if (refuelings.length === 0) {
      return {
        efficiencyGraph: [],
        distanceGraph: [],
        distancePerDayGraph: [],
        litersGraph: [],
        costGraph: [],
        priceGraph: [],
      };
    }
  
    const efficiencyGraph = refuelings.map((ref, index) => {
      if (index === 0) return null;
      const distance = ref.odometer - refuelings[index - 1].odometer;
      return {
        date: ref.date,
        efficiency: distance / ref.liters, // km/l
      };
    }).filter(Boolean);
  
    const distanceGraph = refuelings.map((ref, index) => {
      if (index === 0) return null;
      return {
        date: ref.date,
        distance: ref.odometer - refuelings[index - 1].odometer, // km/fillup
      };
    }).filter(Boolean);
  
    const distancePerDayGraph = refuelings.map((ref, index) => {
      if (index === 0) return null;
      const distance = ref.odometer - refuelings[index - 1].odometer;
      const days = (ref.date.getTime() - refuelings[index - 1].date.getTime()) / (1000 * 60 * 60 * 24);
      return {
        date: ref.date,
        distancePerDay: distance / days, // km/day
      };
    }).filter(Boolean);
  
    const litersGraph = refuelings.map(ref => ({
      date: ref.date,
      liters: ref.liters, // liters/fillup
    }));
  
    const costGraph = refuelings.map(ref => ({
      date: ref.date,
      cost: ref.totalCost, // NIS/fillup
    }));
  
    const priceGraph = refuelings.map(ref => ({
      date: ref.date,
      price: ref.pricePerLiter, // NIS/liter
    }));
  
    return {
      efficiencyGraph,
      distanceGraph,
      distancePerDayGraph,
      litersGraph,
      costGraph,
      priceGraph,
    };
  }
  

  async getFrequentStations() {
    const refuelings = await prisma.refueling.findMany();

    const stationMap = refuelings.reduce((acc, ref) => {
      acc[ref.gasStation] = (acc[ref.gasStation] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedStations = Object.entries(stationMap).sort((a, b) => b[1] - a[1]);

    return sortedStations.map(([station, count]) => ({ station, count }));
  }
  //This function calculates the number of days between the earliest and latest date in the refuelings array
  private getDateRangeInDays(refuelings: { date: Date }[]) {
    const startDate = new Date(Math.min(...refuelings.map(ref => ref.date.getTime())));
    const endDate = new Date(Math.max(...refuelings.map(ref => ref.date.getTime())));
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);//converts miliseconds into days
  }
}
