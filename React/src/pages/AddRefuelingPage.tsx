import React from 'react';
import { useNavigate } from 'react-router-dom';
import RefuelingForm from '../components/RefuelingForm';
import { createRefuel } from '../services/serviceApi';

const AddRefuelingPage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log('Form data being sent:', data); // Log the data to inspect before submitting
    try {
      await createRefuel(data); // Create a new refuel entry
      navigate('/refuels'); // Navigate back to the refuels list
    } catch (error) {
      console.error('Error adding new refuel:', error);
    }
  };

  return (
    <div>
      <h2>Add New Refuel</h2>
      <RefuelingForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddRefuelingPage;
