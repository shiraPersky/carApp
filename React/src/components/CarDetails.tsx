import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteCar } from '../services/serviceApi'; // Ensure you have the deleteCar function
import React from 'react';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars'); // Fetch all cars
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
  }, []); // Fetch all cars once on component mount

  useEffect(() => {
    // Once cars are fetched, find the car that matches the ID
    if (id && cars.length > 0) {
      const foundCar = cars.find((car) => car.id === Number(id));
      setCar(foundCar || null);
    }
  }, [id, cars]);

  // Handle delete operation
  const handleDelete = async () => {
    try {
      await deleteCar(Number(id)); // Call deleteCar function
      navigate('/cars');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h2>Car Details</h2>
      <p>License Plate: {car.license_plate}</p>
      <p>Make: {car.make}</p>
      <p>Model: {car.model}</p>
      <p>Year: {car.year}</p>
      <p>Color: {car.color}</p>
      <p>Emission Group: {car.emission_group || 'N/A'}</p>
      <p>Valid Until: {new Date(car.valid_until).toLocaleDateString()}</p>
      <p>Trim Level: {car.trim_level || 'N/A'}</p>
      <p>Last Test: {new Date(car.last_test).toLocaleDateString()}</p>
      <p>Model Type: {car.model_type}</p>
      <p>Model Number: {car.model_number}</p>

      <div>
        <Link to={`/cars/edit/${car.id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default CarDetails;
