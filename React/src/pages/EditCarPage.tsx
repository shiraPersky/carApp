import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarForm from '../components/CarForm'; // Assuming you have a CarForm component
import { updateCar } from '../services/serviceApi';

const EditCarPage = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<any[]>([]);

  // Fetch all cars and then find the specific one by ID
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

  // Once cars are fetched, find the specific car by ID
  useEffect(() => {
    if (id && cars.length > 0) {
      const foundCar = cars.find((car) => car.id === Number(id));
      setCar(foundCar || null);
      setLoading(false); // Stop loading when the car is found
    }
  }, [id, cars]); // Only run when cars or id change

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log("Submitting update with data:", data); // Log data being sent to API
    try {
      const { id, ...carData } = data;  // Remove id from data if it's part of the form data
      await updateCar(Number(id), carData); // Update the car by ID
      navigate('/cars'); // Navigate back to the cars list
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div>
      <h2>Edit Car</h2>
      <CarForm existingCar={car} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditCarPage;
