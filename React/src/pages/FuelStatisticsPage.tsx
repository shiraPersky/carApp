// import React, { useEffect, useState } from 'react';
// import { getFuelStatistics } from '../services/serviceApi';
// import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
// import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
// import GraphComponent, { GraphComponentProps } from '../components/fuelStatistics/GraphComponent';
// import PieChart from '../components/fuelStatistics/PieChart';


// const FuelStatisticsPage = () => {
//   const [statistics, setStatistics] = useState<any>(null);
//   const [timePeriod, setTimePeriod] = useState('allTime');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   //const [graphData, setGraphData] = useState<any>(null);  // State to store graph data
//   const [graphData, setGraphData] = useState<GraphComponentProps>({});  // Define as GraphComponentProps


//   useEffect(() => {
//     async function fetchStatistics() {
//       try {
//         const queryTimePeriod = normalizeTimePeriod(timePeriod);
//         const response = await getFuelStatistics(queryTimePeriod, startDate, endDate);
//         const currentDate = new Date().toISOString();
        
//         const enhancedResponse = {
//           ...response,
//           efficiencyGraph: [{ date: currentDate, efficiency: response.averageFuelEfficiency }],
//           distanceGraph: [{ date: currentDate, distance: response.averageDistanceBetweenFillups }],
//           distancePerDayGraph: [{ date: currentDate, distancePerDay: response.averageDistancePerDay }],
//           litersGraph: [{ date: currentDate, liters: response.averageLitersPerFillup }],
//           costGraph: [{ date: currentDate, cost: response.averageTotalCostPerFillup }],
//           priceGraph: [{ date: currentDate, price: response.averagePricePerLiter }],
//         };
//         setStatistics(enhancedResponse);
//       } catch (error) {
//         console.error("Error fetching statistics:", error);
//       }
//     }
//     fetchStatistics();
//   }, [timePeriod, startDate, endDate]);

//     // Fetching the graph data as a separate side effect
//     useEffect(() => {
//     const fetchGraphData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/fuel-statistics/graph-data?timePeriod=${normalizeTimePeriod(timePeriod)}`);
//         const data = await response.json();
//         const mappedGraphData = {
//           efficiencyGraph: mapGraphData(data.efficiencyGraph),
//           distanceGraph: mapGraphData(data.distanceGraph),
//           distancePerDayGraph: mapGraphData(data.distancePerDayGraph),
//           litersGraph: mapGraphData(data.litersGraph),
//           costGraph: mapGraphData(data.costGraph),
//           priceGraph: mapGraphData(data.priceGraph),
//         };
//         setGraphData(mappedGraphData);  // Update the state with the graph data
//       } catch (error) {
//         console.error("Error fetching graph data:", error);
//       }
//     };

//     fetchGraphData();
//   }, [timePeriod, startDate, endDate]);  // Refetch graph data when time period or dates change

      

//   const handleApplyDateRange = () => {
//     if (startDate && endDate) {
//       setTimePeriod('customDates');
//     }
//   };

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
//         if (startDate && endDate) {
//             return `Custom Dates|${startDate}|${endDate}`;
//         }
//         return 'All Time';
//       default:
//         return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2')
//           .replace(/^./, str => str.toUpperCase());
//     }
//   };

//   const formatNumber = (num: number) => {
//     if (num === undefined || num === null) return '-';
//     return num.toFixed(2);
//   };

//   const mapGraphData = (graphData: any[]) => {
//     if (!graphData || !Array.isArray(graphData)) {
//       console.log("Invalid graph data:", graphData);
//       return { labels: ['Current'], values: [0] };
//     }
  
//     const labels = graphData.map(item => {
//       const date = new Date(item.date);
//       return date.toLocaleDateString();
//     });
  
//     const values = graphData.map(item =>
//       Number(item.efficiency ??
//         item.distance ??
//         item.distancePerDay ??
//         item.liters ??
//         item.cost ??
//         item.price ?? 0)
//     );
  
//     return { labels, values };
//   };
  

//   const statisticsWithMappedGraphs = statistics ? {
//     efficiencyGraph: mapGraphData(statistics.efficiencyGraph),
//     distanceGraph: mapGraphData(statistics.distanceGraph),
//     distancePerDayGraph: mapGraphData(statistics.distancePerDayGraph),
//     litersGraph: mapGraphData(statistics.litersGraph),
//     costGraph: mapGraphData(statistics.costGraph),
//     priceGraph: mapGraphData(statistics.priceGraph)
//   } : {};

//   const handleTimePeriodChange = (newTimePeriod: string, start?: string, end?: string) => {
//     setTimePeriod(newTimePeriod);
//     if (start && end) {
//       setStartDate(start);
//       setEndDate(end);
//     } else {
//       setStartDate('');
//       setEndDate('');
//     }
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
//               <FuelStatisticItem title="Average Fuel Efficiency (km/L)" 
//                                 value={formatNumber(statistics.averageFuelEfficiency)} />
//               <FuelStatisticItem title="Average Distance Between Fill-ups (km)" 
//                                 value={formatNumber(statistics.averageDistanceBetweenFillups)} />
//               <FuelStatisticItem title="Average distance per day (km)" 
//                                 value={formatNumber(statistics.averageDistancePerDay)} />
//               <FuelStatisticItem title="Average liters per fill up (liters)" 
//                                 value={formatNumber(statistics.averageLitersPerFillup)} />
//               <FuelStatisticItem title="Average cost per fill up (NIS)" 
//                                 value={formatNumber(statistics.averageTotalCostPerFillup)} />
//               <FuelStatisticItem title="Average price per liter (NIS)" 
//                                 value={formatNumber(statistics.averagePricePerLiter)} />
//               <FuelStatisticItem title="Total fuel cost (NIS)" 
//                                 value={formatNumber(statistics.totalFuelCost)} />
//               <FuelStatisticItem title="Total distance (km)" 
//                                 value={formatNumber(statistics.totalDistance)} />
//               <FuelStatisticItem title="Total liters" 
//                                 value={formatNumber(statistics.totalLiters)} />
//               <FuelStatisticItem title="Average time between refuels" 
//                                 value={statistics.averageTimeBetweenRefuels} />
//             </div>
//             <div>
//               <h2>Graphs</h2>
//               <GraphComponent {...graphData} />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}>
//               <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Frequent Refueling Stations</h2>
//               <PieChart data={statistics.frequentRefuelingStations} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FuelStatisticsPage;


//try2


import React, { useEffect, useState } from 'react';
import { getFuelStatistics } from '../services/serviceApi';
import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
import GraphComponent, { GraphComponentProps } from '../components/fuelStatistics/GraphComponent';
import PieChart from '../components/fuelStatistics/PieChart';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';

const FuelStatisticsPage = () => {
  const [statistics, setStatistics] = useState<any>(null);
  const [timePeriod, setTimePeriod] = useState('allTime');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [graphData, setGraphData] = useState<GraphComponentProps>({});

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const queryTimePeriod = normalizeTimePeriod(timePeriod);
        const response = await getFuelStatistics(queryTimePeriod, startDate, endDate);
        const currentDate = new Date().toISOString();
        
        const enhancedResponse = {
          ...response,
          efficiencyGraph: [{ date: currentDate, efficiency: response.averageFuelEfficiency }],
          distanceGraph: [{ date: currentDate, distance: response.averageDistanceBetweenFillups }],
          distancePerDayGraph: [{ date: currentDate, distancePerDay: response.averageDistancePerDay }],
          litersGraph: [{ date: currentDate, liters: response.averageLitersPerFillup }],
          costGraph: [{ date: currentDate, cost: response.averageTotalCostPerFillup }],
          priceGraph: [{ date: currentDate, price: response.averagePricePerLiter }],
        };
        setStatistics(enhancedResponse);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }
    fetchStatistics();
  }, [timePeriod, startDate, endDate]);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/fuel-statistics/graph-data?timePeriod=${normalizeTimePeriod(timePeriod)}`);
        const data = await response.json();
        const mappedGraphData = {
          efficiencyGraph: mapGraphData(data.efficiencyGraph),
          distanceGraph: mapGraphData(data.distanceGraph),
          distancePerDayGraph: mapGraphData(data.distancePerDayGraph),
          litersGraph: mapGraphData(data.litersGraph),
          costGraph: mapGraphData(data.costGraph),
          priceGraph: mapGraphData(data.priceGraph),
        };
        setGraphData(mappedGraphData);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, [timePeriod, startDate, endDate]);

  const handleApplyDateRange = () => {
    if (startDate && endDate) {
      setTimePeriod('customDates');
    }
  };

  const normalizeTimePeriod = (timePeriod: string) => {
    switch (timePeriod) {
      case 'allTime': return 'All Time';
      case 'thisMonth': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'thisYear': return 'This Year';
      case 'lastYear': return 'Last Year';
      case 'customDates':
        if (startDate && endDate) {
          return `Custom Dates|${startDate}|${endDate}`;
        }
        return 'All Time';
      default: return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
    }
  };

  const formatNumber = (num: number) => {
    if (num === undefined || num === null) return '-';
    return num.toFixed(2);
  };

  const mapGraphData = (graphData: any[]) => {
    if (!graphData || !Array.isArray(graphData)) {
      console.log("Invalid graph data:", graphData);
      return { labels: ['Current'], values: [0] };
    }

    const labels = graphData.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString();
    });

    const values = graphData.map(item =>
      Number(item.efficiency ?? item.distance ?? item.distancePerDay ?? item.liters ?? item.cost ?? item.price ?? 0)
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
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Fuel Statistics</Typography>
      <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
      <Box my={4}>
        {statistics && (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h5">Statistics Overview</Typography>
                  <FuelStatisticItem title="Average Fuel Efficiency (km/L)" value={formatNumber(statistics.averageFuelEfficiency)} />
                  <FuelStatisticItem title="Average Distance Between Fill-ups (km)" value={formatNumber(statistics.averageDistanceBetweenFillups)} />
                  <FuelStatisticItem title="Average Distance per Day (km)" value={formatNumber(statistics.averageDistancePerDay)} />
                  <FuelStatisticItem title="Average Liters per Fill-up (liters)" value={formatNumber(statistics.averageLitersPerFillup)} />
                  <FuelStatisticItem title="Average Cost per Fill-up (NIS)" value={formatNumber(statistics.averageTotalCostPerFillup)} />
                  <FuelStatisticItem title="Average Price per Liter (NIS)" value={formatNumber(statistics.averagePricePerLiter)} />
                  <FuelStatisticItem title="Total Fuel Cost (NIS)" value={formatNumber(statistics.totalFuelCost)} />
                  <FuelStatisticItem title="Total Distance (km)" value={formatNumber(statistics.totalDistance)} />
                  <FuelStatisticItem title="Total Liters" value={formatNumber(statistics.totalLiters)} />
                  <FuelStatisticItem title="Average Time Between Refuels" value={statistics.averageTimeBetweenRefuels} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h5">Graphs</Typography>
                  <GraphComponent {...graphData} />
                </Paper>
              </Grid>
            </Grid>
            <Box my={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Typography variant="h5" gutterBottom>Frequent Refueling Stations</Typography>
              <PieChart data={statistics.frequentRefuelingStations} />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default FuelStatisticsPage;
