// import { useState, useEffect } from 'react';
// import { Car, getCars } from '../services/serviceApi';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { FaCarAlt, FaWrench, FaGasPump, FaChartLine, FaBell } from 'react-icons/fa';
// import '../styles/HomePage.css'; // Import the CSS file
// import React from 'react';

// const HomePage = () => {
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [cars, setCars] = useState<Car[]>([]);
//   const { carId } = useParams();
//   const navigate = useNavigate();

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

//   const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const carId = parseInt(event.target.value);
//     const car = cars.find(c => c.id === carId);
//     if (car) {
//       setSelectedCar(car);
//       navigate(`/home/${carId}`);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="home-container">
//       <div className="car-selection">
//         <label htmlFor="car-select">Select Car:</label>
//         <select 
//           id="car-select" 
//           value={selectedCar?.id || ''} 
//           onChange={handleCarChange}
//         >
//           {cars.map(car => (
//             <option key={car.id} value={car.id}>
//               {car.license_plate} - {car.make} {car.model}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedCar && (
//         <div className="car-details-card">
//           <h2>{selectedCar.make} {selectedCar.model}</h2>
//           <div className="car-info-grid">
//             <div className="car-info-item">
//               <span className="info-label">License Plate:</span>
//               <span className="info-value">{selectedCar.license_plate}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Year:</span>
//               <span className="info-value">{selectedCar.year}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Color:</span>
//               <span className="info-value">{selectedCar.color}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Odometer:</span>
//               <span className="info-value">{selectedCar.odometer} km</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Valid Until:</span>
//               <span className="info-value">{formatDate(selectedCar.valid_until)}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Last Test:</span>
//               <span className="info-value">{formatDate(selectedCar.last_test)}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="navigation-tiles">
//         <Link to="/reminders" className="nav-tile">
//           <FaBell className="nav-icon"/>
//           <span className="nav-label">Reminders</span>
//         </Link>
//         <Link to="/services" className="nav-tile">
//           <FaWrench className="nav-icon"/>
//           <span className="nav-label">Services</span>
//         </Link>
//         <Link to="/refuels" className="nav-tile">
//           <FaGasPump className="nav-icon"/>
//           <span className="nav-label">Refuel</span>
//         </Link>
//         <Link to="/fuel-statistics" className="nav-tile">
//           <FaChartLine className="nav-icon"/>
//           <span className="nav-label">Fuel Statistics</span>
//         </Link>
//       </div>
      
      
//     </div>
    
//   );

  
// };

// export default HomePage;



// import { useState, useEffect } from 'react';
// import { Car, getCars, getFuelStatistics } from '../services/serviceApi';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { FaCarAlt, FaWrench, FaGasPump, FaChartLine, FaBell } from 'react-icons/fa';
// import '../styles/HomePage.css';
// import React from 'react';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import { Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
// import PieChart from '../components/fuelStatistics/PieChart';

// // FuelStatistics type from FuelStatisticsPage
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

// const HomePage = () => {
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [cars, setCars] = useState<Car[]>([]);
//   const { carId } = useParams();
//   const navigate = useNavigate();
//   const [statistics, setStatistics] = useState<FuelStatistics | null>(null);
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

//   // Fetch fuel statistics (last month only) when selected car changes
//   useEffect(() => {
//     if (selectedCar) {
//       fetchStatistics();
//     }
//   }, [selectedCar]);

//   const fetchStatistics = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // We'll always fetch 'lastMonth' statistics for the homepage summary
//       const response = await getFuelStatistics('lastMonth', '', '');
//       setStatistics(response);
//     } catch (error) {
//       setError("Error fetching statistics. Please try again later.");
//       console.error("Error fetching statistics:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const carId = parseInt(event.target.value);
//     const car = cars.find(c => c.id === carId);
//     if (car) {
//       setSelectedCar(car);
//       navigate(`/home/${carId}`);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const formatNumber = (num) => {
//     if (num === undefined || num === null) return '-';
//     return num.toFixed(2);
//   };

//   return (
//     <div className="home-container">
//       <div className="car-selection">
//         <label htmlFor="car-select">Select Car:</label>
//         <select 
//           id="car-select" 
//           value={selectedCar?.id || ''} 
//           onChange={handleCarChange}
//         >
//           {cars.map(car => (
//             <option key={car.id} value={car.id}>
//               {car.license_plate} - {car.make} {car.model}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedCar && (
//         <div className="car-details-card">
//           <h2>{selectedCar.make} {selectedCar.model}</h2>
//           <div className="car-info-grid">
//             <div className="car-info-item">
//               <span className="info-label">License Plate:</span>
//               <span className="info-value">{selectedCar.license_plate}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Year:</span>
//               <span className="info-value">{selectedCar.year}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Color:</span>
//               <span className="info-value">{selectedCar.color}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Odometer:</span>
//               <span className="info-value">{selectedCar.odometer} km</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Valid Until:</span>
//               <span className="info-value">{formatDate(selectedCar.valid_until)}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Last Test:</span>
//               <span className="info-value">{formatDate(selectedCar.last_test)}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="navigation-tiles">
//         <Link to="/reminders" className="nav-tile">
//           <FaBell className="nav-icon"/>
//           <span className="nav-label">Reminders</span>
//         </Link>
//         <Link to="/services" className="nav-tile">
//           <FaWrench className="nav-icon"/>
//           <span className="nav-label">Services</span>
//         </Link>
//         <Link to="/refuels" className="nav-tile">
//           <FaGasPump className="nav-icon"/>
//           <span className="nav-label">Refuel</span>
//         </Link>
//         <Link to="/fuel-statistics" className="nav-tile">
//           <FaChartLine className="nav-icon"/>
//           <span className="nav-label">Fuel Statistics</span>
//         </Link>
//       </div>
      
//       {/* Fuel Statistics Summary Section */}
//       <div className="fuel-statistics-summary">
//         <Typography variant="h5" component="h2" className="section-title">
//           Fuel Statistics for Last Month
//         </Typography>
        
//         {loading ? (
//           <Box className="loading-container" sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Paper className="error-message" sx={{ p: 2, my: 2 }}>
//             {error}
//           </Paper>
//         ) : statistics && (
//           <>
//             {/* Summary Cards Row */}
//             <Grid container spacing={2} className="summary-cards" sx={{ mb: 3 }}>
//               <Grid item xs={12} md={4}>
//                 <Paper className="summary-card fuel-cost" sx={{ p: 2 }}>
//                   <Box className="card-header" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <LocalGasStationIcon className="card-icon" sx={{ mr: 1 }} />
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
//                 <Paper className="summary-card total-distance" sx={{ p: 2 }}>
//                   <Box className="card-header" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <DirectionsCarIcon className="card-icon" sx={{ mr: 1 }} />
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
//                 <Paper className="summary-card efficiency-savings" sx={{ p: 2 }}>
//                   <Box className="card-header" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <MonetizationOnIcon className="card-icon" sx={{ mr: 1 }} />
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
            
//             {/* Pie Chart and Statistics Overview in a Grid */}
//             <Grid container spacing={3}>
//               {/* Left Side: Pie Chart */}
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     Refueling Stations
//                   </Typography>
//                   <Box sx={{ height: 250 }}>
//                     <PieChart data={statistics.frequentRefuelingStations} />
//                   </Box>
//                 </Paper>
//               </Grid>
              
//               {/* Right Side: Key Statistics */}
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     Key Statistics
//                   </Typography>
//                   <div className="statistics-grid">
//                     <div className="statistic-row">
//                       <span className="statistic-label">Average Fuel Efficiency:</span>
//                       <span className="statistic-value">{formatNumber(statistics.averageFuelEfficiency)} km/L</span>
//                     </div>
//                     <div className="statistic-row">
//                       <span className="statistic-label">Average Price per Liter:</span>
//                       <span className="statistic-value">{formatNumber(statistics.averagePricePerLiter)} ₪</span>
//                     </div>
//                     <div className="statistic-row">
//                       <span className="statistic-label">Average Distance per Day:</span>
//                       <span className="statistic-value">{formatNumber(statistics.averageDistancePerDay)} km</span>
//                     </div>
//                     <div className="statistic-row">
//                       <span className="statistic-label">Average Cost per Fill-up:</span>
//                       <span className="statistic-value">{formatNumber(statistics.averageTotalCostPerFillup)} ₪</span>
//                     </div>
//                     <div className="statistic-row">
//                       <span className="statistic-label">Total Liters:</span>
//                       <span className="statistic-value">{formatNumber(statistics.totalLiters)} L</span>
//                     </div>
//                   </div>
//                 </Paper>
//               </Grid>
//             </Grid>
            
//             {/* Link to Full Statistics */}
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//               <Link to="/fuel-statistics" className="view-full-stats-button">
//                 View Full Statistics
//               </Link>
//             </Box>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;




// import { useState, useEffect } from 'react';
// import { Car, getCars, getFuelStatistics } from '../services/serviceApi';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { FaCarAlt, FaWrench, FaGasPump, FaChartLine, FaBell } from 'react-icons/fa';
// import '../styles/HomePage.css';
// import React from 'react';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import { Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
// import PieChart from '../components/fuelStatistics/PieChart';

// // FuelStatistics type from FuelStatisticsPage
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

// const HomePage = () => {
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [cars, setCars] = useState<Car[]>([]);
//   const { carId } = useParams();
//   const navigate = useNavigate();
//   const [statistics, setStatistics] = useState<FuelStatistics | null>(null);
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

//   // Fetch fuel statistics (last month only) when selected car changes
//   useEffect(() => {
//     if (selectedCar) {
//       fetchStatistics();
//     }
//   }, [selectedCar]);

//   const fetchStatistics = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // We'll always fetch 'lastMonth' statistics for the homepage summary
//       const response = await getFuelStatistics('lastMonth', '', '');
//       setStatistics(response);
//     } catch (error) {
//       setError("Error fetching statistics. Please try again later.");
//       console.error("Error fetching statistics:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const carId = parseInt(event.target.value);
//     const car = cars.find(c => c.id === carId);
//     if (car) {
//       setSelectedCar(car);
//       navigate(`/home/${carId}`);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const formatNumber = (num) => {
//     if (num === undefined || num === null) return '-';
//     return num.toFixed(2);
//   };

//   return (
//     <div className="home-container">
//       {/* Original Car Selection */}
//       <div className="car-selection">
//         <label htmlFor="car-select">Select Car:</label>
//         <select 
//           id="car-select" 
//           value={selectedCar?.id || ''} 
//           onChange={handleCarChange}
//         >
//           {cars.map(car => (
//             <option key={car.id} value={car.id}>
//               {car.license_plate} - {car.make} {car.model}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Original Car Details */}
//       {selectedCar && (
//         <div className="car-details-card">
//           <h2>{selectedCar.make} {selectedCar.model}</h2>
//           <div className="car-info-grid">
//             <div className="car-info-item">
//               <span className="info-label">License Plate:</span>
//               <span className="info-value">{selectedCar.license_plate}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Year:</span>
//               <span className="info-value">{selectedCar.year}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Color:</span>
//               <span className="info-value">{selectedCar.color}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Odometer:</span>
//               <span className="info-value">{selectedCar.odometer} km</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Valid Until:</span>
//               <span className="info-value">{formatDate(selectedCar.valid_until)}</span>
//             </div>
//             <div className="car-info-item">
//               <span className="info-label">Last Test:</span>
//               <span className="info-value">{formatDate(selectedCar.last_test)}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Original Navigation Tiles */}
//       <div className="navigation-tiles">
//         <Link to="/reminders" className="nav-tile">
//           <FaBell className="nav-icon"/>
//           <span className="nav-label">Reminders</span>
//         </Link>
//         <Link to="/services" className="nav-tile">
//           <FaWrench className="nav-icon"/>
//           <span className="nav-label">Services</span>
//         </Link>
//         <Link to="/refuels" className="nav-tile">
//           <FaGasPump className="nav-icon"/>
//           <span className="nav-label">Refuel</span>
//         </Link>
//         <Link to="/fuel-statistics" className="nav-tile">
//           <FaChartLine className="nav-icon"/>
//           <span className="nav-label">Fuel Statistics</span>
//         </Link>
//       </div>
      
//       {/* NEW: Fuel Statistics Summary Section */}
//       <div className="fuel-stats-summary">
//         <h3 className="stats-header">Fuel Statistics for Last Month</h3>
        
//         {loading ? (
//           <div className="loading-spinner">
//             <CircularProgress />
//           </div>
//         ) : error ? (
//           <div className="error-message">
//             {error}
//           </div>
//         ) : statistics && (
//           <>
//             {/* Summary Cards */}
//             <div className="stats-cards">
//               <div className="stats-card">
//                 <div className="stats-card-header">
//                   <LocalGasStationIcon className="stats-icon" />
//                   <span>Total Fuel Cost</span>
//                 </div>
//                 <div className="stats-card-value">
//                   {formatNumber(statistics.totalFuelCost)} ₪
//                 </div>
//               </div>
              
//               <div className="stats-card">
//                 <div className="stats-card-header">
//                   <DirectionsCarIcon className="stats-icon" />
//                   <span>Total Distance</span>
//                 </div>
//                 <div className="stats-card-value">
//                   {formatNumber(statistics.totalDistance)} km
//                 </div>
//               </div>
              
//               <div className="stats-card">
//                 <div className="stats-card-header">
//                   <MonetizationOnIcon className="stats-icon" />
//                   <span>Efficiency Savings</span>
//                 </div>
//                 <div className="stats-card-value">
//                   {formatNumber(statistics.averageFuelEfficiency ? 
//                     (statistics.averageFuelEfficiency * statistics.totalDistance) / 100 : 0)} ₪
//                 </div>
//               </div>
//             </div>
            
//             {/* Charts and Stats */}
//             <div className="stats-details">
//               <div className="stats-pie-chart">
//                 <h4>Refueling Stations</h4>
//                 <div className="chart-container">
//                   <PieChart data={statistics.frequentRefuelingStations} />
//                 </div>
//               </div>
              
//               <div className="stats-overview">
//                 <h4>Statistics Overview</h4>
//                 <div className="stats-list">
//                   <div className="stats-item">
//                     <span className="stats-label">Average Fuel Efficiency (km/L):</span>
//                     <span className="stats-value">{formatNumber(statistics.averageFuelEfficiency)}</span>
//                   </div>
//                   <div className="stats-item">
//                     <span className="stats-label">Average Price per Liter (NIS):</span>
//                     <span className="stats-value">{formatNumber(statistics.averagePricePerLiter)}</span>
//                   </div>
//                   <div className="stats-item">
//                     <span className="stats-label">Average Cost per Fill-up (NIS):</span>
//                     <span className="stats-value">{formatNumber(statistics.averageTotalCostPerFillup)}</span>
//                   </div>
//                   <div className="stats-item">
//                     <span className="stats-label">Average Distance Between Fill-ups (km):</span>
//                     <span className="stats-value">{formatNumber(statistics.averageDistanceBetweenFillups)}</span>
//                   </div>
//                   <div className="stats-item">
//                     <span className="stats-label">Average Distance per Day (km):</span>
//                     <span className="stats-value">{formatNumber(statistics.averageDistancePerDay)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import { useState, useEffect } from 'react';
import { Car, getCars, getFuelStatistics } from '../services/serviceApi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaCarAlt, FaWrench, FaGasPump, FaChartLine, FaBell, FaHome, FaArrowLeft } from 'react-icons/fa';
import '../styles/HomePage.css';
import React from 'react';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Typography, Box, Paper, Grid, CircularProgress, Button } from '@mui/material';
import PieChart from '../components/fuelStatistics/PieChart';

// FuelStatistics type from FuelStatisticsPage
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

  // Fetch fuel statistics (last month only) when selected car changes
  useEffect(() => {
    if (selectedCar) {
      fetchStatistics();
    }
  }, [selectedCar]);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      // We'll always fetch 'lastMonth' statistics for the homepage summary
      const response = await getFuelStatistics('lastMonth', '', '');
      setStatistics(response);
    } catch (error) {
      setError("Error fetching statistics. Please try again later.");
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
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

  const handleBackToCars = () => {
    navigate('/cars');
  };

  return (
    <div className="home-container">
      {/* Back to Cars Button and Car Selection in a row */}
      <div className="home-header">
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
        <button className="back-to-cars-btn" onClick={handleBackToCars}>
          <FaArrowLeft /> Back to Cars
        </button>
      </div>

      {/* Original Car Details */}
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

      {/* Original Navigation Tiles */}
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
      
      {/* Fuel Statistics Summary Section */}
      <div className="fuel-stats-summary">
        <h3 className="stats-header">Fuel Statistics for Last Month</h3>
        
        {loading ? (
          <div className="loading-spinner">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
          </div>
        ) : statistics && (
          <>
            {/* Summary Cards */}
            <div className="stats-cards">
              <div className="stats-card">
                <div className="stats-card-header">
                  <LocalGasStationIcon className="stats-icon" />
                  <span>Total Fuel Cost</span>
                </div>
                <div className="stats-card-value">
                  {formatNumber(statistics.totalFuelCost)} ₪
                </div>
              </div>
              
              <div className="stats-card">
                <div className="stats-card-header">
                  <DirectionsCarIcon className="stats-icon" />
                  <span>Total Distance</span>
                </div>
                <div className="stats-card-value">
                  {formatNumber(statistics.totalDistance)} km
                </div>
              </div>
              
              <div className="stats-card">
                <div className="stats-card-header">
                  <MonetizationOnIcon className="stats-icon" />
                  <span>Efficiency Savings</span>
                </div>
                <div className="stats-card-value">
                  {formatNumber(statistics.averageFuelEfficiency ? 
                    (statistics.averageFuelEfficiency * statistics.totalDistance) / 100 : 0)} ₪
                </div>
              </div>
            </div>
            
            {/* Charts and Stats */}
            <div className="stats-details">
              <div className="stats-pie-chart">
                <h4>Refueling Stations</h4>
                <div className="chart-container">
                  <PieChart data={statistics.frequentRefuelingStations} />
                </div>
              </div>
              
              <div className="stats-overview">
                <h4>Statistics Overview</h4>
                <div className="stats-list">
                  <div className="stats-item">
                    <span className="stats-label">Average Fuel Efficiency (km/L):</span>
                    <span className="stats-value">{formatNumber(statistics.averageFuelEfficiency)}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Average Price per Liter (NIS):</span>
                    <span className="stats-value">{formatNumber(statistics.averagePricePerLiter)}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Average Cost per Fill-up (NIS):</span>
                    <span className="stats-value">{formatNumber(statistics.averageTotalCostPerFillup)}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Average Distance Between Fill-ups (km):</span>
                    <span className="stats-value">{formatNumber(statistics.averageDistanceBetweenFillups)}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Average Distance per Day (km):</span>
                    <span className="stats-value">{formatNumber(statistics.averageDistancePerDay)}</span>
                  </div>
                </div>
              </div>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;