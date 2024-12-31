import React, { useEffect, useState } from 'react';
import { getFuelStatistics } from '../services/serviceApi';
import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
import GraphComponent from '../components/fuelStatistics/GraphComponent';
import PieChart from '../components/fuelStatistics/PieChart';

const FuelStatisticsPage = () => {
  const [statistics, setStatistics] = useState(null);
  const [timePeriod, setTimePeriod] = useState('allTime'); // Default time period

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const normalizedTimePeriod = normalizeTimePeriod(timePeriod);

        // Send the selected time period as query parameter to the backend
        const response = await getFuelStatistics(normalizedTimePeriod);
        setStatistics(response);
      } catch (error) {
         console.error("Error fetching statistics:", error);
      }
    }
    fetchStatistics();
  }, [timePeriod]);

  //Helper function to normalize time period format ('thisMonth' => 'This Month')
  const normalizeTimePeriod = (timePeriod: string) => {
    switch (timePeriod) {
      case 'allTime':
        return 'All Time';
      case 'thisMonth':
        return 'This Month';
      case 'lastMonth':
        return 'Last Month';
      case 'thisYear':
        return 'This Year';
      case 'lastYear':
        return 'Last Year';
      case 'customDates':
        return 'Custom Dates';
      default:
        // Capitalize and insert spaces in camelCase strings
        return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
    }
  };
  
  // Helper function to format numbers to 2 decimal places
  const formatNumber = (num: number) => {
    if (num === undefined || num === null) return '-'; // Handle cases where num is undefined
    return num.toFixed(2); // Format to 2 decimal places
  };

   // Handle time period change from DropdownMenu
   const handleTimePeriodChange = (newTimePeriod: string) => {
    setTimePeriod(newTimePeriod);
  };

  return (
    <div>
      <h1>Fuel Statistics</h1>
      <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
      <div>
        {statistics && (
          <>
            <div>
              <h2>Statistics Overview</h2>
              <FuelStatisticItem title="Average Fuel Efficiency (km/L)" value={formatNumber(statistics.averageFuelEfficiency)} />
              <FuelStatisticItem title="Average Distance Between Fill-ups(km)" value={formatNumber(statistics.averageDistanceBetweenFillups)} />
              <FuelStatisticItem title="Average distance per day (km)" value={formatNumber(statistics.averageDistancePerDay)} />
              <FuelStatisticItem title="Average liters per fill up(liters)" value={formatNumber(statistics.averageLitersPerFillup)} />
              <FuelStatisticItem title="Average cost per fill up(NIS)" value={formatNumber(statistics.averageTotalCostPerFillup)} />
              <FuelStatisticItem title="Average price per liter(NIS)" value={formatNumber(statistics.averagePricePerLiter)} />
              <FuelStatisticItem title="Total fuel cost on the choosen time(NIS)" value={formatNumber(statistics.totalFuelCost)} />
              <FuelStatisticItem title="Total distance on the choosen time(km)" value={formatNumber(statistics.totalDistance)} />
              <FuelStatisticItem title="Total liters fillups on the choosen time(liters)" value={formatNumber(statistics.totalLiters)} />
              <FuelStatisticItem title="Average time between refuels" value={statistics.averageTimeBetweenRefuels} />
            </div>
            <div>
              <h2>Graph</h2>
              <GraphComponent data={statistics.graphData} />
            </div>
            <div>
              <h2>Frequent Refueling Stations</h2>
              <PieChart data={statistics.frequentRefuelingStations} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FuelStatisticsPage;
