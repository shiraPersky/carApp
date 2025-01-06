import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarForm from '../../components/Cars/CarForm'; 
import { createCar } from '../../services/serviceApi';

const AddCarPage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log('Form data being sent:', data); // Log the data to inspect before submitting
    try {
      await createCar(data); // Create a new car entry
      navigate('/cars'); // Navigate back to the cars list
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  return (
    <div>
      <h2>Add New Car</h2>
      <CarForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddCarPage;
