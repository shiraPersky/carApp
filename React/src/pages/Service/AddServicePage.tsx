import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceForm from '../../components/Service/ServiceForm';
import { createService } from '../../services/serviceApi';

const AddServicePage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log('Form data being sent:', data); // Log the data to inspect before submitting
    try {
      await createService(data);
      navigate('/services'); // Navigate back to the services list
    } catch (error) {
      console.error('Error adding new service:', error);
    }
  };

  return (
    <div>
      <h2>Add New Service</h2>
      <ServiceForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddServicePage;
