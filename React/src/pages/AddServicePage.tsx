import { useState } from 'react'; // To manage the state of the form.
import { createService } from '../services/serviceApi'; // To interact with the backend to create a new service.
import { useNavigate } from 'react-router-dom'; // To navigate the user back to the services list after adding a new service.
import ServiceForm from '../components/ServiceForm'; // Assuming you have this component for form handling
import React from 'react';

const AddServicePage = () => {
  const navigate = useNavigate(); // To navigate after the service is added.
  
  const handleSubmit = async (data: any) => {
    try {
      await createService(data); // Make an API call to create the service.
      navigate('/services'); // Redirect back to the services page after success.
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div>
      <h2>Add New Service</h2>
      <ServiceForm onSubmit={handleSubmit} /> {/* Use ServiceForm component for form handling */}
    </div>
  );
};

export default AddServicePage;
