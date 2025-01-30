// import { useState, useEffect } from 'react';
// import { Car, getCars, deleteCar } from '../../services/serviceApi';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'; // Import axios for making the CSV upload request


// interface ImportResponse {
//   data: Car[]; // Assuming the backend returns an array of cars in a `data` property
// }

// const CarList = () => {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File[]>([]);  // Store files as an array

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const data = await getCars() as Car[];
//         setCars(data);
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       }
//     };
//     fetchCars();
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteCar(id);
//       setCars(cars.filter((car) => car.id !== id));
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFile(Array.from(event.target.files));  // Store all selected files
//     }
//   };

//   const handleImport = async () => {
//     if (!selectedFile || selectedFile.length === 0) {
//       alert('Please select a file to import.');
//       return;
//     }

//     const formData = new FormData();

//     selectedFile.forEach(file => {
//       formData.append('files', file);  // Append each file to the form data
//     });

//     try {
//       const response = await axios.post<ImportResponse>('/csv/import', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert('Cars imported successfully!');
//       setCars((prevCars) => [...prevCars, ...response.data.data]); // Update the cars list
//     } catch (error) {
//       console.error('Error importing cars:', error);
//       alert('Failed to import cars.');
//     }
//   };

//   return (
//     <div>
//       <h2>Your Cars</h2>
//       <div className="car-grid">
//         {/* Grid for cars */}
//         {cars.map((car) => {
//           console.log(car); // Log the car object to check if all fields are available
//           return (
//             <div key={car.id} className="car-card">
//               <Link to={`/cars/details/${car.id}`}>
//                 <h3>{car.make} {car.model} ({car.year})</h3>
//                 <p>License Plate: {car.license_plate}</p>
//                 <p>Color: {car.color}</p>
//                 <p>Emission Group: {car.emission_group}</p>
//                 <p>Last Test: {new Date(car.last_test).toLocaleDateString()}</p>
//                 <p>Valid Until: {new Date(car.valid_until).toLocaleDateString()}</p>
//               </Link>
//               <button onClick={() => handleDelete(car.id)}>Delete</button>
//             </div>
//           );
//         })}

//         {/*Add New Car Button*/}
//         <div className="car-card add-button">
//           <Link to="/cars/add">+</Link>
//         </div>
//       </div>

//       {/* File Upload and Import Button */}
//       <div className="import-section">
//         <h3>Import Cars</h3>
//         <input type="file" accept=".csv" onChange={handleFileChange} multiple />
//         <button onClick={handleImport}>Import</button>
//       </div>
//     </div>
//   );
// };

// export default CarList;



//try2
import { useState, useEffect } from 'react';
import { Car, getCars, deleteCar, updateOdometer } from '../../services/serviceApi';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  Paper,
  Fab,
  Divider,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Speed as SpeedIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const CarPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [newOdometer, setNewOdometer] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars() as Car[];
      setCars(data);
    };
    fetchCars();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car.id !== id));
      setDeleteDialogOpen(false);
      setCarToDelete(null);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleUpdateOdometer = async () => {
    if (!selectedCar || newOdometer === null) return;

    try {
      await updateOdometer(selectedCar.license_plate, newOdometer);
      setCars(cars.map((car) =>
        car.id === selectedCar.id ? { ...car, odometer: newOdometer } : car
      ));
      setIsModalOpen(false);
      setSelectedCar(null);
      setNewOdometer(null);
    } catch (error) {
      console.error('Error updating odometer:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CarIcon fontSize="large" />
            Your Cars
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <CarIcon />
                    </Avatar>
                    <Typography variant="h6">
                      {car.make} {car.model}
                    </Typography>
                  </Box>
                  
                  <Chip 
                    label={car.license_plate}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Year</Typography>
                      <Typography variant="body1">{car.year}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Color</Typography>
                      <Typography variant="body1">{car.color}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Emission Group</Typography>
                      <Typography variant="body1">{car.emission_group || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Valid until: {new Date(car.valid_until).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<SpeedIcon />}
                    onClick={() => {
                      setSelectedCar(car);
                      setIsModalOpen(true);
                    }}
                  >
                    Update Odometer
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    component={Link}
                    to={`/cars/edit/${car.id}`}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      setCarToDelete(car);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add New Car FAB */}
        <Fab
          color="primary"
          component={Link}
          to="/cars/add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
        >
          <AddIcon />
        </Fab>

        {/* Odometer Update Dialog */}
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle>
            Update Odometer
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedCar?.make} {selectedCar?.model} - {selectedCar?.license_plate}
            </Typography>
            <TextField
              autoFocus
              label="New Odometer Reading"
              type="number"
              fullWidth
              value={newOdometer || ''}
              onChange={(e) => setNewOdometer(Number(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateOdometer} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the {carToDelete?.make} {carToDelete?.model}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => carToDelete && handleDelete(carToDelete.id)} 
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default CarPage;
