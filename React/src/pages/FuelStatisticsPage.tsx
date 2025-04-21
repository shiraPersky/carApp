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


// import React, { useEffect, useState } from 'react';
// import { getFuelStatistics } from '../services/serviceApi';
// import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
// import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
// import GraphComponent, { GraphComponentProps } from '../components/fuelStatistics/GraphComponent';
// import PieChart from '../components/fuelStatistics/PieChart';
// import { Container, Grid, Typography, Paper, Box } from '@mui/material';

// const FuelStatisticsPage = () => {
//   const [statistics, setStatistics] = useState<any>(null);
//   const [timePeriod, setTimePeriod] = useState('allTime');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [graphData, setGraphData] = useState<GraphComponentProps>({});

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

//   useEffect(() => {
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
//         setGraphData(mappedGraphData);
//       } catch (error) {
//         console.error("Error fetching graph data:", error);
//       }
//     };

//     fetchGraphData();
//   }, [timePeriod, startDate, endDate]);

//   const handleApplyDateRange = () => {
//     if (startDate && endDate) {
//       setTimePeriod('customDates');
//     }
//   };

//   const normalizeTimePeriod = (timePeriod: string) => {
//     switch (timePeriod) {
//       case 'allTime': return 'All Time';
//       case 'thisMonth': return 'This Month';
//       case 'lastMonth': return 'Last Month';
//       case 'thisYear': return 'This Year';
//       case 'lastYear': return 'Last Year';
//       case 'customDates':
//         if (startDate && endDate) {
//           return `Custom Dates|${startDate}|${endDate}`;
//         }
//         return 'All Time';
//       default: return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
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
//       Number(item.efficiency ?? item.distance ?? item.distancePerDay ?? item.liters ?? item.cost ?? item.price ?? 0)
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
//     <Container maxWidth="lg">
//       <Typography variant="h4" gutterBottom>Fuel Statistics</Typography>
//       <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
//       <Box my={4}>
//         {statistics && (
//           <>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                   <Typography variant="h5">Statistics Overview</Typography>
//                   <FuelStatisticItem title="Average Fuel Efficiency (km/L)" value={formatNumber(statistics.averageFuelEfficiency)} />
//                   <FuelStatisticItem title="Average Distance Between Fill-ups (km)" value={formatNumber(statistics.averageDistanceBetweenFillups)} />
//                   <FuelStatisticItem title="Average Distance per Day (km)" value={formatNumber(statistics.averageDistancePerDay)} />
//                   <FuelStatisticItem title="Average Liters per Fill-up (liters)" value={formatNumber(statistics.averageLitersPerFillup)} />
//                   <FuelStatisticItem title="Average Cost per Fill-up (NIS)" value={formatNumber(statistics.averageTotalCostPerFillup)} />
//                   <FuelStatisticItem title="Average Price per Liter (NIS)" value={formatNumber(statistics.averagePricePerLiter)} />
//                   <FuelStatisticItem title="Total Fuel Cost (NIS)" value={formatNumber(statistics.totalFuelCost)} />
//                   <FuelStatisticItem title="Total Distance (km)" value={formatNumber(statistics.totalDistance)} />
//                   <FuelStatisticItem title="Total Liters" value={formatNumber(statistics.totalLiters)} />
//                   <FuelStatisticItem title="Average Time Between Refuels" value={statistics.averageTimeBetweenRefuels} />
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                   <Typography variant="h5">Graphs</Typography>
//                   <GraphComponent {...graphData} />
//                 </Paper>
//               </Grid>
//             </Grid>
//             <Box my={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
//               <Typography variant="h5" gutterBottom>Frequent Refueling Stations</Typography>
//               <PieChart data={statistics.frequentRefuelingStations} />
//             </Box>
//           </>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default FuelStatisticsPage;

//try3

// import React, { useEffect, useState } from 'react';
// import { getFuelStatistics } from '../services/serviceApi';
// import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
// import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
// import GraphComponent, { GraphComponentProps } from '../components/fuelStatistics/GraphComponent';
// import PieChart from '../components/fuelStatistics/PieChart';
// import {
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Box,
//   Card,
//   CardContent,
//   CircularProgress,
//   Divider,
//   useTheme,
//   Alert
// } from '@mui/material';

// const FuelStatisticsPage = () => {
//   const theme = useTheme();
//   const [statistics, setStatistics] = useState<any>(null);
//   const [timePeriod, setTimePeriod] = useState('allTime');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [graphData, setGraphData] = useState<GraphComponentProps>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchStatistics() {
//       setLoading(true);
//       setError(null);
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
//         setError("Error fetching statistics. Please try again later.");
//         console.error("Error fetching statistics:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStatistics();
//   }, [timePeriod, startDate, endDate]);

//   useEffect(() => {
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
//         setGraphData(mappedGraphData);
//       } catch (error) {
//         console.error("Error fetching graph data:", error);
//       }
//     };

//     fetchGraphData();
//   }, [timePeriod, startDate, endDate]);

//   const normalizeTimePeriod = (timePeriod: string) => {
//     switch (timePeriod) {
//       case 'allTime': return 'All Time';
//       case 'thisMonth': return 'This Month';
//       case 'lastMonth': return 'Last Month';
//       case 'thisYear': return 'This Year';
//       case 'lastYear': return 'Last Year';
//       case 'customDates':
//         if (startDate && endDate) {
//           return `Custom Dates|${startDate}|${endDate}`;
//         }
//         return 'All Time';
//       default: return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
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
//       Number(item.efficiency ?? item.distance ?? item.distancePerDay ?? item.liters ?? item.cost ?? item.price ?? 0)
//     );

//     return { labels, values };
//   };

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

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ 
//         fontWeight: 'bold',
//         color: theme.palette.primary.main,
//         mb: 3
//       }}>
//         Fuel Statistics
//       </Typography>

//       <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
//         <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
//       </Paper>

//       {error && (
//         <Alert severity="error" sx={{ mb: 4 }}>
//           {error}
//         </Alert>
//       )}

//       {statistics && (
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom sx={{ 
//                   fontWeight: 'medium',
//                   color: theme.palette.secondary.main,
//                   mb: 2
//                 }}>
//                   Statistics Overview
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Box sx={{ '& > *': { mb: 2 } }}>
//                   <FuelStatisticItem title="Average Fuel Efficiency (km/L)" 
//                     value={formatNumber(statistics.averageFuelEfficiency)} />
//                   <FuelStatisticItem title="Average Distance Between Fill-ups (km)" 
//                     value={formatNumber(statistics.averageDistanceBetweenFillups)} />
//                   <FuelStatisticItem title="Average Distance per Day (km)" 
//                     value={formatNumber(statistics.averageDistancePerDay)} />
//                   <FuelStatisticItem title="Average Liters per Fill-up (liters)" 
//                     value={formatNumber(statistics.averageLitersPerFillup)} />
//                   <FuelStatisticItem title="Average Cost per Fill-up (NIS)" 
//                     value={formatNumber(statistics.averageTotalCostPerFillup)} />
//                   <FuelStatisticItem title="Average Price per Liter (NIS)" 
//                     value={formatNumber(statistics.averagePricePerLiter)} />
//                   <FuelStatisticItem title="Total Fuel Cost (NIS)" 
//                     value={formatNumber(statistics.totalFuelCost)} />
//                   <FuelStatisticItem title="Total Distance (km)" 
//                     value={formatNumber(statistics.totalDistance)} />
//                   <FuelStatisticItem title="Total Liters" 
//                     value={formatNumber(statistics.totalLiters)} />
//                   <FuelStatisticItem title="Average Time Between Refuels" 
//                     value={statistics.averageTimeBetweenRefuels} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom sx={{ 
//                   fontWeight: 'medium',
//                   color: theme.palette.secondary.main,
//                   mb: 2
//                 }}>
//                   Graphs
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <GraphComponent {...graphData} />
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant="h5" align="center" gutterBottom sx={{ 
//                   fontWeight: 'medium',
//                   color: theme.palette.secondary.main,
//                   mb: 2
//                 }}>
//                   Frequent Refueling Stations
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />
//                 <Box display="flex" justifyContent="center">
//                   <PieChart data={statistics.frequentRefuelingStations} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default FuelStatisticsPage;


// import React, { useEffect, useState } from 'react';
// import { getFuelStatistics } from '../services/serviceApi';
// import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
// import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
// import GraphComponent, { GraphComponentProps } from '../components/fuelStatistics/GraphComponent';
// import PieChart from '../components/fuelStatistics/PieChart';
// import { 
//   Container, 
//   Grid, 
//   Typography, 
//   Paper, 
//   Box, 
//   Card, 
//   CardContent, 
//   CircularProgress, 
//   Divider
// } from '@mui/material';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import SavingsIcon from '@mui/icons-material/Savings';
// import '../styles/FuelStatisticsPage.css';

// type FuelStatistics = {
//   totalLiters: number;
//   totalFuelCost: number;
//   totalDistance: number;
//   averageFuelEfficiency: number;
//   averageDistanceBetweenFillups: number;
//   averageDistancePerDay: number;
//   averageLitersPerFillup: number;
//   averageTotalCostPerFillup: number;
//   averagePricePerLiter: number;
//   averageTimeBetweenRefuels: string;
//   frequentRefuelingStations: { name: string; count: number }[];
// };


// const FuelStatisticsPage = () => {
//   const [statistics, setStatistics] = useState<FuelStatistics | null>(null);
//   const [timePeriod, setTimePeriod] = useState('allTime');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [graphData, setGraphData] = useState<GraphComponentProps>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchStatistics() {
//       setLoading(true);
//       setError(null);
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
//         setError("Error fetching statistics. Please try again later.");
//         console.error("Error fetching statistics:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStatistics();
//   }, [timePeriod, startDate, endDate]);

//   useEffect(() => {
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
//         setGraphData(mappedGraphData);
//       } catch (error) {
//         console.error("Error fetching graph data:", error);
//       }
//     };

//     fetchGraphData();
//   }, [timePeriod, startDate, endDate]);

//   const normalizeTimePeriod = (timePeriod) => {
//     switch (timePeriod) {
//       case 'allTime': return 'All Time';
//       case 'thisMonth': return 'This Month';
//       case 'lastMonth': return 'Last Month';
//       case 'thisYear': return 'This Year';
//       case 'lastYear': return 'Last Year';
//       case 'customDates':
//         if (startDate && endDate) {
//           return `Custom Dates|${startDate}|${endDate}`;
//         }
//         return 'All Time';
//       default: return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
//     }
//   };

//   const formatNumber = (num) => {
//     if (num === undefined || num === null) return '-';
//     return num.toFixed(2);
//   };

//   const mapGraphData = (graphData) => {
//     if (!graphData || !Array.isArray(graphData)) {
//       console.log("Invalid graph data:", graphData);
//       return { labels: ['Current'], values: [0] };
//     }

//     const labels = graphData.map(item => {
//       const date = new Date(item.date);
//       return date.toLocaleDateString();
//     });

//     const values = graphData.map(item =>
//       Number(item.efficiency ?? item.distance ?? item.distancePerDay ?? item.liters ?? item.cost ?? item.price ?? 0)
//     );

//     return { labels, values };
//   };

//   const handleTimePeriodChange = (newTimePeriod, start, end) => {
//     setTimePeriod(newTimePeriod);
//     if (start && end) {
//       setStartDate(start);
//       setEndDate(end);
//     } else {
//       setStartDate('');
//       setEndDate('');
//     }
//   };

//   if (loading) {
//     return (
//       <Box className="loading-container">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Extract important metrics for summary cards
//   const fuelCost = statistics?.totalFuelCost || 0;
//   const totalDistance = statistics?.totalDistance || 0;
//   const totalSavings = statistics?.averageFuelEfficiency ? 
//     (statistics.averageFuelEfficiency * totalDistance) / 100 : 0;

//   return (
//     <Container maxWidth="lg" className="fuel-statistics-container">
//       <Typography variant="h4" component="h1" className="page-title">
//         Fuel Analytics
//       </Typography>

//       {/* Summary Cards Row */}
//       <Grid container spacing={2} className="summary-cards">
//         <Grid item xs={12} md={4}>
//           <Paper className="summary-card fuel-cost">
//             <Box className="card-header">
//               <LocalGasStationIcon className="card-icon" />
//               <Typography variant="subtitle1" className="card-subtitle">
//                 Total Fuel Cost
//               </Typography>
//             </Box>
//             <Typography variant="h4" className="card-value fuel-cost-value">
//               {formatNumber(fuelCost)} ₪
//             </Typography>
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={4}>
//           <Paper className="summary-card total-distance">
//             <Box className="card-header">
//               <DirectionsCarIcon className="card-icon" />
//               <Typography variant="subtitle1" className="card-subtitle">
//                 Total Distance
//               </Typography>
//             </Box>
//             <Typography variant="h4" className="card-value total-distance-value">
//               {formatNumber(totalDistance)} km
//             </Typography>
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={4}>
//           <Paper className="summary-card efficiency-savings">
//             <Box className="card-header">
//               <SavingsIcon className="card-icon" />
//               <Typography variant="subtitle1" className="card-subtitle">
//                 Efficiency Savings
//               </Typography>
//             </Box>
//             <Typography variant="h4" className="card-value efficiency-savings-value">
//               {formatNumber(totalSavings)} ₪
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Filter Selection */}
//       <Grid container spacing={3} className="filter-section">
//         <Grid item xs={12} md={6}>
//           <Paper className="filter-card">
//             <Typography variant="subtitle1" className="filter-title">
//               Period (Statistics Chart)
//             </Typography>
//             <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Paper className="filter-card">
//             <Typography variant="subtitle1" className="filter-title">
//               Year (Expenses Chart)
//             </Typography>
//             <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
//           </Paper>
//         </Grid>
//       </Grid>

//       {error && (
//         <Paper className="error-message">
//           {error}
//         </Paper>
//       )}

//       {statistics && (
//         <Grid container spacing={4} className="statistics-content">
//           {/* Pie Chart */}
//           <Grid item xs={12} md={6}>
//             <Card className="chart-card">
//               <CardContent>
//                 <Typography variant="h6" className="chart-title">
//                   Refueling Stations
//                 </Typography>
//                 <Divider className="chart-divider" />
//                 <Box className="chart-container">
//                   <PieChart data={statistics.frequentRefuelingStations} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Expenses Chart */}
//           <Grid item xs={12} md={6}>
//             <Card className="chart-card">
//               <CardContent>
//                 <Typography variant="h6" className="chart-title">
//                 Average Price per Liter (NIS) for Each Month
//                 </Typography>
//                 <Divider className="chart-divider" />
//                   <GraphComponent costGraph={graphData.priceGraph  || { labels: [], values: [] }} />
//                 </CardContent>
//             </Card>
//           </Grid>

//           {/* Statistics Overview */}
//           <Grid item xs={12}>
//             <Card className="overview-card">
//               <CardContent>
//                 <Typography variant="h6" className="overview-title">
//                   Statistics Overview
//                 </Typography>
//                 <Divider className="overview-divider" />
                
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <Box className="statistics-list">
//                       <FuelStatisticItem 
//                         title="Average Fuel Efficiency (km/L)" 
//                         value={formatNumber(statistics.averageFuelEfficiency)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Average Distance Between Fill-ups (km)" 
//                         value={formatNumber(statistics.averageDistanceBetweenFillups)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Average Distance per Day (km)" 
//                         value={formatNumber(statistics.averageDistancePerDay)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Average Liters per Fill-up (liters)" 
//                         value={formatNumber(statistics.averageLitersPerFillup)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Average Time Between Refuels" 
//                         value={statistics.averageTimeBetweenRefuels} 
//                       />
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Box className="statistics-list">
//                       <FuelStatisticItem 
//                         title="Average Cost per Fill-up (NIS)" 
//                         value={formatNumber(statistics.averageTotalCostPerFillup)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Average Price per Liter (NIS)" 
//                         value={formatNumber(statistics.averagePricePerLiter)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Total Fuel Cost (NIS)" 
//                         value={formatNumber(statistics.totalFuelCost)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Total Distance (km)" 
//                         value={formatNumber(statistics.totalDistance)} 
//                       />
//                       <FuelStatisticItem 
//                         title="Total Liters" 
//                         value={formatNumber(statistics.totalLiters)} 
//                       />
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Full Graphs Section */}
//           <Grid item xs={12}>
//             <Card className="detailed-analytics-card">
//               <CardContent>
//                 <Typography variant="h6" className="detailed-analytics-title">
//                   Detailed Analytics
//                 </Typography>
//                 <Divider className="detailed-analytics-divider" />
//                 <GraphComponent {...graphData} />
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default FuelStatisticsPage;

import { useState, useEffect } from 'react';
import { Car, getCars, getFuelStatistics } from '../services/serviceApi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaCarAlt, FaWrench, FaGasPump, FaChartLine, FaBell } from 'react-icons/fa';
import '../styles/HomePage.css';
import React from 'react';
import PieChart from '../components/fuelStatistics/PieChart';
import GraphComponent from '../components/fuelStatistics/GraphComponent';
import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SavingsIcon from '@mui/icons-material/Savings';
import { Typography, Box, Paper, Grid, Card, CardContent, Divider, CircularProgress } from '@mui/material';

type FuelStatistics = {
  totalLiters: number;
  totalFuelCost: number;
  totalDistance: number;
  averageFuelEfficiency: number;
  averageDistanceBetweenFillups: number;
  averageDistancePerDay: number;
  averageLitersPerFillup: number;
  averageTotalCostPerFillup: number;
  averagePricePerLiter: number;
  averageTimeBetweenRefuels: string;
  frequentRefuelingStations: { name: string; count: number }[];
};

const HomePage = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const { carId } = useParams();
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<FuelStatistics | null>(null);
  const [graphData, setGraphData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars() as Car[];
      setCars(data);
      
      if (carId) {
        const car = data.find(c => c.id === parseInt(carId));
        if (car) {
          setSelectedCar(car);
        } else if (data.length > 0) {
          // If no car is specified or specified car not found, select the first car
          setSelectedCar(data[0]);
        }
      } else if (data.length > 0) {
        // If no car ID is provided, select the first car
        setSelectedCar(data[0]);
      }
    };
    
    fetchCars();
  }, [carId]);

  useEffect(() => {
    async function fetchLastMonthStatistics() {
      setLoading(true);
      setError(null);
      try {
        const response = await getFuelStatistics('Last Month', '', '');
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
        setError("Error fetching statistics. Please try again later.");
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    }

    const fetchGraphData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/fuel-statistics/graph-data?timePeriod=Last Month`);
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

    fetchLastMonthStatistics();
    fetchGraphData();
  }, []);

  const mapGraphData = (graphData) => {
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

  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = parseInt(event.target.value);
    const car = cars.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
      navigate(`/home/${carId}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toFixed(2);
  };

  return (
    <div className="home-container">
      <div className="car-selection">
        <label htmlFor="car-select">Select Car:</label>
        <select 
          id="car-select" 
          value={selectedCar?.id || ''} 
          onChange={handleCarChange}
        >
          {cars.map(car => (
            <option key={car.id} value={car.id}>
              {car.license_plate} - {car.make} {car.model}
            </option>
          ))}
        </select>
      </div>

      {selectedCar && (
        <div className="car-details-card">
          <h2>{selectedCar.make} {selectedCar.model}</h2>
          <div className="car-info-grid">
            <div className="car-info-item">
              <span className="info-label">License Plate:</span>
              <span className="info-value">{selectedCar.license_plate}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Year:</span>
              <span className="info-value">{selectedCar.year}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Color:</span>
              <span className="info-value">{selectedCar.color}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Odometer:</span>
              <span className="info-value">{selectedCar.odometer} km</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Valid Until:</span>
              <span className="info-value">{formatDate(selectedCar.valid_until)}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Last Test:</span>
              <span className="info-value">{formatDate(selectedCar.last_test)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="navigation-tiles">
        <Link to="/reminders" className="nav-tile">
          <FaBell className="nav-icon"/>
          <span className="nav-label">Reminders</span>
        </Link>
        <Link to="/services" className="nav-tile">
          <FaWrench className="nav-icon"/>
          <span className="nav-label">Services</span>
        </Link>
        <Link to="/refuels" className="nav-tile">
          <FaGasPump className="nav-icon"/>
          <span className="nav-label">Refuel</span>
        </Link>
        <Link to="/fuel-statistics" className="nav-tile">
          <FaChartLine className="nav-icon"/>
          <span className="nav-label">Fuel Statistics</span>
        </Link>
      </div>

      {/* Last Month Fuel Statistics Section */}
      <div className="last-month-statistics">
        <Typography variant="h5" component="h2" className="section-title">
          Statistics for Last Month
        </Typography>

        {loading ? (
          <Box className="loading-container">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper className="error-message">
            {error}
          </Paper>
        ) : statistics && (
          <>
            {/* Summary Cards Row */}
            <Grid container spacing={2} className="summary-cards">
              <Grid item xs={12} md={4}>
                <Paper className="summary-card fuel-cost">
                  <Box className="card-header">
                    <LocalGasStationIcon className="card-icon" />
                    <Typography variant="subtitle1" className="card-subtitle">
                      Total Fuel Cost
                    </Typography>
                  </Box>
                  <Typography variant="h4" className="card-value fuel-cost-value">
                    {formatNumber(statistics.totalFuelCost)} ₪
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper className="summary-card total-distance">
                  <Box className="card-header">
                    <DirectionsCarIcon className="card-icon" />
                    <Typography variant="subtitle1" className="card-subtitle">
                      Total Distance
                    </Typography>
                  </Box>
                  <Typography variant="h4" className="card-value total-distance-value">
                    {formatNumber(statistics.totalDistance)} km
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper className="summary-card efficiency-savings">
                  <Box className="card-header">
                    <SavingsIcon className="card-icon" />
                    <Typography variant="subtitle1" className="card-subtitle">
                      Efficiency Savings
                    </Typography>
                  </Box>
                  <Typography variant="h4" className="card-value efficiency-savings-value">
                    {formatNumber(statistics.averageFuelEfficiency ? 
                      (statistics.averageFuelEfficiency * statistics.totalDistance) / 100 : 0)} ₪
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={4} className="statistics-content">
              {/* Pie Chart */}
              <Grid item xs={12} md={6}>
                <Card className="chart-card">
                  <CardContent>
                    <Typography variant="h6" className="chart-title">
                      Refueling Stations
                    </Typography>
                    <Divider className="chart-divider" />
                    <Box className="chart-container">
                      <PieChart data={statistics.frequentRefuelingStations} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Price Chart */}
              <Grid item xs={12} md={6}>
                <Card className="chart-card">
                  <CardContent>
                    <Typography variant="h6" className="chart-title">
                      Average Price per Liter (NIS) for Each Month
                    </Typography>
                    <Divider className="chart-divider" />
                    <GraphComponent costGraph={graphData.priceGraph || { labels: [], values: [] }} />
                  </CardContent>
                </Card>
              </Grid>

              {/* Statistics Overview */}
              <Grid item xs={12}>
                <Card className="overview-card">
                  <CardContent>
                    <Typography variant="h6" className="overview-title">
                      Statistics Overview
                    </Typography>
                    <Divider className="overview-divider" />
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box className="statistics-list">
                          <FuelStatisticItem 
                            title="Average Fuel Efficiency (km/L)" 
                            value={formatNumber(statistics.averageFuelEfficiency)} 
                          />
                          <FuelStatisticItem 
                            title="Average Distance Between Fill-ups (km)" 
                            value={formatNumber(statistics.averageDistanceBetweenFillups)} 
                          />
                          <FuelStatisticItem 
                            title="Average Distance per Day (km)" 
                            value={formatNumber(statistics.averageDistancePerDay)} 
                          />
                          <FuelStatisticItem 
                            title="Average Liters per Fill-up (liters)" 
                            value={formatNumber(statistics.averageLitersPerFillup)} 
                          />
                          <FuelStatisticItem 
                            title="Average Time Between Refuels" 
                            value={statistics.averageTimeBetweenRefuels} 
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box className="statistics-list">
                          <FuelStatisticItem 
                            title="Average Cost per Fill-up (NIS)" 
                            value={formatNumber(statistics.averageTotalCostPerFillup)} 
                          />
                          <FuelStatisticItem 
                            title="Average Price per Liter (NIS)" 
                            value={formatNumber(statistics.averagePricePerLiter)} 
                          />
                          <FuelStatisticItem 
                            title="Total Fuel Cost (NIS)" 
                            value={formatNumber(statistics.totalFuelCost)} 
                          />
                          <FuelStatisticItem 
                            title="Total Distance (km)" 
                            value={formatNumber(statistics.totalDistance)} 
                          />
                          <FuelStatisticItem 
                            title="Total Liters" 
                            value={formatNumber(statistics.totalLiters)} 
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;