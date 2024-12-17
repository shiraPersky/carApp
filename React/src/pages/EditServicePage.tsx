import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceForm from '../components/ServiceForm';
import { getServiceById, updateService } from '../services/serviceApi';

const EditServicePage = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the existing service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(Number(id));
        setService(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
    fetchService();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (data: any) => {
    try {
      await updateService(Number(id), data);
      navigate('/services'); // Navigate back to the services list
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div>
      <h2>Edit Service</h2>
      <ServiceForm existingService={service} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditServicePage;
