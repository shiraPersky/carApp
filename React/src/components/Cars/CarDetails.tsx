// import { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { deleteCar } from '../../services/serviceApi'; // Ensure you have the deleteCar function
// import React from 'react';

// const CarDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [car, setCar] = useState<any>(null);
//   const [cars, setCars] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/cars'); // Fetch all cars
//         if (!response.ok) {
//           throw new Error('Failed to fetch cars');
//         }
//         const data = await response.json();
//         setCars(data);
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       }
//     };

//     fetchCars();
//   }, []); // Fetch all cars once on component mount

//   useEffect(() => {
//     // Once cars are fetched, find the car that matches the ID
//     if (id && cars.length > 0) {
//       const foundCar = cars.find((car) => car.id === Number(id));
//       setCar(foundCar || null);
//     }
//   }, [id, cars]);

//   // Handle delete operation
//   const handleDelete = async () => {
//     try {
//       await deleteCar(Number(id)); // Call deleteCar function
//       navigate('/cars');
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   if (!car) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Car Details</h2>
//       <p>License Plate: {car.license_plate}</p>
//       <p>Make: {car.make}</p>
//       <p>Model: {car.model}</p>
//       <p>Year: {car.year}</p>
//       <p>Color: {car.color}</p>
//       <p>Emission Group: {car.emission_group || 'N/A'}</p>
//       <p>Valid Until: {new Date(car.valid_until).toLocaleDateString()}</p>
//       <p>Trim Level: {car.trim_level || 'N/A'}</p>
//       <p>Last Test: {new Date(car.last_test).toLocaleDateString()}</p>
//       <p>Model Type: {car.model_type}</p>
//       <p>Model Number: {car.model_number}</p>

//       <div>
//         <Link to={`/cars/edit/${car.id}`}>Edit</Link>
//         <button onClick={handleDelete}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteCar } from '../../services/serviceApi';
import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (id && cars.length > 0) {
      const foundCar = cars.find((car) => car.id === Number(id));
      setCar(foundCar || null);
    }
  }, [id, cars]);

  const handleDelete = async () => {
    try {
      await deleteCar(Number(id));
      setDeleteDialogOpen(false);
      navigate('/cars');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (!car) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Car Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to={`/cars/edit/${car.id}`}
              variant="contained"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          <DetailItem label="License Plate" value={car.license_plate} />
          <DetailItem label="Make" value={car.make} />
          <DetailItem label="Model" value={car.model} />
          <DetailItem label="Year" value={car.year} />
          <DetailItem label="Color" value={car.color} />
          <DetailItem label="Emission Group" value={car.emission_group || 'N/A'} />
          <DetailItem label="Valid Until" value={new Date(car.valid_until).toLocaleDateString()} />
          <DetailItem label="Trim Level" value={car.trim_level || 'N/A'} />
          <DetailItem label="Last Test" value={new Date(car.last_test).toLocaleDateString()} />
          <DetailItem label="Model Type" value={car.model_type} />
          <DetailItem label="Model Number" value={car.model_number} />
        </Grid>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this car?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
  <Grid item xs={12} sm={6}>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Grid>
);

export default CarDetails;