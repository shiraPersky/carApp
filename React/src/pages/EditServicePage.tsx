import { useState, useEffect } from 'react'; // To manage the state and side effects.
import { useNavigate, useParams } from 'react-router-dom'; // To navigate and get the service ID from the URL.
import { getServiceById, updateService } from '../services/serviceApi'; // To interact with the backend to fetch and update the service.
import ServiceForm from '../components/ServiceForm'; // Assuming you have a form component for editing the service
import React from 'react';

const EditServicePage = () => {
  const { id } = useParams(); // Get the service ID from the URL.
  const navigate = useNavigate(); // For redirecting after updating the service.
  const [existingService, setExistingService] = useState<any>(null); // To store the existing service data.
  
  // Fetch the service details when the component mounts
  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const serviceData = await getServiceById(Number(id)); // Fetch the service by ID.
        setExistingService(serviceData); // Set the service data.
      }
    };
    fetchService();
  }, [id]); // Only run when the `id` changes.

  const handleSubmit = async (data: any) => {
    try {
      if (id) {
        await updateService(Number(id), data); // Update the service.
        navigate('/services'); // Redirect to the services page after success.
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  if (!existingService) return <div>Loading...</div>; // Show loading state while data is being fetched.

  return (
    <div>
      <h2>Edit Service</h2>
      <ServiceForm existingService={existingService} onSubmit={handleSubmit} /> {/* Use the form component to edit the service */}
    </div>
  );
};

export default EditServicePage;
