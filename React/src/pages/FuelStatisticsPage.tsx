// import { useState, useEffect } from 'react';
// import { Car, getCars, getFuelStatistics } from '../services/serviceApi';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import '../styles/FuelStatisticsPage.css';
// import React from 'react';
// import PieChart from '../components/fuelStatistics/PieChart';
// import GraphComponent from '../components/fuelStatistics/GraphComponent';
// import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import SavingsIcon from '@mui/icons-material/Savings';
// import { Typography, Box, Paper, Grid, Card, CardContent, Divider, CircularProgress, Button } from '@mui/material';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


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
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [cars, setCars] = useState<Car[]>([]);
//   const { carId } = useParams();
//   const navigate = useNavigate();
//   const [statistics, setStatistics] = useState<FuelStatistics | null>(null);
//   const [graphData, setGraphData] = useState<any>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       const data = await getCars() as Car[];
//       setCars(data);
      
//       if (carId) {
//         const car = data.find(c => c.id === parseInt(carId));
//         if (car) {
//           setSelectedCar(car);
//         } else if (data.length > 0) {
//           // If no car is specified or specified car not found, select the first car
//           setSelectedCar(data[0]);
//         }
//       } else if (data.length > 0) {
//         // If no car ID is provided, select the first car
//         setSelectedCar(data[0]);
//       }
//     };
    
//     fetchCars();
//   }, [carId]);

//   useEffect(() => {
//     async function fetchLastMonthStatistics() {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getFuelStatistics('Last Month', '', '');
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

//     const fetchGraphData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/fuel-statistics/graph-data?timePeriod=Last Month`);
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

//     fetchLastMonthStatistics();
//     fetchGraphData();
//   }, []);

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

//   const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const carId = parseInt(event.target.value);
//     const car = cars.find(c => c.id === carId);
//     if (car) {
//       setSelectedCar(car);
//       navigate(`/fuel-statistics/${carId}`);
//     }
//   };

//   const formatNumber = (num) => {
//     if (num === undefined || num === null) return '-';
//     return num.toFixed(2);
//   };

//   const goBack = () => {
//     navigate('/home');
//   };

//   return (
//     <div className="fuel-statistics-container">
//       {/* Header with back button and car selector */}
//       <div className="fuel-statistics-header">
//         <Button 
//           variant="outlined" 
//           startIcon={<FaArrowLeft />} 
//           onClick={goBack}
//           className="back-button"
//         >
//           Back to Home
//         </Button>
        
//       </div>

//       {/* Page title */}
//       <Typography variant="h4" component="h1" className="page-title" gutterBottom>
//         Fuel Statistics
//       </Typography>

//       {/* Car brief info */}
//       {selectedCar && (
//         <Paper className="car-brief-info" elevation={1}>
//           <Typography variant="h6">
//             {selectedCar.make} {selectedCar.model} ({selectedCar.license_plate})
//           </Typography>
//         </Paper>
//       )}

//       {/* Statistics Section */}
//       <div className="statistics-section">
//         <Typography variant="h5" component="h2" className="section-title">
//           Statistics for Last Month
//         </Typography>

//         {loading ? (
//           <Box className="loading-container">
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Paper className="error-message">
//             {error}
//           </Paper>
//         ) : statistics && (
//           <>
//             {/* Summary Cards Row */}
//             <Grid container spacing={2} className="summary-cards">
//               <Grid item xs={12} md={4}>
//                 <Paper className="summary-card fuel-cost">
//                   <Box className="card-header">
//                     <LocalGasStationIcon className="card-icon" />
//                     <Typography variant="subtitle1" className="card-subtitle">
//                       Total Fuel Cost
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" className="card-value fuel-cost-value">
//                     {formatNumber(statistics.totalFuelCost)} ₪
//                   </Typography>
//                 </Paper>
//               </Grid>
              
//               <Grid item xs={12} md={4}>
//                 <Paper className="summary-card total-distance">
//                   <Box className="card-header">
//                     <DirectionsCarIcon className="card-icon" />
//                     <Typography variant="subtitle1" className="card-subtitle">
//                       Total Distance
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" className="card-value total-distance-value">
//                     {formatNumber(statistics.totalDistance)} km
//                   </Typography>
//                 </Paper>
//               </Grid>
              
//               <Grid item xs={12} md={4}>
//                 <Paper className="summary-card efficiency-savings">
//                   <Box className="card-header">
//                     <MonetizationOnIcon  className="card-icon" />
//                     <Typography variant="subtitle1" className="card-subtitle">
//                       Efficiency Savings
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" className="card-value efficiency-savings-value">
//                     {formatNumber(statistics.averageFuelEfficiency ? 
//                       (statistics.averageFuelEfficiency * statistics.totalDistance) / 100 : 0)} ₪
//                   </Typography>
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Grid container spacing={4} className="statistics-content">
//               {/* Pie Chart */}
//               <Grid item xs={12} md={6}>
//                 <Card className="chart-card">
//                   <CardContent>
//                     <Typography variant="h6" className="chart-title">
//                       Refueling Stations
//                     </Typography>
//                     <Divider className="chart-divider" />
//                     <Box className="chart-container">
//                       <PieChart data={statistics.frequentRefuelingStations} />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               {/* Price Chart */}
//               <Grid item xs={12} md={6}>
//                 <Card className="chart-card">
//                   <CardContent>
//                     <Typography variant="h6" className="chart-title">
//                       Average Price per Liter (NIS) for Each Month
//                     </Typography>
//                     <Divider className="chart-divider" />
//                     <GraphComponent costGraph={graphData.priceGraph || { labels: [], values: [] }} />
//                   </CardContent>
//                 </Card>
//               </Grid>

//               {/* Statistics Overview */}
//               <Grid item xs={12}>
//                 <Card className="overview-card">
//                   <CardContent>
//                     <Typography variant="h6" className="overview-title">
//                       Statistics Overview
//                     </Typography>
//                     <Divider className="overview-divider" />
                    
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={6}>
//                         <Box className="statistics-list">
//                           <FuelStatisticItem 
//                             title="Average Fuel Efficiency (km/L)" 
//                             value={formatNumber(statistics.averageFuelEfficiency)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Average Distance Between Fill-ups (km)" 
//                             value={formatNumber(statistics.averageDistanceBetweenFillups)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Average Distance per Day (km)" 
//                             value={formatNumber(statistics.averageDistancePerDay)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Average Liters per Fill-up (liters)" 
//                             value={formatNumber(statistics.averageLitersPerFillup)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Average Time Between Refuels" 
//                             value={statistics.averageTimeBetweenRefuels} 
//                           />
//                         </Box>
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <Box className="statistics-list">
//                           <FuelStatisticItem 
//                             title="Average Cost per Fill-up (NIS)" 
//                             value={formatNumber(statistics.averageTotalCostPerFillup)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Average Price per Liter (NIS)" 
//                             value={formatNumber(statistics.averagePricePerLiter)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Total Fuel Cost (NIS)" 
//                             value={formatNumber(statistics.totalFuelCost)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Total Distance (km)" 
//                             value={formatNumber(statistics.totalDistance)} 
//                           />
//                           <FuelStatisticItem 
//                             title="Total Liters" 
//                             value={formatNumber(statistics.totalLiters)} 
//                           />
//                         </Box>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FuelStatisticsPage;



import { useState, useEffect } from 'react';
import { Car, getCars, getFuelStatistics } from '../services/serviceApi';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/FuelStatisticsPage.css';
import React from 'react';
import PieChart from '../components/fuelStatistics/PieChart';
import GraphComponent from '../components/fuelStatistics/GraphComponent';
import FuelStatisticItem from '../components/fuelStatistics/FuelStatisticItem';
import DropdownMenu from '../components/fuelStatistics/DropdownMenu';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SavingsIcon from '@mui/icons-material/Savings';
import { Typography, Box, Paper, Grid, Card, CardContent, Divider, CircularProgress, Button } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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

const FuelStatisticsPage = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const { carId } = useParams();
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<FuelStatistics | null>(null);
  const [graphData, setGraphData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState('lastMonth');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAllGraphs, setShowAllGraphs] = useState(false);

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
    fetchStatistics();
  }, [timePeriod, startDate, endDate]);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFuelStatistics(timePeriod, startDate, endDate);
      setStatistics(response);
      await fetchGraphData();
    } catch (error) {
      setError("Error fetching statistics. Please try again later.");
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGraphData = async () => {
    try {
      let url = `http://localhost:3000/fuel-statistics/graph-data?timePeriod=${timePeriod}`;
      
      if (timePeriod === 'customDates' && startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      
      const response = await fetch(url);
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

  const handleTimePeriodChange = (newTimePeriod: string, newStartDate?: string, newEndDate?: string) => {
    setTimePeriod(newTimePeriod);
    
    if (newStartDate && newEndDate) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    } else {
      setStartDate('');
      setEndDate('');
    }
  };

  // const mapGraphData = (graphData) => {
  //   if (!graphData || !Array.isArray(graphData)) {
  //     console.log("Invalid graph data:", graphData);
  //     return { labels: ['Current'], values: [0] };
  //   }

  //   const labels = graphData.map(item => {
  //     const date = new Date(item.date);
  //     return date.toLocaleDateString();
  //   });

  //   const values = graphData.map(item =>
  //     Number(item.efficiency ?? item.distance ?? item.distancePerDay ?? item.liters ?? item.cost ?? item.price ?? 0)
  //   );

  //   return { labels, values };
  // };

  const mapGraphData = (graphData: any) => {
  if (!graphData || !Array.isArray(graphData)) {
    console.log("Invalid graph data:", graphData);
    return { labels: ['No Data'], values: [0] };
  }

  // Sort data by date
  const sortedData = [...graphData].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Group data by month-year to reduce crowding
  const monthlyData: Record<string, { sum: number, count: number }> = {};
  
  sortedData.forEach((item: any) => {
    const date = new Date(item.date);
    const monthYear = date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    
    // Find which value to use (efficiency, distance, etc.)
    const value = Number(
      item.efficiency ?? item.distance ?? item.distancePerDay ?? 
      item.liters ?? item.cost ?? item.price ?? 0
    );
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        sum: value,
        count: 1
      };
    } else {
      monthlyData[monthYear].sum += value;
      monthlyData[monthYear].count += 1;
    }
  });
  
  // Convert to arrays for chart.js
  const labels = Object.keys(monthlyData);
  const values = Object.values(monthlyData).map(data => 
    parseFloat((data.sum / data.count).toFixed(2))
  );

  return { labels, values };
};

  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = parseInt(event.target.value);
    const car = cars.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
      navigate(`/fuel-statistics/${carId}`);
    }
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toFixed(2);
  };

  const goBack = () => {
    navigate('/home');
  };

  const toggleShowAllGraphs = () => {
    setShowAllGraphs(!showAllGraphs);
  };

  // Format the time period title for display
  const getTimePeriodTitle = () => {
    switch (timePeriod) {
      case 'allTime': return 'All Time';
      case 'thisMonth': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'thisYear': return 'This Year';
      case 'lastYear': return 'Last Year';
      case 'customDates': return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
      default: return 'Last Month';
    }
  };

  return (
    <div className="fuel-statistics-container">
      {/* Header with back button and car selector */}
      <div className="fuel-statistics-header">
        <Button 
          variant="outlined" 
          startIcon={<FaArrowLeft />} 
          onClick={goBack}
          className="back-button"
        >
          Back to Home
        </Button>
      </div>

      {/* Page title */}
      <Typography variant="h4" component="h1" className="page-title" gutterBottom>
        Fuel Statistics
      </Typography>

      {/* Car brief info */}
      {selectedCar && (
        <Paper className="car-brief-info" elevation={1}>
          <Typography variant="h6">
            {selectedCar.make} {selectedCar.model} ({selectedCar.license_plate})
          </Typography>
        </Paper>
      )}

      {/* Time Period Selector */}
      <Box sx={{ mb: 4, mt: 2, maxWidth: 400 }}>
        <DropdownMenu onTimePeriodChange={handleTimePeriodChange} />
      </Box>

      {/* Statistics Section */}
      <div className="statistics-section">
        <Typography variant="h5" component="h2" className="section-title">
          Statistics for {getTimePeriodTitle()}
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
                    <MonetizationOnIcon className="card-icon" />
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
                      Average Price per Liter (NIS)
                    </Typography>
                    <Divider className="chart-divider" />
                    <GraphComponent priceGraph={graphData.priceGraph || { labels: [], values: [] }} />
                  </CardContent>
                </Card>
              </Grid>

              {/* Button to show/hide additional graphs */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={toggleShowAllGraphs}
                  >
                    {showAllGraphs ? 'Hide Additional Graphs' : 'Show Additional Graphs'}
                  </Button>
                </Box>
              </Grid>

              {/* Additional Graphs */}
              {showAllGraphs && (
                <>
                  <Grid item xs={12} md={6}>
                    <Card className="chart-card">
                      <CardContent>
                        <Typography variant="h6" className="chart-title">
                          Fuel Efficiency (km/L)
                        </Typography>
                        <Divider className="chart-divider" />
                        <GraphComponent efficiencyGraph={graphData.efficiencyGraph || { labels: [], values: [] }} />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card className="chart-card">
                      <CardContent>
                        <Typography variant="h6" className="chart-title">
                          Distance Between Fill-ups (km)
                        </Typography>
                        <Divider className="chart-divider" />
                        <GraphComponent distanceGraph={graphData.distanceGraph || { labels: [], values: [] }} />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card className="chart-card">
                      <CardContent>
                        <Typography variant="h6" className="chart-title">
                          Average Distance per Day (km)
                        </Typography>
                        <Divider className="chart-divider" />
                        <GraphComponent distancePerDayGraph={graphData.distancePerDayGraph || { labels: [], values: [] }} />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card className="chart-card">
                      <CardContent>
                        <Typography variant="h6" className="chart-title">
                          Average Liters per Fill-up
                        </Typography>
                        <Divider className="chart-divider" />
                        <GraphComponent litersGraph={graphData.litersGraph || { labels: [], values: [] }} />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card className="chart-card">
                      <CardContent>
                        <Typography variant="h6" className="chart-title">
                          Average Cost per Fill-up (NIS)
                        </Typography>
                        <Divider className="chart-divider" />
                        <GraphComponent costGraph={graphData.costGraph || { labels: [], values: [] }} />
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}

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

export default FuelStatisticsPage;