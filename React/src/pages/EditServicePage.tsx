import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceForm from '../components/ServiceForm';
import { updateService } from '../services/serviceApi';

const EditServicePage = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<any[]>([]);

  // Fetch all services and then find the specific one by ID
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/services'); // Fetch all services
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // Fetch all services once on component mount

  // Once services are fetched, find the specific service by ID
  useEffect(() => {
    if (id && services.length > 0) {
      const foundService = services.find((service) => service.id === Number(id));
      setService(foundService || null);
      setLoading(false); // Stop loading when the service is found
    }
  }, [id, services]); // Only run when services or id change

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
