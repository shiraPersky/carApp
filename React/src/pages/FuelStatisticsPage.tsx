// import React, { useEffect, useState } from 'react';
// import { getFuelStatistics } from '../services/serviceApi';
// import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
// import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
// import GraphComponent from '../components/fuelStatistics/GraphComponent';
// import PieChart from '../components/fuelStatistics/PieChart';

// const FuelStatisticsPage = () => {
//   const [statistics, setStatistics] = useState<any>(null);
//   const [timePeriod, setTimePeriod] = useState('allTime'); // Default time period

//   useEffect(() => {
//     async function fetchStatistics() {
//       try {
//         const normalizedTimePeriod = normalizeTimePeriod(timePeriod);

//         // Send the selected time period as query parameter to the backend
//         const response = await getFuelStatistics(normalizedTimePeriod);

//         setStatistics(response);
//       } catch (error) {
//          console.error("Error fetching statistics:", error);
//       }
//     }
//     fetchStatistics();
//   }, [timePeriod]);

//   //Helper function to normalize time period format ('thisMonth' => 'This Month')
//   const normalizeTimePeriod = (timePeriod: string) => {
//     switch (timePeriod) {
//       case 'allTime':
//         return 'All Time';
//       case 'thisMonth':
//         return 'This Month';
//       case 'lastMonth':
//         return 'Last Month';
//       case 'thisYear':
//         return 'This Year';
//       case 'lastYear':
//         return 'Last Year';
//       case 'customDates':
//         return 'Custom Dates';
//       default:
//         // Capitalize and insert spaces in camelCase strings
//         return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
//     }
//   };
  
//   // Helper function to format numbers to 2 decimal places
//   const formatNumber = (num: number) => {
//     if (num === undefined || num === null) return '-'; // Handle cases where num is undefined
//     return num.toFixed(2); // Format to 2 decimal places
//   };

//    // Map graph data to the required format
// const mapGraphData = (graphData: any[]) => {
//     if (!graphData || !Array.isArray(graphData)) return { labels: [], values: [] };
    
//     return {
//       labels: graphData.map(item => new Date(item.date).toLocaleDateString()),
//       values: graphData.map(item => (
//         item.efficiency || 
//         item.distance || 
//         item.distancePerDay || 
//         item.liters || 
//         item.cost || 
//         item.price || 
//         0
//       ))
//     };
//   };
  
//   // Update the statisticsWithMappedGraphs object
//   const statisticsWithMappedGraphs = statistics ? {
//     efficiencyGraph: mapGraphData(statistics.efficiencyGraph),
//     distanceGraph: mapGraphData(statistics.distanceGraph),
//     distancePerDayGraph: mapGraphData(statistics.distancePerDayGraph),
//     litersGraph: mapGraphData(statistics.litersGraph),
//     costGraph: mapGraphData(statistics.costGraph),
//     priceGraph: mapGraphData(statistics.priceGraph),
//   } : {};

//    // Handle time period change from DropdownMenu
//    const handleTimePeriodChange = (newTimePeriod: string) => {
//     setTimePeriod(newTimePeriod);
//   };

//   return (
//     <div>
//       <h1>Fuel Statistics</h1>
//       <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
//       <div>
//         {statistics && (
//           <>
//             <div>
//               <h2>Statistics Overview</h2>
//               <FuelStatisticItem title="Average Fuel Efficiency (km/L)" value={formatNumber(statistics.averageFuelEfficiency)} />
//               <FuelStatisticItem title="Average Distance Between Fill-ups(km)" value={formatNumber(statistics.averageDistanceBetweenFillups)} />
//               <FuelStatisticItem title="Average distance per day (km)" value={formatNumber(statistics.averageDistancePerDay)} />
//               <FuelStatisticItem title="Average liters per fill up(liters)" value={formatNumber(statistics.averageLitersPerFillup)} />
//               <FuelStatisticItem title="Average cost per fill up(NIS)" value={formatNumber(statistics.averageTotalCostPerFillup)} />
//               <FuelStatisticItem title="Average price per liter(NIS)" value={formatNumber(statistics.averagePricePerLiter)} />
//               <FuelStatisticItem title="Total fuel cost on the choosen time(NIS)" value={formatNumber(statistics.totalFuelCost)} />
//               <FuelStatisticItem title="Total distance on the choosen time(km)" value={formatNumber(statistics.totalDistance)} />
//               <FuelStatisticItem title="Total liters fillups on the choosen time(liters)" value={formatNumber(statistics.totalLiters)} />
//               <FuelStatisticItem title="Average time between refuels" value={statistics.averageTimeBetweenRefuels} />
//             </div>
//             <div>
//               <h2>Graph</h2>
//               <GraphComponent
//                 efficiencyGraph={statisticsWithMappedGraphs?.efficiencyGraph}
//                 distanceGraph={statisticsWithMappedGraphs?.distanceGraph}
//                 distancePerDayGraph={statisticsWithMappedGraphs?.distancePerDayGraph}
//                 litersGraph={statisticsWithMappedGraphs?.litersGraph}
//                 costGraph={statisticsWithMappedGraphs?.costGraph}
//                 priceGraph={statisticsWithMappedGraphs?.priceGraph}
//               />
//             </div>
//             <div>
//               <h2>Frequent Refueling Stations</h2>
//               <PieChart data={statistics.frequentRefuelingStations} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FuelStatisticsPage;


import React, { useEffect, useState } from 'react';
import { getFuelStatistics } from '../services/serviceApi';
import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
import GraphComponent from '../components/fuelStatistics/GraphComponent';
import PieChart from '../components/fuelStatistics/PieChart';

const FuelStatisticsPage = () => {
  const [statistics, setStatistics] = useState<any>(null);
  const [timePeriod, setTimePeriod] = useState('allTime');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    async function fetchStatistics() {
      try {
        let queryTimePeriod = normalizeTimePeriod(timePeriod);
        //let  normalizedTimePeriod = normalizeTimePeriod(timePeriod);
        // If custom dates are selected, append the date range to the filter
        // if (timePeriod === 'customDates' && startDate && endDate) {
        //     normalizedTimePeriod = `Custom Dates|${startDate}|${endDate}`;
        // }
        // const response = await getFuelStatistics(normalizedTimePeriod);
        const response = await getFuelStatistics(queryTimePeriod, startDate, endDate);
        // Get current date for the data point
        const currentDate = new Date().toISOString();
        
        // Create graph data using the statistics
        const enhancedResponse = {
          ...response,
          efficiencyGraph: [{
            date: currentDate,
            efficiency: response.averageFuelEfficiency
          }],
          distanceGraph: [{
            date: currentDate,
            distance: response.averageDistanceBetweenFillups
          }],
          distancePerDayGraph: [{
            date: currentDate,
            distancePerDay: response.averageDistancePerDay
          }],
          litersGraph: [{
            date: currentDate,
            liters: response.averageLitersPerFillup
          }],
          costGraph: [{
            date: currentDate,
            cost: response.averageTotalCostPerFillup
          }],
          priceGraph: [{
            date: currentDate,
            price: response.averagePricePerLiter
          }]
        };

        console.log("Enhanced response:", enhancedResponse);
        setStatistics(enhancedResponse);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }
    fetchStatistics();
  }, [timePeriod, startDate, endDate]);

  
  const handleApplyDateRange = () => {
    if (startDate && endDate) {
      setTimePeriod('customDates');
    }
  };

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
        if (startDate && endDate) {
            return `Custom Dates|${startDate}|${endDate}`;
        }
        return 'All Time';
      default:
        return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/^./, str => str.toUpperCase());
    }
  };

  const formatNumber = (num: number) => {
    if (num === undefined || num === null) return '-';
    return num.toFixed(2);
  };

  const mapGraphData = (graphData: any[]) => {

    if (!graphData || !Array.isArray(graphData)) {
      console.log("Invalid graph data:", graphData);
      return {
        labels: ['Current'],
        values: [0]
      };
    }

    const labels = graphData.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString();
    });

    const values = graphData.map(item => 
      Number(item.efficiency ?? 
             item.distance ?? 
             item.distancePerDay ?? 
             item.liters ?? 
             item.cost ?? 
             item.price ?? 
             0)
    );

    return { labels, values };
  };

  const statisticsWithMappedGraphs = statistics ? {
    efficiencyGraph: mapGraphData(statistics.efficiencyGraph),
    distanceGraph: mapGraphData(statistics.distanceGraph),
    distancePerDayGraph: mapGraphData(statistics.distancePerDayGraph),
    litersGraph: mapGraphData(statistics.litersGraph),
    costGraph: mapGraphData(statistics.costGraph),
    priceGraph: mapGraphData(statistics.priceGraph)
  } : {};


  const handleTimePeriodChange = (newTimePeriod: string, start?: string, end?: string) => {
    setTimePeriod(newTimePeriod);
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate('');
      setEndDate('');
    }
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
              <FuelStatisticItem title="Average Fuel Efficiency (km/L)" 
                                value={formatNumber(statistics.averageFuelEfficiency)} />
              <FuelStatisticItem title="Average Distance Between Fill-ups (km)" 
                                value={formatNumber(statistics.averageDistanceBetweenFillups)} />
              <FuelStatisticItem title="Average distance per day (km)" 
                                value={formatNumber(statistics.averageDistancePerDay)} />
              <FuelStatisticItem title="Average liters per fill up (liters)" 
                                value={formatNumber(statistics.averageLitersPerFillup)} />
              <FuelStatisticItem title="Average cost per fill up (NIS)" 
                                value={formatNumber(statistics.averageTotalCostPerFillup)} />
              <FuelStatisticItem title="Average price per liter (NIS)" 
                                value={formatNumber(statistics.averagePricePerLiter)} />
              <FuelStatisticItem title="Total fuel cost (NIS)" 
                                value={formatNumber(statistics.totalFuelCost)} />
              <FuelStatisticItem title="Total distance (km)" 
                                value={formatNumber(statistics.totalDistance)} />
              <FuelStatisticItem title="Total liters" 
                                value={formatNumber(statistics.totalLiters)} />
              <FuelStatisticItem title="Average time between refuels" 
                                value={statistics.averageTimeBetweenRefuels} />
            </div>
            <div>
              <h2>Graphs</h2>
              <GraphComponent {...statisticsWithMappedGraphs} />
            </div>
            <div>
              <h2>Frequent Refueling Stations</h2>
              <PieChart data={statistics.frequentRefuelingStations} />            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FuelStatisticsPage;